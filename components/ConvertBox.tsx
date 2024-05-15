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
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useToasts } from "./Toasts";

const getProjectURL = (id: number) => `https://scratch.mit.edu/projects/${id}/`;

const getProjectId = (url: string) => {
  // Find a number in the URL
  const results = url.match(/scratch.*\/(\d{2,})/);
  if (results === null) return null;
  return parseInt(results[1], 10);
};

type ChosenProject = { type: "url"; id: number } | { type: "file"; file: File };

const templates = [{ id: 1019731531, name: "Blank Project" }];

const isTemplateId = (id: number) =>
  templates.some((template) => template.id === id);

export default function ConvertBox() {
  const [project, setProject] = useState<ChosenProject | null>(null);
  const projectTitle = useProjectTitle(
    project?.type === "url" ? project.id : null,
  );

  const [projectQuery, setProjectQuery] = useState("");
  const queryId = getProjectId(projectQuery);
  const queryTitle = useProjectTitle(queryId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ status: number; info: string } | null>(
    null,
  );

  const router = useRouter();
  const toasts = useToasts();

  type ConversionOutputType = "codesandbox" | "leopard-website";

  const performConversion = async (
    input: ChosenProject,
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
    if (!project) return;

    if (project.type === "url") {
      return performConversion({ type: "url", id: project.id }, "codesandbox");
    }
  };

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
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.files = event.dataTransfer!.files;
      if (fileInput.files && fileInput.files.length > 0) {
        setProject({ type: "file", file: fileInput.files[0] });
        setError(null);
      }
    }
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
    allowedTypes: ChosenProject["type"][];
    label: string;
    icon?: React.ReactNode;
    tag?: string;
  }[] = [
    {
      output: "leopard-website",
      allowedTypes: ["url"],
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
      allowedTypes: ["url", "file"],
      label: "CodeSandbox",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 600 600"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M150 150L449.832 150V450H150V150ZM419.168 180.682V419.318H180.665V180.682H419.168Z"
            className="fill-current"
          />
        </svg>
      ),
    },
  ];

  const inputParentRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="relative space-y-2">
        {/* Project URL form */}
        <form
          className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0"
          onSubmit={onSubmit}
        >
          <div className="relative w-full flex-1">
            <Combobox<ChosenProject | null>
              value={project}
              by={(a: ChosenProject, b: ChosenProject) => {
                // Don't compare project objects by identity, but by their contents
                if (a === b) return true;

                if (a?.type === "url" && b?.type === "url") {
                  return a.id === b.id;
                }

                if (a?.type === "file" && b?.type === "file") {
                  return a.file === b.file;
                }

                return false;
              }}
              onChange={(newProject: ChosenProject | "URL" | "SB3") => {
                console.log("newProject", newProject);

                // Slight hack. Some of the options are meant to be actions
                // that paste from the clipboard or upload a file. If the user
                // has chosen one of those, perform the appropriate action.
                if (newProject === "URL") {
                  if (queryId) {
                    setProject({ type: "url", id: queryId });
                    setError(null);
                  } else {
                    // Paste from clipboard
                    navigator.clipboard.readText().then((text) => {
                      const id = getProjectId(text);
                      if (id) {
                        setProject({ type: "url", id });
                        setProjectQuery("");
                        setError(null);
                      } else {
                        toasts.addToast({
                          style: "default",
                          children: (
                            <>
                              Not a Scratch project URL:{" "}
                              <span className="text-gray-600">
                                "{text.slice(0, 20)}
                                {text.length > 20 && "..."}"
                              </span>
                            </>
                          ),
                          duration: 5000,
                        });
                      }
                    });
                  }
                  return;
                }

                if (newProject === "SB3") {
                  fileInputRef.current?.click();
                  return;
                }

                // If we get here, the user has chosen a real project
                // from the combobox.
                console.log("setting project", newProject);
                setProject(newProject);
                setProjectQuery("");
                setError(null);
              }}
              onClose={() => {
                if (queryId) {
                  setProject({ type: "url", id: queryId });
                  setError(null);
                }

                // We have `immediate` set to true so that the dropdown
                // will appear as soon as you focus the input. However,
                // if the dropdown closes without blurring the input,
                // then clicking in the input again doesn't focus it
                // (and thus re-open the dropdown), which is frustrating.
                // So let's blur it manually.
                requestAnimationFrame(() => {
                  menuButtonRef.current?.focus();
                });
              }}
              immediate={true}
            >
              <div className="relative" ref={inputParentRef}>
                <ComboboxInput
                  aria-label="Project URL"
                  placeholder="https://scratch.mit.edu/projects/345789566/"
                  displayValue={(p: ChosenProject | null) => {
                    switch (p?.type) {
                      case "url":
                        // If the project is a template, show the template name
                        const template = templates.find(
                          (template) => template.id === p.id,
                        );
                        if (template) return template.name;

                        // If the project is a url and we've fetched the title, show it
                        if (project?.type === "url" && p.id === project.id) {
                          if (projectTitle) return projectTitle;
                        }

                        return getProjectURL(p.id);
                      case "file":
                        if (p.file.name.endsWith(".sb3")) {
                          return p.file.name.slice(0, -4);
                        }
                        return p.file.name;
                      default:
                        return "";
                    }
                  }}
                  onChange={(event) => setProjectQuery(event.target.value)}
                  className={classNames(
                    "w-full rounded-md border-2 px-5 py-3 text-lg outline-none",
                    {
                      "pl-16": !!project,
                      "border-indigo-600 bg-indigo-100 text-indigo-800 placeholder-indigo-200":
                        !error,
                      "border-red-700 bg-red-100 text-red-800 focus:border-red-900":
                        error,
                    },
                  )}
                  autoComplete="off"
                />
                {project?.type === "url" ? (
                  <img
                    src={`https://cdn2.scratch.mit.edu/get_image/project/${project.id}_120x90.png`}
                    alt=""
                    className="pointer-events-none absolute left-8 top-1/2 h-9 w-12 -translate-x-1/2 -translate-y-1/2 rounded border border-dashed border-indigo-200 bg-indigo-100"
                    draggable={false}
                  />
                ) : project?.type === "file" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute left-8 top-1/2 h-9 w-12 -translate-x-1/2 -translate-y-1/2 rounded border border-dashed border-indigo-200 bg-indigo-100 fill-indigo-700/75 p-1"
                  >
                    <text
                      x={10}
                      y={11}
                      fontSize={12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      .sb3
                    </text>
                  </svg>
                ) : null}
              </div>
              <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-2 shadow-lg [--anchor-gap:0.25rem] empty:hidden"
              >
                <strong className="mx-2 my-1 block text-sm font-semibold text-gray-800">
                  Your Project
                </strong>
                {((project &&
                  !(project.type === "url" && isTemplateId(project.id))) ||
                  queryId) && (
                  <ComboboxOption
                    value={queryId ? { type: "url", id: queryId } : project}
                    className="data-[focus]:bg-gray-200 data-[selected]:bg-indigo-100 flex cursor-pointer items-center space-x-2 rounded-md p-2"
                  >
                    {queryId ? (
                      <img
                        src={`https://cdn2.scratch.mit.edu/get_image/project/${queryId}_120x90.png`}
                        alt=""
                        className="h-6 w-8 rounded border border-dashed border-indigo-200 bg-indigo-100"
                      />
                    ) : project?.type === "url" ? (
                      <img
                        src={`https://cdn2.scratch.mit.edu/get_image/project/${project.id}_120x90.png`}
                        alt=""
                        className="h-6 w-8 rounded border border-dashed border-indigo-200 bg-indigo-100"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className="h-6 w-8 rounded border border-dashed border-indigo-200 bg-indigo-100 fill-indigo-700/75 p-[0.125rem]"
                      >
                        <text
                          x={10}
                          y={11}
                          fontSize={12}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          .sb3
                        </text>
                      </svg>
                    )}
                    <div className="flex flex-grow items-center justify-between overflow-hidden">
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-900 [[data-selected]_&]:text-indigo-900/80">
                        {queryId
                          ? queryTitle ?? getProjectURL(queryId)
                          : project?.type === "url"
                            ? projectTitle ?? getProjectURL(project.id)
                            : project?.type === "file"
                              ? project.file.name
                              : ""}
                      </span>
                      {queryId ? (
                        <span className="mt-px ml-2 flex-shrink-0 font-mono text-xs text-gray-500 [[data-selected]_&]:text-indigo-400">
                          {queryId}
                        </span>
                      ) : project?.type === "url" &&
                        !isTemplateId(project.id) ? (
                        <span className="mt-px ml-2 flex-shrink-0 font-mono text-xs text-gray-500 [[data-selected]_&]:text-indigo-400">
                          {project.id}
                        </span>
                      ) : null}
                    </div>
                  </ComboboxOption>
                )}
                <ComboboxOption
                  value="URL"
                  className="data-[focus]:bg-gray-200 data-[selected]:bg-indigo-100 flex cursor-pointer items-center space-x-2 rounded-md p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-6 w-8 rounded border border-dashed border-indigo-200 bg-indigo-100 fill-indigo-700/75 p-[0.125rem]"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                  </svg>
                  <span className="text-gray-900 [[data-selected]_&]:text-indigo-900/80">
                    Paste project URL
                  </span>
                </ComboboxOption>
                <ComboboxOption
                  value="SB3"
                  className="data-[focus]:bg-gray-200 data-[selected]:bg-indigo-100 flex cursor-pointer items-center space-x-2 rounded-md p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-6 w-8 rounded border border-dashed border-indigo-200 bg-indigo-100 fill-indigo-700/75 p-[0.125rem]"
                  >
                    <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                  </svg>
                  <span className="text-gray-900 [[data-selected]_&]:text-indigo-900/80">
                    Upload .sb3
                  </span>
                </ComboboxOption>

                <strong className="mx-2 mb-1 mt-4 block text-sm font-semibold text-gray-800">
                  Templates
                </strong>
                {templates.map((template) => (
                  <ComboboxOption
                    key={template.id}
                    value={{ type: "url", id: template.id }}
                    className="data-[focus]:bg-gray-200 data-[selected]:bg-indigo-100 flex cursor-pointer items-center space-x-2 rounded-md p-2"
                  >
                    <img
                      src={`https://cdn2.scratch.mit.edu/get_image/project/${template.id}_120x90.png`}
                      alt="Project thumbnail"
                      className="h-6 w-8 rounded border border-gray-300 object-cover"
                    />
                    <span className="text-gray-900 [[data-selected]_&]:text-indigo-900/80">
                      {template.name}
                    </span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>

          <div className="relative flex">
            <Menu>
              <button
                ref={menuButtonRef}
                onClick={() => {
                  if (project) {
                    performConversion(project, "codesandbox");
                  }
                }}
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
                disabled={!project || loading}
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
                  <div className="absolute inset-0 animate-ping rounded-full bg-orange-300/75" />
                  <div className="absolute inset-0 rounded-full bg-orange-400" />
                </div>
              </MenuButton>

              {/* TODO: This menu dropdown should probably be standardized with the profile menu */}
              <MenuItems
                anchor="bottom end"
                className="flex flex-col rounded-xl border border-gray-300 bg-white p-2 shadow-lg [--anchor-gap:0.25rem]"
              >
                {conversionMenuItems.map((item) => (
                  <MenuItem key={item.output}>
                    <button
                      className="enabled:data-[focus]:bg-gray-200 flex items-center justify-start space-x-2 rounded px-2 py-2 text-left text-gray-800 enabled:hover:bg-gray-200 disabled:cursor-default disabled:text-gray-500"
                      disabled={
                        loading ||
                        !project ||
                        !item.allowedTypes.includes(project.type)
                      }
                      onClick={() => {
                        if (project) {
                          performConversion(project, item.output);
                        }
                      }}
                    >
                      <div>{item.icon}</div>
                      <div>{item.label}</div>
                      {item.tag && (
                        <span className="ml-2 rounded-full bg-orange-200 px-2 py-1 text-xs text-orange-800">
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

        {/* File upload input + drag and drop interface */}
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          className="hidden"
          accept=".sb3"
          onChange={(event) => {
            const input: HTMLInputElement = event.currentTarget;
            if (input.files && input.files.length > 0) {
              setProject({ type: "file", file: input.files[0] });
              setError(null);
            }
          }}
          onClick={(event) => {
            // I want "onChange" to fire even if the user selects the same file twice in a row
            // (which wouldn't normally count as a "change" the second time), so let's reset
            // the input value each time it's clicked.
            if (event.currentTarget) {
              event.currentTarget.value = "";
            }
          }}
        />
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
      </div>

      {/* Spacer to move conversion box up on page */}
      {!error && <div className="h-36" />}

      {/* Error box */}
      {error && (
        <div className="rounded-lg bg-red-200">
          <div
            className="relative rounded-t-md bg-red-200 text-red-300"
            style={{
              backgroundImage: `linear-gradient(-45deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%, transparent 100%)`,
              backgroundSize: "8px 8px",
            }}
          >
            <div className="my-2 ml-2 inline-flex items-center space-x-1 rounded-md bg-red-700 px-2 py-1 text-sm font-semibold uppercase text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Conversion Error</span>
            </div>
          </div>
          <div className="space-y-2 p-4 text-red-900">
            {error.status === 404 ? (
              <>
                <p>
                  <strong>Project not found. (Did you share it?)</strong>
                </p>
                <p>
                  Your project must be shared in order to be converted. A shared
                  project was not found
                  {project?.type === "url" && ` with the id ${project.id}`}.
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
                  Leopard only supports new projects (created in Scratch 3.0).
                  And the only supported extension is "pen"; all others will
                  fail.
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
        </div>
      )}
    </div>
  );
}

function useProjectTitle(id: number | null) {
  const [title, setTitle] = useState<string | null>(null);
  const cachedTitles = useRef<{ [id: number]: string }>({});

  useEffect(() => {
    if (id === null) {
      setTitle(null);
      return;
    }

    if (cachedTitles.current[id]) {
      setTitle(cachedTitles.current[id]);
      return;
    }

    // We'll give it a tiny delay to minimize noisy UI,
    // but pretty quickly we should reset the title to null
    // while loading so that we don't return an outdated result
    const setToNullTimeout = setTimeout(() => setTitle(null), 500);

    fetch(`/api/getScratchMetadata?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const title = data.title;
        if (typeof title === "string") {
          cachedTitles.current[id] = title;
          setTitle(title);
        } else {
          setTitle(null);
        }
        clearTimeout(setToNullTimeout);
      })
      .catch(() => {
        setTitle(null);
        clearTimeout(setToNullTimeout);
      });
  }, [id]);

  return title;
}
