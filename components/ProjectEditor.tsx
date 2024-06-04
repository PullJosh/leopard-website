"use client";

import classNames from "classnames";
import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Tooltip } from "react-tooltip";
import {
  AbstractFile,
  DirectoryType,
  FilePath,
  Path,
  fileExtension,
  findFile,
  getDirectory,
  getFile,
  isDirectoryPath,
  pathToString,
  pathMatches,
  stringToPath,
  pathContains,
  FileName,
  DirectoryPath,
  isFilePath,
  imageFileExtensions,
  audioFileExtensions,
  toFilePath,
} from "../lib/fileHelpers";
import {
  UpdateFilesRequestJSON,
  UpdateFilesResponseJSON,
} from "../pages/api/projects/[id]/updateFiles";
import { useHotkeys } from "react-hotkeys-hook";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Nav, {
  NavAnonymousProjectWarning,
  NavProjectDescription,
  NavSpace,
} from "../components/Nav";
import { SeeProjectPageButton } from "../components/SeeInsideButton";
import { JSTranslationsReferencePanel } from "./JSTranslationsReferencePanel";
// import { JSTranslationsModal } from "../components/JSTranslationsModal";
import { ProjectResponseJSON } from "../pages/api/projects/[id]/get";
import { FileDirectory, FileDirectoryFileNameInput } from "./FileDirectory";
import {
  ProjectEditorContext,
  useDirectory,
  usePath,
} from "../lib/ProjectEditorContext";
import Link from "next/link";
import { useToasts } from "./Toasts";
import { useProjectPreview } from "../lib/useProjectPreview";
import {
  GreenFlagButton,
  GreenFlagOverlay,
  StopButton,
} from "./ProjectPreview";
import { getAssetURL } from "../lib/previewURLs";
import {
  DirectoryIcon,
  FileIcon,
  SmallDirectoryIcon,
  SmallFileIcon,
} from "./FileIcons";

interface ProjectEditorProps {
  projectId: string;
  defaultProject: ProjectResponseJSON;

  translationsReferencePanel?: React.ReactNode;
}

