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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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

  type ConversionInput =
    | { type: "url"; id: number }
    | { type: "file"; file: File };

  type ConversionOutputType = "codesandbox" | "leopard-website";

  const performConversion = async (
    input: ConversionInput,
    outputType: ConversionOutputType,
  ) => {
    gtag.event({
      category: "Translate Project",
      action: "Edit in CodeSandbox",
      // @ts-expect-error - gtag types incorrectly state that label is supposed to be `undefined`
      label: input.type === "url" ? input.id : "sb3",
      // @ts-expect-error - gtag types incorrectly state that value is supposed to be `undefined`
      value: outputType,
    });

    setLoading(true);

    const assertUnreachable = (x: never): void => {};
    switch (input.type) {
      case "url": {
        const url = `/api/${input.id}/${outputType}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          switch (outputType) {
            case "leopard-website":
              router.push(`/projects/${data.project.id}/editor`);
              break;
            case "codesandbox":
              window.location.href = data.url;
              break;
            default:
              assertUnreachable(outputType);
              break;
          }
          setError(null);
          setLoading(false);
        } else {
          console.log(data);
          setError({ status: response.status, info: data.error });
          setLoading(false);
        }

        break;
      }
      case "file":
        // For now, uploaded files always go to CodeSandbox
        const url = `/api/upload/codesandbox`;
        const response = await fetch(url, {
          method: "POST",
          body: input.file,
        });
        const data = await response.json();

        if (response.ok) {
          window.location.href = data.url;
        } else {
          console.log(data);
          setError({ status: response.status, info: data.error });
          setLoading(false);
        }
        break;
      default:
        assertUnreachable(input);
        break;
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (projectId === null) return;
    return performConversion({ type: "url", id: projectId }, "codesandbox");
  };

  const onSubmitUpload: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const file = (
      event.currentTarget.querySelector("input[type=file]") as HTMLInputElement
    ).files![0];
    if (!file) return;
    return performConversion({ type: "file", file }, "codesandbox");
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

  const conversionMenuItems: {
    output: ConversionOutputType;
    label: string;
    icon?: React.ReactNode;
    tag?: string;
  }[] = [
    {
      output: "leopard-website",
      label: "Leopard Editor",
      tag: "Alpha",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 34 31"
          className="h-6 w-6 stroke-current"
        >
          <g transform="matrix(1,0,0,1,-15,-16.8862)">
            <path
              d="M28.7,37.173L35.311,37.173L32,40L28.7,37.173Z"
              strokeWidth={2}
            />
          </g>
          <g transform="matrix(0.414847,-6.16298e-33,-6.16298e-33,-0.414847,3.70273,40.5349)">
            <path
              d="M28.7,37.173L35.311,37.173L32,40L28.7,37.173Z"
              strokeWidth={4.82}
            />
          </g>
          <g transform="matrix(0.347936,0,0,0.347936,-168.891,-9.25507)">
            <path
              d="M552.844,39.536C565.245,29.353 574.989,27.378 578.667,31.465C582.344,35.552 579.958,45.699 568.1,59.766C568.978,62.82 569.443,66.045 569.443,69.376C569.443,83.233 561.405,95.226 549.74,100.941C546.963,106.664 541.091,110.603 534.305,110.603C527.52,110.603 521.648,106.664 518.87,100.941C507.205,95.226 499.168,83.233 499.168,69.376C499.168,66.052 499.63,62.835 500.504,59.791C488.897,46.274 486.225,36.021 489.699,31.735C493.176,27.444 502.81,29.132 515.806,39.511C521.177,36.167 527.518,34.238 534.305,34.238C541.108,34.238 547.463,36.176 552.844,39.536Z"
              strokeWidth={5.75}
            />
          </g>
          <g
            transform="matrix(1,0,0,1,-15,-16.8862)"
            className="fill-current stroke-transparent"
          >
            <g transform="matrix(1.36818,0,0,1.36818,-9.209,-11.7817)">
              <circle cx="26.37" cy="30.642" r="1.358" />
            </g>
            <g transform="matrix(1.36818,0,0,1.36818,1.0108,-11.7817)">
              <circle cx="26.37" cy="30.642" r="1.358" />
            </g>
          </g>
        </svg>
      ),
    },
    {
      output: "codesandbox",
      label: "CodeSandbox",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 600 600"
          className="h-6 w-6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M150 150L449.832 150V450H150V150ZM419.168 180.682V419.318H180.665V180.682H419.168Z"
            className="fill-current"
          />
        </svg>
      ),
    },
  ];

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

          <div className="relative flex">
            <Menu>
              <button
                className={classNames(
                  "relative flex items-center justify-center whitespace-nowrap rounded-l-md px-5 py-3 text-lg text-white",
                  {
                    "disabled:cursor-not-allowed": !error && !loading,
                    "bg-indigo-600 enabled:hover:bg-indigo-700":
                      !error && !loading,
                    "bg-indigo-700": !error && loading,
                    "bg-red-700 enabled:hover:bg-red-800": error && !loading,
                    "bg-red-800": error && loading,
                  },
                )}
                disabled={!projectId || loading}
              >
                <span className={classNames({ invisible: loading })}>
                  Edit as JavaScript
                </span>
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
              <MenuButton
                className={({ open }) =>
                  classNames("relative rounded-r-md border-l px-4 py-3", {
                    "border-indigo-800 bg-indigo-600": !error,
                    "bg-indigo-700": !error && open,
                    "enabled:hover:bg-indigo-700": !error && !open,
                    "border-red-800 bg-red-700": error,
                    "bg-red-800": error && open,
                    "enabled:hover:bg-red-800": error && !open,
                  })
                }
              >
                {/* Down arrow SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                >
                  <polyline
                    points="1 6, 10 15, 19 6"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-white"
                    fill="none"
                  />
                </svg>
                <div className="absolute top-3 right-2 h-2 w-2">
                  <div className="absolute inset-0 animate-ping rounded-full bg-pink-300/75" />
                  <div className="absolute inset-0 rounded-full bg-pink-400" />
                </div>
              </MenuButton>

              {/* TODO: This menu dropdown should probably be standardized with the profile menu */}
              <MenuItems
                anchor="bottom end"
                className="flex flex-col rounded-xl border border-gray-300 bg-white p-2 shadow-lg [--anchor-gap:0.5rem]"
              >
                {conversionMenuItems.map((item) => (
                  <MenuItem key={item.output}>
                    <button
                      className="enabled:data-[focus]:bg-gray-200 flex items-center justify-start space-x-2 rounded px-2 py-2 text-left text-gray-800 enabled:hover:bg-gray-200 disabled:cursor-default disabled:text-gray-500"
                      disabled={!projectId || loading}
                      onClick={() => {
                        if (projectId === null) return;
                        performConversion(
                          { type: "url", id: projectId },
                          item.output,
                        );
                      }}
                    >
                      <div>{item.icon}</div>
                      <div>{item.label}</div>
                      {item.tag && (
                        <span className="ml-2 rounded-full bg-pink-200 px-2 py-1 text-xs text-pink-800">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
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
