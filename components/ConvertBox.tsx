import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as gtag from "../lib/gtag";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const getProjectURL = (id: number) => `https://scratch.mit.edu/projects/${id}/`;

const getProjectId = (url: string) => {
  const results = url.match(/\d{2,}/);
  if (results === null) return null;
  return parseInt(results[0], 10);
};

export default function ConvertBox() {
  const [projectURL, setProjectURL] = useState("");

  const projectId = getProjectId(projectURL);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ status: number; info: string } | null>(
    null,
  );

  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    gtag.event({
      category: "Translate Project",
      action: "Edit in CodeSandbox",
      // @ts-expect-error - gtag types incorrectly infer the label is supposed to be `undefined`
      label: projectId,
    });

    setLoading(true);

    const url = `/api/${projectId}/leopard-website`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // window.location.href = data.url;
      router.push(`/projects/${data.project.id}/editor`);
      console.log("Upload successful!", data);
      setError(null);
      setLoading(false);
    } else {
      console.log(data);
      setError({ status: response.status, info: data.error });
      setLoading(false);
    }
  };

  const onSubmitUpload: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    gtag.event({
      category: "Translate Project",
      action: "Edit in CodeSandbox",
      // @ts-expect-error - gtag types incorrectly infer the label is supposed to be `undefined`
      label: "File",
    });

    setLoading(true);

    const url = `/api/upload/codesandbox`;
    const response = await fetch(url, {
      method: "POST",
      body: (
        event.currentTarget.querySelector(
          "input[type=file]",
        ) as HTMLInputElement
      ).files![0],
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.url;
    } else {
      console.log(data);
      setError({ status: response.status, info: data.error });
      setLoading(false);
    }
  };

  const uploadFormRef = useRef<HTMLFormElement>(null);

  const [draggingFile, setDraggingFile] = useState(false);
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    setDraggingFile(true);
  }, []);
  const onDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    setDraggingFile(false);
  }, []);
  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    setDraggingFile(false);
    const fileInput = uploadFormRef.current?.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;

    fileInput.files = event.dataTransfer!.files;
    uploadFormRef.current!.requestSubmit();
  }, []);
  useEffect(() => {
    document.body.addEventListener("dragover", onDragOver);
    document.body.addEventListener("dragleave", onDragLeave);
    document.body.addEventListener("drop", onDrop);
    return () => {
      document.body.removeEventListener("dragover", onDragOver);
      document.body.removeEventListener("dragleave", onDragLeave);
      document.body.removeEventListener("drop", onDrop);
    };
  }, [onDragOver, onDragLeave, onDrop]);

  return (
    <div className="space-y-4">
      <div className="relative space-y-2">
        {/* Project URL form */}
        <form
          className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0"
          onSubmit={onSubmit}
        >
          <div className="relative w-full flex-1">
            <input
              type="text"
              className={classNames(
                "w-full rounded-md border-2 px-5 py-3 text-lg outline-none",
                {
                  "border-indigo-600 bg-indigo-100 text-indigo-800 placeholder-indigo-200":
                    !error,
                  "border-red-700 bg-red-100 text-red-800 focus:border-red-900":
                    error,
                },
              )}
              placeholder="https://scratch.mit.edu/projects/345789566/"
              value={projectURL}
              onChange={(e) => {
                setProjectURL(e.target.value);
                setError(null);
              }}
              onBlur={() => {
                // Normalize url format
                let id = getProjectId(projectURL);
                if (id) {
                  setProjectURL(getProjectURL(id));
                }
              }}
            />
          </div>

          <ProgressButton
            disabled={!projectId}
            loading={loading}
            error={!!error}
          >
            Edit as JavaScript
          </ProgressButton>
        </form>

        {/* File upload form */}
        <form
          ref={uploadFormRef}
          className="flex justify-center"
          onSubmit={onSubmitUpload}
        >
          <label>
            <span className="text-gray-700">
              Or{" "}
              <span className="cursor-pointer font-medium text-indigo-800 underline decoration-indigo-700/30 decoration-dashed">
                upload
              </span>{" "}
              an .sb3 file
            </span>
            <input
              type="file"
              name="file"
              className="hidden"
              accept=".sb3"
              onChange={(event) => {
                uploadFormRef.current?.requestSubmit();
              }}
            />
          </label>

          <div
            className={classNames("fixed inset-0 bg-indigo-400/20", {
              hidden: !draggingFile,
            })}
          />
          <div
            className={classNames(
              "absolute -inset-5 -top-14 flex items-center justify-center rounded-xl border-4 border-dashed border-indigo-500 bg-indigo-400 shadow-2xl shadow-indigo-600/60",
              { hidden: !draggingFile },
            )}
          >
            <span className="select-none text-xl font-semibold text-white drop-shadow-xl">
              Drop to upload sb3...
            </span>
          </div>
        </form>
      </div>

      {/* Error box */}
      {error && (
        <div className="space-y-2 rounded bg-red-200 px-4 py-3">
          {error.status === 404 ? (
            <>
              <p>
                <strong>Project not found. (Did you share it?)</strong>
              </p>
              <p>
                Your project must be shared in order to be converted. A shared
                project was not found with the id {projectId}.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>There was an error converting your project.</strong>
              </p>
              <p>
                <code className="rounded bg-red-300 px-2 py-1 text-sm text-red-800">
                  {error.info}
                </code>
              </p>
              <p>
                Leopard only supports new projects (created in Scratch 3.0). And
                the only supported extension is "pen"; all others will fail.
              </p>
            </>
          )}
          <p>
            If you aren't sure why your project is failing,{" "}
            <a
              href="https://scratch.mit.edu/discuss/topic/420162/"
              className="underline"
            >
              ask on the forums
            </a>
            !
          </p>
        </div>
      )}
    </div>
  );
}

interface ProgressButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
}

function ProgressButton({
  children,
  loading = false,
  error = false,
  ...props
}: ProgressButtonProps) {
  return (
    <button
      className={classNames(
        "relative flex items-center justify-center whitespace-nowrap rounded-md px-5 py-3 text-lg text-white disabled:cursor-not-allowed",
        {
          "bg-indigo-600": !error,
          "bg-red-700": error,
        },
      )}
      {...props}
    >
      <span className={classNames({ invisible: loading })}>{children}</span>
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={classNames(
              "h-8 w-8 origin-center animate-spin rounded-full border-4",
              {
                "border-indigo-200": !error,
                "border-red-300": error,
              },
            )}
            style={{ borderBottomColor: "transparent" }}
          />
        </div>
      )}
    </button>
  );
}