export function ProjectEditor({
  projectId,
  defaultProject,
  translationsReferencePanel,
}: ProjectEditorProps) {
  const [project, setProject] = useState(defaultProject);

  const root = useMemo(() => {
    let files: {
      id: string;
      path: FilePath;
      name: FileName;
      content?: string | undefined;
      asset?: string | undefined;
    }[] = [];
    let directoryPaths: DirectoryPath[] = [];
    for (const file of project.files) {
      const path = stringToPath(file.path);
      if (isFilePath(path)) {
        const name = path[path.length - 1] as FileName;
        files.push({ ...file, name, path });
      } else {
        directoryPaths.push(path);
      }
    }
    return groupFilesByDirectory(files, directoryPaths);
  }, [project]);

  // const [activePath, setActivePath] = useHashState(
  //   [],
  //   pathToString,
  //   stringToPath,
  // );
  const [activePath, setActivePath] = useState<string[]>([""]);

  // TODO: Use `getSmartSelectPath` to automatically load index.js as the default file rather than opening up to a blank path

  const monaco = useMonaco();
  const [ready, setReady] = useState(true);

  const toasts = useToasts();

  // Make Monaco editor aware of all files in the project (once)
  /*
  useEffect(() => {
    if (!monaco) return;

    for (const model of monaco.editor.getModels()) {
      model.dispose();
    }

    const files = listAllFilesRecursive(root);

    for (const file of files) {
      if (file.content !== undefined) {
        const languageMode =
          { js: "typescript", htm: "html", html: "html", css: "css" }[
            fileExtension(file.path)
          ] ?? undefined;

        monaco.editor.createModel(
          file.content,
          languageMode,
          monaco.Uri.parse(pathToString(file.path)),
        );
      }
    }

    console.log(
      monaco.editor.getModel(monaco.Uri.parse(pathToString(["index.js"]))),
    );

    setReady(true);
  }, [monaco, root]);
  */

  /*
  useEffect(() => {
    if (!monaco) return;

    // Allow cmd+click to open files in the editor
    const editorOpener = monaco.editor.registerEditorOpener({
      openCodeEditor(source, resource, selectionOrPosition) {
        console.log(source, resource, selectionOrPosition);

        const path = stringToPath(resource.path);
        if (!isFilePath(path)) return false;

        const file = getFile(path, root);
        if (!file) return false;

        setActivePath(path);

        return true;
      },
    });

    const documentFormattingProvider =
      monaco.languages.registerDocumentFormattingEditProvider("typescript", {
        async provideDocumentFormattingEdits(model, options, token) {
          const text = model.getValue().replaceAll(/\s/g, "");

          return [{ range: model.getFullModelRange(), text }];
        },
      });

    return () => {
      editorOpener.dispose();
      documentFormattingProvider.dispose();
    };
  }, [monaco, root, setActivePath]);
  */

  const [fileEdits, setFileEdits] = useState<{ [key: string]: string }>({}); // file id -> content

  const handleUpdateFilesResponse = useCallback(
    (res: UpdateFilesResponseJSON) => {
      setFileEdits((fileEdits) => {
        let newFileEdits = { ...fileEdits };
        for (const file of res.files) {
          delete newFileEdits[file.id];
        }
        for (const id of res.deletedFiles) {
          delete newFileEdits[id];
        }
        return newFileEdits;
      });
      setProject!((project) => {
        if (!project) return project;

        const newProject = { ...project };

        for (const changedFile of res.files) {
          let found = false;
          for (const file of newProject.files) {
            if (file.id === changedFile.id) {
              file.content = changedFile.content;
              found = true;
              break;
            }
          }

          if (!found) {
            newProject.files.push({
              id: changedFile.id,
              path: changedFile.path,
              asset: changedFile.asset,
              content: changedFile.content,
            });
          }
        }

        newProject.files = newProject.files.filter(
          (file) => !res.deletedFiles.includes(file.id),
        );

        return newProject;
      });
    },
    [],
  );

  const updateFiles = useCallback(
    (body: UpdateFilesRequestJSON) => {
      return fetch(`/api/projects/${projectId}/updateFiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (res.status !== 200) {
          console.error(res);
          toasts.addToast({
            style: "error",
            children: (await res.json()).error,
            duration: 4000,
          });
          return;
        }
        handleUpdateFilesResponse(
          (await res.json()) as UpdateFilesResponseJSON,
        );
      });
    },
    [handleUpdateFilesResponse, projectId, toasts],
  );

  const uploadFiles = useCallback(
    (files: FileList, uploadPath: DirectoryPath) => {
      const formData = new FormData();
      formData.append("uploadPath", pathToString(uploadPath));

      let hasAnyFiles = false;
      for (const file of Array.from(files)) {
        const filePath = toFilePath([...uploadPath, file.name]);
        if (getFile(filePath, root) !== null) {
          toasts.addToast({
            style: "error",
            children: `A file with the name ${file.name} already exists`,
            duration: 4000,
          });
        } else {
          formData.append("files", file);
          hasAnyFiles = true;
        }
      }

      if (!hasAnyFiles) return;

      fetch(`/api/projects/${projectId}/uploadFiles`, {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error(res);
            throw new Error(await res.text());
          }

          return await res.json();
        })
        .then((res: UpdateFilesResponseJSON) => {
          handleUpdateFilesResponse(res);
        })
        .catch((err) => {
          toasts.addToast({
            style: "error",
            children: err.message,
            duration: 4000,
          });
        });
    },
    [handleUpdateFilesResponse, projectId, root, toasts],
  );

  const saveFileEdits = useCallback(() => {
    if (Object.keys(fileEdits).length === 0) {
      return Promise.resolve();
    }

    const body: UpdateFilesRequestJSON = {
      changes: Object.entries(fileEdits).map(([id, content]) => ({
        type: "update",
        id,
        content,
      })),
    };

    return updateFiles(body);
  }, [fileEdits, updateFiles]);

  const firstPath = activePath.slice(0, 1);
  const first = usePath(firstPath, root);

  let secondPath = activePath.slice(0, 2);
  let second = usePath(secondPath, root);

  const active = usePath(activePath, root);

  const [previewRef, preview] = useProjectPreview(projectId);
  const saveAndRun = useCallback(
    () => saveFileEdits().then(() => preview.start()),
    [saveFileEdits, preview],
  );

  // Ctrl + S outside of editor
  useHotkeys("mod+s", saveAndRun, { preventDefault: true });

  // Ctrl + S inside of editor
  useEffect(() => {
    if (!monaco) return;

    monaco.editor.addCommand({ id: "saveAndRun", run: saveAndRun });

    monaco.editor.addKeybindingRule({
      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      command: "saveAndRun",
    });
  }, [monaco, preview, saveAndRun]);

  const createDirectory = useCallback(
    (path: DirectoryPath) => {
      if (getDirectory(path, root)) return Promise.resolve();

      const body: UpdateFilesRequestJSON = {
        changes: [
          { type: "create", path: pathToString(path), content: undefined },
        ],
      };

      return updateFiles(body);
    },
    [root, updateFiles],
  );

  const createFile = useCallback(
    (path: FilePath, content: string = "") => {
      if (getFile(path, root)) return Promise.resolve();

      const body: UpdateFilesRequestJSON = {
        changes: [{ type: "create", path: pathToString(path), content }],
      };

      return updateFiles(body);
    },
    [root, updateFiles],
  );

  const showFileUploadPicker = useCallback(() => {
    // window.showOpenFilePicker() is not yet supported in Firefox or Safari,
    // so we create a file input element and "click" that

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    input.addEventListener("change", async () => {
      if (!input.files) return;

      const uploadPath = isFilePath(activePath)
        ? activePath.slice(0, -1)
        : activePath;

      uploadFiles(input.files, uploadPath);
    });

    input.click();
  }, [activePath, uploadFiles]);

  return (
    <ProjectEditorContext.Provider
      value={{
        root,
        activePath,
        setActivePath,
        fileEdits,
        setFileEdits,
        createDirectory,
        createFile,
      }}
    >
      <div className="flex h-[calc(100vh-8px)] w-screen flex-col">
        <style jsx global>{`
          body {
            overscroll-behavior: none;
          }
        `}</style>
        <div className="flex-initial border-b border-gray-300">
          <Nav width="full">
            {project && (
              <NavProjectDescription
                id={project.id}
                title={project.title}
                owner={project.owner}
                remixSource={
                  project.scratchProjectData
                    ? {
                        type: "scratch",
                        id: project.scratchProjectData.id,
                        title: project.scratchProjectData.title,
                        username: project.scratchProjectData.author.username,
                      }
                    : undefined
                }
              />
            )}
            <NavSpace />
            <div className="mr-2 flex py-3">
              <SeeProjectPageButton id={projectId} />
            </div>
            {project && project.owner === null && (
              <NavAnonymousProjectWarning
                className="mr-2"
                projectId={project.id}
                setProject={setProject!}
                autoClaimOnSignIn={true}
              />
            )}
          </Nav>
        </div>
        <div className="flex flex-1 divide-x divide-gray-300 overflow-hidden">
          {ready ? (
            <div className="relative flex w-0 flex-1 flex-col">
              {/* <div className="flex h-0 flex-grow items-center justify-center">
                <div className="text-center text-gray-700">
                  <svg
                    className="mx-auto mb-4 block w-16"
                    viewBox="0 0 48 36"
                    strokeLinejoin="miter"
                  >
                    <g transform="matrix(1,0,0,1,-8.25,-14)">
                      <path
                        d="M20.446,26.05C21.972,20.268 27.241,16 33.5,16C40.895,16 46.909,21.959 46.999,29.333C51.031,30.431 54,34.121 54,38.5C54,43.743 49.743,48 44.5,48L21.5,48C15.429,48 10.5,43.071 10.5,37C10.5,31.285 14.868,26.582 20.446,26.05Z"
                        className="stroke-gray-600"
                        strokeWidth={4}
                        fill="none"
                      />
                    </g>
                    <g transform="matrix(0.853333,-0.853333,0.707107,0.707107,-15.8524,29.611)">
                      <rect
                        x="9.5"
                        y="16.5"
                        width="38"
                        height="8"
                        className="fill-gray-600 stroke-white"
                        strokeWidth={3.61}
                      />
                    </g>
                  </svg>
                  <h5 className="font-bold text-gray-800">
                    Something went wrong.
                  </h5>
                  <p>This project could not be loaded. Are you online?</p>
                </div>
              </div> */}
              {first ? (
                <div className="flex h-0 flex-grow flex-col">
                  <div className="relative z-30">
                    <FileTabs
                      path={first.path}
                      showFileUploadPicker={showFileUploadPicker}
                    />
                  </div>
                  <div className="flex items-center space-x-1 border-b border-gray-300 bg-white px-2 py-1 text-sm">
                    {activePath.map((part, i) => (
                      <Fragment key={i}>
                        {i > 0 && <span className="text-gray-400">/</span>}
                        <button
                          onClick={() =>
                            setActivePath(activePath.slice(0, i + 1))
                          }
                        >
                          {part}
                        </button>
                      </Fragment>
                    ))}
                    {isDirectoryPath(activePath) && (
                      <span className="text-gray-400">/</span>
                    )}
                  </div>
                  {first.type === "file" ? (
                    <div className="relative h-0 flex-grow">
                      <FileEditor file={first.file} />
                    </div>
                  ) : (
                    <>
                      {secondPath.length >= 2 ? (
                        <div className="relative flex h-0 flex-grow overflow-hidden">
                          {second ? (
                            second.type === "file" ? (
                              <FileEditor file={second.file} />
                            ) : (
                              <div className="grid h-full flex-grow grid-cols-[1fr,4fr] grid-rows-1 items-stretch divide-x divide-gray-300 overflow-hidden">
                                <FileTree
                                  path={second.path}
                                  showFileUploadPicker={showFileUploadPicker}
                                />
                                <div className="relative flex items-center justify-center bg-gray-100">
                                  {activePath.length === 2 && (
                                    <div>Select a file to start editing</div>
                                  )}
                                  {active?.type === "file" && (
                                    <FileEditor file={active.file} />
                                  )}
                                </div>
                              </div>
                            )
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex h-0 flex-grow items-center justify-center bg-gray-100 text-gray-800">
                          {/* TODO: Make this blank screen look nicer */}
                          Select a file to start editing
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-0 flex-grow items-center justify-center bg-gray-100 text-gray-800">
                  {/* TODO: Make this blank screen look nicer */}
                  Select a file to start editing
                </div>
              )}

              {/* <div className="flex justify-end border-t border-gray-300 bg-gray-100 p-2">
                <button className="flex items-center space-x-2 rounded-md py-2 pl-2 pr-3 text-gray-700 hover:bg-gray-300 active:bg-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    />
                  </svg>

                  <span>JS Translations</span>
                </button>
              </div> */}
              {translationsReferencePanel && (
                <div className="flex max-h-[40%] flex-col overflow-hidden border-t border-gray-300 bg-white">
                  {translationsReferencePanel}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1">Loading...</div>
          )}
          <div className="flex w-[480px] flex-shrink-0 flex-grow-0 flex-col divide-y divide-gray-300 bg-gray-100">
            <div className="flex h-12 flex-shrink-0 items-center space-x-1 px-2">
              <GreenFlagButton
                onClick={saveAndRun}
                tooltip={{ text: "Save & run", subtext: "Ctrl + S" }}
              />
              <StopButton onClick={preview.stop} disabled={!preview.running} />
            </div>
            <div className="relative">
              <iframe
                ref={previewRef}
                className="h-[360px] w-[480px] bg-white"
              />
              {!preview.running && <GreenFlagOverlay onClick={saveAndRun} />}
            </div>
            <FileDirectory path={[]} smartSelect={true}>
              {({ items, createDirectory, createFile }) => (
                <div className="flex flex-grow flex-col overflow-hidden">
                  <div className="flex h-12 flex-initial items-center border-b border-gray-300 px-4 py-1">
                    <div>Project Files</div>
                    <CreateFileMenu
                      className="h-7"
                      onClickCreateFile={() => createFile()}
                      onClickCreateFolder={() => createDirectory()}
                      onClickUploadFile={() => showFileUploadPicker()}
                    />
                  </div>
                  <div className="relative flex flex-1 flex-wrap content-start gap-4 overflow-y-auto p-4">
                    {items.map(
                      ({ key, type, item, active, renaming, onClick }) => {
                        const ext = fileExtension(
                          (item?.name ?? renaming?.name ?? "") as FileName,
                        );

                        const WrapperElem = renaming ? "div" : "button";
                        return (
                          <WrapperElem
                            key={key}
                            className="flex h-16 w-14 flex-col items-stretch"
                            onClick={onClick}
                            disabled={active}
                          >
                            {type === "file" ? (
                              <FileIcon
                                extension={ext}
                                imageSrc={
                                  item && imageFileExtensions.includes(ext)
                                    ? getAssetURL(item.asset!)
                                    : undefined
                                }
                              />
                            ) : (
                              <DirectoryIcon
                                imageSrc={
                                  item
                                    ? getDirectoryThumbnailImage(item) ??
                                      undefined
                                    : undefined
                                }
                              />
                            )}
                            {renaming ? (
                              <FileDirectoryFileNameInput
                                className="text-center text-xs"
                                {...renaming}
                              />
                            ) : (
                              <div
                                className={classNames(
                                  "overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-center text-xs",
                                  { "text-indigo-600": active },
                                )}
                              >
                                {item?.name ?? ""}
                              </div>
                            )}
                          </WrapperElem>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </FileDirectory>
          </div>
        </div>
      </div>
      {/* <JSTranslationsModal /> */}
    </ProjectEditorContext.Provider>
  );
}

interface FileListProps {
  path: DirectoryPath;
}

function FileList({ path }: FileListProps) {
  const ctx = useContext(ProjectEditorContext);
  const directory = useDirectory(path);

  if (directory === null) return null;

  return (
    <div className="flex flex-col border-r border-gray-300 bg-gray-100">
      {directory.files.map((file) => {
        const selected = pathMatches(file.path, ctx.activePath);

        return (
          <button
            key={file.id}
            className={classNames(
              "flex items-center space-x-2 px-2 py-1 text-left text-sm",
              { "bg-gray-200 text-indigo-800": selected },
            )}
            onClick={() => ctx.setActivePath(file.path)}
          >
            {imageFileExtensions.includes(fileExtension(file.path)) && (
              <img
                key={file.id}
                src={getAssetURL(file.asset!)}
                alt={`Image file ${file.path}`}
                className="h-6 w-6 border border-gray-300 object-contain"
              />
            )}
            <span>{file.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function groupFilesByDirectory<FileType extends AbstractFile>(
  files: FileType[],
  directoryPaths: DirectoryPath[] = [],
): DirectoryType<FileType> {
  const rootDirectory: DirectoryType<FileType> = {
    name: "",
    path: [],
    directories: [],
    files: [],
  };

  const findOrCreateDirectory = (path: DirectoryPath) => {
    let currentDirectory = rootDirectory;
    for (const pathPart of path) {
      let nextDirectory = currentDirectory.directories.find(
        (directory) => directory.name === pathPart,
      );
      if (!nextDirectory) {
        nextDirectory = {
          name: pathPart,
          path: [...currentDirectory.path, pathPart],
          directories: [],
          files: [],
        };
        currentDirectory.directories.push(nextDirectory);
      }
      currentDirectory = nextDirectory;
    }
    return currentDirectory;
  };

  for (const file of files) {
    const dir = findOrCreateDirectory(file.path.slice(0, -1));
    dir.files.push(file);
  }

  for (const path of directoryPaths) {
    findOrCreateDirectory(path);
  }

  const sortDir = (dir: DirectoryType<FileType>) => {
    dir.directories.sort((a, b) => a.name.localeCompare(b.name));
    dir.files.sort((a, b) => a.name.localeCompare(b.name));
    for (const directory of dir.directories) {
      sortDir(directory);
    }
  };

  sortDir(rootDirectory);

  return rootDirectory;
}

function getDirectoryThumbnailImage<FileType extends AbstractFile>(
  directory: DirectoryType<FileType>,
): string | null {
  const imageFile = findFile(directory, (file) => {
    return imageFileExtensions.includes(fileExtension(file.path));
  });

  if (!imageFile) return null;

  return getAssetURL(imageFile.asset!);
}

interface FileTabsProps {
  path: Path;
  showFileUploadPicker: () => void;
}

function FileTabs({ path, showFileUploadPicker }: FileTabsProps) {
  const ctx = useContext(ProjectEditorContext);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollStatus, setScrollStatus] = useState({
    moreContentToLeft: false,
    moreContentToRight: false,
  });

  const updateScrollStatus = useCallback(() => {
    if (scrollRef.current) {
      const moreContentToLeft = scrollRef.current.scrollLeft > 0;
      const moreContentToRight =
        scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      setScrollStatus((scrollStatus) => {
        if (
          moreContentToLeft === scrollStatus.moreContentToLeft &&
          moreContentToRight === scrollStatus.moreContentToRight
        ) {
          // If nothing has changed, keep the same object to prevent
          // an infinite loop of rerenders
          return scrollStatus;
        }

        return { moreContentToLeft, moreContentToRight };
      });
    }
  }, []);

  useLayoutEffect(() => {
    updateScrollStatus();
    window.addEventListener("resize", updateScrollStatus);
    return () => window.removeEventListener("resize", updateScrollStatus);
  });

  return (
    <FileDirectory path={path}>
      {({ items, createDirectory, createFile }) => (
        <div className="flex border-b border-gray-300 bg-gray-100">
          <div className="relative -mb-px flex-1 overflow-hidden">
            {scrollStatus.moreContentToLeft && (
              <button
                className="absolute left-2 top-1/2 -mt-px h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full bg-white/70 shadow backdrop-blur"
                onClick={() => {
                  scrollRef.current?.scrollBy({
                    left: -500,
                    behavior: "smooth",
                  });
                }}
              >
                <span className="sr-only">Scroll left</span>
                <svg viewBox="0 0 32 32" className="h-8 w-8">
                  <polyline
                    points="20 8, 12 16, 20 24"
                    className="stroke-gray-700"
                    strokeWidth={2}
                    fill="none"
                  />
                </svg>
              </button>
            )}
            <div
              ref={scrollRef}
              className="scrollbar-none flex h-12 items-end overflow-x-auto"
              onWheel={(event) => {
                // Scroll horizontally when the mouse is over the tabs
                event.currentTarget.scrollLeft += event.deltaY;
              }}
              onScroll={() => updateScrollStatus()}
            >
              {items.map(
                ({ key, type, item, activeParent, renaming, onClick }) => {
                  const hasUnsavedChanges =
                    type === "file" && !!item && item.id in ctx.fileEdits;

                  const ext = fileExtension(
                    (item?.name ?? renaming?.name ?? "") as FileName,
                  );

                  const WrapperElem = renaming ? "div" : "button";

                  return (
                    <WrapperElem
                      key={key}
                      className={classNames(
                        "flex h-12 flex-initial items-center space-x-1 self-stretch rounded-t-lg border-x px-5",
                        {
                          "border-gray-300 bg-white": activeParent,
                          "border-transparent": !activeParent,
                        },
                      )}
                      onClick={(event) => {
                        onClick();

                        // Scroll to the clicked tab
                        event.currentTarget.scrollIntoView({
                          block: "center",
                          behavior: "auto",
                        });
                      }}
                    >
                      {type === "directory" && (
                        <SmallDirectoryIcon className="-mb-[2px] h-7 w-7" />
                      )}
                      {type === "file" &&
                        (item && imageFileExtensions.includes(ext) ? (
                          <FileIcon
                            className="h-7 w-7"
                            extension={ext}
                            imageSrc={getAssetURL(item.asset!)}
                          />
                        ) : (
                          <SmallFileIcon
                            className="-mb-px h-7 w-7"
                            ext={ext}
                            showLines={true}
                          />
                        ))}

                      {renaming ? (
                        <FileDirectoryFileNameInput
                          className="w-24 text-center text-sm"
                          {...renaming}
                        />
                      ) : (
                        <span className="whitespace-nowrap">
                          {item?.name ?? ""}
                        </span>
                      )}
                      {hasUnsavedChanges && (
                        <span className="block h-2 w-2 rounded-full bg-indigo-600" />
                      )}
                    </WrapperElem>
                  );
                },
              )}
            </div>
            {scrollStatus.moreContentToRight && (
              <button
                className="absolute right-2 top-1/2 -mt-px h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full bg-white/80 shadow-md backdrop-blur"
                onClick={() => {
                  scrollRef.current?.scrollBy({
                    left: 500,
                    behavior: "smooth",
                  });
                }}
              >
                <span className="sr-only">Scroll right</span>
                <svg viewBox="0 0 32 32" className="h-8 w-8">
                  <polyline
                    points="12 8, 20 16, 12 24"
                    className="stroke-gray-700"
                    strokeWidth={2}
                    fill="none"
                  />
                </svg>
              </button>
            )}
          </div>
          {isDirectoryPath(path) && (
            <div
              className={classNames(
                "flex flex-initial items-center border-l px-3",
                {
                  "border-gray-300": scrollStatus.moreContentToRight,
                  "border-transparent": !scrollStatus.moreContentToRight,
                },
              )}
            >
              <CreateFileMenu
                className="h-7"
                onClickCreateFile={() => createFile()}
                onClickCreateFolder={() => createDirectory()}
                onClickUploadFile={() => showFileUploadPicker()}
              />
            </div>
          )}
        </div>
      )}
    </FileDirectory>
  );
}

interface FileTreeProps {
  path: Path;
  showFileUploadPicker: () => void;
}

function FileTree({ path, showFileUploadPicker }: FileTreeProps) {
  const ctx = useContext(ProjectEditorContext);

  const topLevelDivRef = useRef<HTMLDivElement | null>(null);

  return (
    <FileDirectory path={path} enableOpenDirectories={true}>
      {({ items, level, createDirectory, createFile }) => {
        const content = (
          <div className="flex flex-col">
            {items.length === 0 && level === 0 && (
              <div className="py-1 text-xs italic text-gray-500">
                No files or folders
              </div>
            )}
            {items.map(
              ({
                key,
                type,
                item,
                active,
                open,
                toggleOpen,
                renaming,
                onClick,
                contents,
              }) => {
                const hasUnsavedChanges =
                  type === "file" && !!item && item.id in ctx.fileEdits;

                const ext = fileExtension(
                  (item?.name ?? renaming?.name ?? "") as FileName,
                );

                const WrapperElem = renaming ? "div" : "button";

                return (
                  <Fragment key={key}>
                    <div
                      className={classNames("flex", {
                        "bg-gray-200 text-gray-900": active,
                        "border-transparent text-gray-700": !active,
                      })}
                      style={{ paddingLeft: `${1.2 * level}rem` }}
                    >
                      {type === "directory" && (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOpen();
                          }}
                          className="pl-2"
                        >
                          <svg className="h-6 w-6" viewBox="0 0 24 24">
                            <polyline
                              points={
                                open
                                  ? "7 11, 12 16, 17 11"
                                  : "11 7, 16 12, 11 17"
                              }
                              fill="none"
                              className="stroke-gray-600"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                      <WrapperElem
                        onClick={(event) => {
                          event.stopPropagation();
                          onClick();
                        }}
                        className="flex flex-grow items-center space-x-1 px-2 py-1 text-left text-sm"
                      >
                        {type === "file" &&
                          (item && imageFileExtensions.includes(ext) ? (
                            <FileIcon
                              className="h-6 w-6 flex-shrink-0"
                              extension={ext}
                              imageSrc={getAssetURL(item.asset!)}
                            />
                          ) : (
                            <SmallFileIcon
                              className="h-6 w-6 flex-shrink-0"
                              ext={ext}
                              showLines={true}
                            />
                          ))}

                        {renaming ? (
                          <FileDirectoryFileNameInput
                            className="w-full text-left text-sm"
                            {...renaming}
                          />
                        ) : (
                          <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {item?.name ?? ""}
                          </span>
                        )}
                        {hasUnsavedChanges && (
                          <span className="block h-2 w-2 flex-shrink-0 self-center rounded-full bg-indigo-600" />
                        )}
                      </WrapperElem>
                    </div>
                    {open && (
                      <div className="relative">
                        <div
                          className="absolute top-0 z-50 h-full border-l border-gray-300"
                          style={{ left: `${1.2 * (level + 1)}rem` }}
                        />
                        {contents()}
                      </div>
                    )}
                  </Fragment>
                );
              },
            )}
          </div>
        );

        // We are in a nested folder
        if (level > 0) {
          return content;
        }

        // We are rendering the top level
        return (
          <div
            ref={topLevelDivRef}
            className="flex flex-col overflow-y-auto bg-gray-100"
          >
            <div className="flex justify-end p-1">
              <CreateFileMenu
                className="h-7"
                onClickCreateFile={() => createFile()}
                onClickCreateFolder={() => createDirectory()}
                onClickUploadFile={() => showFileUploadPicker()}
              />
            </div>
            <div
              className="flex flex-grow flex-col pb-8"
              onClick={() => {
                // When you click in empty space, select the top level path
                // (de-selecting any active file or sub-folder)
                ctx.setActivePath(path);
              }}
            >
              {content}
            </div>
          </div>
        );
      }}
    </FileDirectory>
  );
}

interface FileEditorProps<FileType extends AbstractFile> {
  file: FileType;
}

function FileEditor<FileType extends AbstractFile>({
  file,
}: FileEditorProps<FileType>) {
  const { fileEdits, setFileEdits } = useContext(ProjectEditorContext);

  if (typeof file.content === "string") {
    return (
      <div className="absolute left-0 top-0 h-full w-full">
        <Editor
          className="absolute left-0 top-0 h-full w-full"
          path={pathToString(file.path)}
          defaultValue={
            file.id in fileEdits ? fileEdits[file.id] : file.content
          }
          onChange={(value) => {
            setFileEdits((fileEdits) => ({
              ...fileEdits,
              [file.id]: value ?? "",
            }));
          }}
          keepCurrentModel={false}
          saveViewState={true}
        />
      </div>
    );
  }

  if (file.asset) {
    const assetURL = getAssetURL(file.asset);

    if (imageFileExtensions.includes(fileExtension(file.path))) {
      return <ImageEditor file={file} />;
    }

    if (audioFileExtensions.includes(fileExtension(file.path))) {
      return (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-100">
          <audio key={file.id} src={assetURL} controls />
        </div>
      );
    }

    return (
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <p>Editing this file type is not supported</p>
          <p>
            <Link
              href={assetURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600"
            >
              <span className="underline">View file</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-[0.125rem] inline-block h-4 w-4 align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return null;
}

interface ImageEditorProps<FileType extends AbstractFile> {
  file: FileType;
}

function ImageEditor<FileType extends AbstractFile>({
  file,
}: ImageEditorProps<FileType>) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return (
    <div className="absolute left-0 top-0 grid h-full w-full grid-rows-[1fr,auto] bg-gray-100">
      <div className="flex items-center justify-center">
        <img
          key={file.id}
          ref={(el) => setImage(el)}
          src={getAssetURL(file.asset!)}
          alt={`Image file ${file.path}`}
          className="border border-gray-300 bg-gray-200"
          style={{
            backgroundImage:
              "linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%), linear-gradient(45deg, transparent 75%, white 75%), linear-gradient(-45deg, transparent 75%, white 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      </div>
      <div className="bg-gray-200 px-2 py-1 text-sm">
        Size: {image?.width}x{image?.height}
      </div>
    </div>
  );
}

interface CreateFileMenuProps {
  className?: string;
  onClickCreateFolder?: () => void;
  onClickCreateFile?: () => void;
  onClickUploadFile?: () => void;
}

export function CreateFileMenu({
  className = "h-8",
  onClickCreateFolder,
  onClickCreateFile,
  onClickUploadFile,
}: CreateFileMenuProps) {
  interface MenuItem {
    id: string;
    icon: React.ReactNode;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }

  const menuItems: MenuItem[] = [
    {
      id: "folder",
      icon: <SmallDirectoryIcon className="h-full w-full" showPlus={true} />,
      text: "Folder",
      onClick: onClickCreateFolder,
    },
    {
      id: "file",
      icon: <SmallFileIcon className="h-full w-full" showPlus={true} />,
      text: "File",
      onClick: onClickCreateFile,
    },
    {
      id: "upload",
      icon: <SmallFileIcon className="h-full w-full" showPlus={true} />,
      text: "Upload files",
      onClick: onClickUploadFile,
    },
  ];

  return (
    <div className={classNames("relative ml-auto self-center", className)}>
      <Menu>
        <MenuButton className="flex h-full items-center rounded hover:bg-gray-200 data-[active]:bg-gray-300">
          <svg className="h-full w-auto" viewBox="0 0 32 32">
            <line
              x1={16}
              y1={8}
              x2={16}
              y2={24}
              className="stroke-gray-500"
              strokeWidth={3}
            />
            <line
              x1={8}
              y1={16}
              x2={24}
              y2={16}
              className="stroke-gray-500"
              strokeWidth={3}
            />
          </svg>
          <div className="pr-2 text-gray-700">Create</div>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="z-40 flex w-40 flex-col overflow-hidden rounded-md border bg-white shadow [--anchor-gap:0.25rem]"
        >
          {menuItems.map((item) => (
            <MenuItem key={item.id} disabled={!item.onClick}>
              {({ disabled }) => (
                <button
                  disabled={disabled}
                  onClick={item.onClick}
                  className="group flex items-center justify-start space-x-2 px-2 py-1 text-left disabled:cursor-default data-[focus]:bg-gray-200"
                >
                  <div className="h-7 w-7 group-disabled:opacity-50">
                    {item.icon}
                  </div>
                  <span className="text-gray-800 group-disabled:text-gray-500">
                    {item.text}
                  </span>
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
