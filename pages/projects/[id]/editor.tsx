import classNames from "classnames";
import { useRouter } from "next/router";
import {
  Dispatch,
  Fragment,
  MouseEventHandler,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ProjectResponseJSON } from "../../api/projects/[id]/get";
import TopBorder from "../../../components/TopBorder";
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
  getPath,
  DirectoryPath,
  isFilePath,
  getSmartSelectPath,
} from "../../../lib/fileHelpers";
import { useHashState } from "../../../lib/useHashState";
import {
  UpdateFilesRequestJSON,
  UpdateFilesResponseJSON,
} from "../../api/projects/[id]/updateFiles";
import { useHotkeys } from "react-hotkeys-hook";
import { Dialog, Menu } from "@headlessui/react";
import Title from "../../../components/Title";
import Nav, {
  NavAnonymousProjectWarning,
  NavLoggedOutUserInfo,
  NavProjectDescription,
  NavSpace,
  NavUserInfo,
} from "../../../components/Nav";
import { useSession } from "../../../components/SessionProvider";
import { useProject } from "../../../lib/useProject";
import { SeeProjectPageButton } from "../../../components/SeeInsideButton";

const imageFileExtensions = ["png", "svg", "jpg", "jpeg"];
const audioFileExtensions = ["wav", "mp3"];

interface ProjectEditorContext<FileType extends AbstractFile> {
  root: DirectoryType<FileType>;
  activePath: Path;
  setActivePath: (newPath: Path) => void;
  fileEdits: { [key: string]: string };
  setFileEdits: Dispatch<SetStateAction<{ [key: string]: string }>>;
  createDirectory: (path: DirectoryPath) => Promise<void>;
  createFile: (path: FilePath, content?: string) => Promise<void>;
}

const ProjectEditorContext = createContext<ProjectEditorContext<AbstractFile>>({
  root: {
    name: "",
    directories: [],
    files: [],
    path: [],
  },
  activePath: [],
  setActivePath: () => {},
  fileEdits: {},
  setFileEdits: () => {},
  createDirectory: async () => {},
  createFile: async () => {},
});

function useFile(path: FilePath) {
  const ctx = useContext(ProjectEditorContext);
  const file = useMemo(() => getFile(path, ctx.root), [ctx.root, path]);
  return file;
}

function useDirectory(path: DirectoryPath) {
  const ctx = useContext(ProjectEditorContext);
  const directory = useMemo(
    () => getDirectory(path, ctx.root),
    [ctx.root, path],
  );
  return directory;
}

function usePath(path: Path, root?: DirectoryType<AbstractFile>) {
  const ctx = useContext(ProjectEditorContext);
  const fileOrDirectory = useMemo(
    () => getPath(path, root ?? ctx.root),
    [root, ctx.root, path],
  );
  return fileOrDirectory;
}

export default function ProjectEditorPage() {
  const router = useRouter();
  const { id } = router.query;

  const projectResponse = useProject(id as string);
  const projectState = projectResponse.state;
  const project =
    projectResponse.state === "ready" ? projectResponse.project : null;
  const setProject =
    projectResponse.state === "ready" ? projectResponse.setProject : null;

  const root = useMemo(() => {
    let files: {
      id: string;
      path: FilePath;
      name: FileName;
      content?: string | undefined;
      asset?: string | undefined;
    }[] = [];
    let directoryPaths: DirectoryPath[] = [];

    if (project) {
      for (const file of project.files) {
        const path = stringToPath(file.path);
        if (isFilePath(path)) {
          const name = path[path.length - 1] as FileName;
          files.push({ ...file, name, path });
        } else {
          directoryPaths.push(path);
        }
      }
    }

    return groupFilesByDirectory(files, directoryPaths);
  }, [project]);

  const [activePath, setActivePath] = useHashState(
    [],
    pathToString,
    stringToPath,
  );

  // TODO: Use `getSmartSelectPath` to automatically load index.js as the default file rather than opening up to a blank path

  const monaco = useMonaco();
  const [ready, setReady] = useState(true);

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

  const updateFiles = useCallback(
    (body: UpdateFilesRequestJSON) => {
      return fetch(`/api/projects/${id}/updateFiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res: UpdateFilesResponseJSON) => {
          setFileEdits({});
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
        });
    },
    [id, setProject],
  );

  const saveFileEdits = useCallback(() => {
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

  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  const previewURL = `/api/preview/${id}/index.html`;
  const [previewRunning, setPreviewRunning] = useState(false);
  const runPreview = useCallback(async () => {
    if (!previewIframeRef.current) return;

    if (previewRunning) {
      previewIframeRef.current.contentWindow?.location.reload();
    } else {
      setPreviewRunning(true);
    }
  }, [previewRunning]);
  const stopPreview = useCallback(() => {
    setPreviewRunning(false);
  }, []);

  // Ctrl + S outside of editor
  useHotkeys("mod+s", () => saveFileEdits().then(runPreview), {
    preventDefault: true,
  });

  // Ctrl + S inside of editor
  useEffect(() => {
    if (!monaco) return;

    monaco.editor.addCommand({
      id: "saveAndRun",
      run: () => saveFileEdits().then(runPreview),
    });

    monaco.editor.addKeybindingRule({
      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      command: "saveAndRun",
    });
  }, [monaco, runPreview, saveFileEdits]);

  const [createFileModalOpen, setCreateFileModalOpen] = useState(false);

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

  const fileGridRef = useRef<FileGridRef>(null);

  const { user } = useSession();

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
      <Title>{project?.title}</Title>
      <div className="grid h-screen w-screen grid-rows-[auto,1fr]">
        <style jsx global>{`
          body {
            overscroll-behavior: none;
          }
        `}</style>
        <div className="border-b border-gray-300">
          <TopBorder />
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
            {project && project.owner === null && (
              <NavAnonymousProjectWarning
                projectId={project.id}
                setProject={setProject!}
              />
            )}
            <div className="ml-4 mr-2 flex py-3">
              <SeeProjectPageButton id={id as string} />
            </div>
          </Nav>
        </div>
        <div className="flex divide-x divide-gray-300 overflow-hidden">
          {!ready && <div className="flex-grow">Loading...</div>}
          {ready && (
            <div className="relative flex flex-grow flex-col">
              {projectState === "error" && (
                <div className="flex flex-grow items-center justify-center">
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
                </div>
              )}
              {!first && (
                <div className="flex flex-grow items-center justify-center bg-gray-100 text-gray-800">
                  {/* TODO: Make this blank screen look nicer */}
                  Select a file to start editing
                </div>
              )}
              {first && (
                <div>
                  <div className="relative z-50">
                    <FileTabs path={first.path} />
                  </div>
                  <div className="flex items-center space-x-1 border-b border-gray-300 bg-white px-2 py-1 text-sm">
                    {activePath.map((part, i) => (
                      <Fragment key={i}>
                        <span className="text-gray-400">/</span>
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
                </div>
              )}
              {first?.type === "file" && (
                <div className="relative flex-grow">
                  <FileEditor file={first.file} />
                </div>
              )}
              {first?.type === "directory" && (
                <>
                  {secondPath.length >= 2 && (
                    <div className="relative flex flex-grow overflow-hidden">
                      {second?.type === "file" && (
                        <FileEditor file={second.file} />
                      )}
                      {second?.type === "directory" && (
                        <div className="grid h-full flex-grow grid-cols-[1fr,4fr] grid-rows-1 overflow-hidden">
                          <div className="grid h-full grid-cols-1 grid-rows-1 overflow-y-auto">
                            <FileList path={second.path} />
                          </div>
                          <div className="relative flex items-center justify-center bg-gray-100">
                            {activePath.length === 2 && (
                              <div>
                                <em>Select a file to edit</em>
                              </div>
                            )}
                            {active?.type === "file" && (
                              <FileEditor file={active.file} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div className="flex flex-col divide-y divide-gray-300 bg-gray-100">
            <div className="flex h-12 flex-shrink-0 items-center space-x-1 px-2">
              <button
                data-tooltip-id="green-flag"
                className={classNames(
                  "h-9 w-9 rounded-md hover:bg-gray-300 active:bg-green-200",
                  // { "bg-gray-300": previewRunning },
                )}
                onClick={() => saveFileEdits().then(runPreview)}
              >
                <img
                  className="h-full w-full"
                  src="/green-flag.svg"
                  alt="Green flag"
                />
              </button>
              <button
                className="h-9 w-9 rounded-md enabled:hover:bg-gray-300 enabled:active:bg-red-200 disabled:opacity-25"
                onClick={() => stopPreview()}
                disabled={!previewRunning}
              >
                <img
                  className="h-full w-full"
                  src="/stop-sign.svg"
                  alt="Stop sign"
                />
              </button>
              <Tooltip
                className="z-50 !rounded-md !py-1 !pl-2 !pr-1 text-center"
                id="green-flag"
                place="bottom"
                delayShow={500}
                closeEvents={{
                  click: true, // This is the one I actually care about enabling. The rest are just required because I'm overriding the entire `closeEvents` object.
                  blur: true,
                  dblclick: true,
                  mouseleave: true,
                  mouseup: true,
                }}
              >
                <div className="flex space-x-2">
                  <span>Save & run</span>
                  <span className="flex items-center rounded border border-white/20 px-1 text-xs text-white/40">
                    Ctrl + S
                  </span>
                </div>
              </Tooltip>
            </div>
            <div className="relative p-0">
              <iframe
                ref={previewIframeRef}
                className="h-[360px] w-[480px] bg-white"
                src={previewRunning ? previewURL : "about:blank"}
              />
              {!previewRunning && (
                <button
                  className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800/30"
                  onClick={() => saveFileEdits().then(runPreview)}
                >
                  <img
                    className="h-20 w-20 rounded-full border-4 border-white bg-white/50 p-2"
                    src="/green-flag.svg"
                    alt="Green flag"
                  />
                </button>
              )}
            </div>
            <div className="flex flex-grow flex-col overflow-hidden">
              <div className="flex h-12 flex-initial items-center border-b border-gray-300 px-4 py-1">
                <div>Project Files</div>
                <CreateFileMenu
                  className="h-7"
                  onClickCreateFile={() => {
                    fileGridRef.current?.createFile();
                  }}
                  onClickCreateFolder={() => {
                    fileGridRef.current?.createDirectory();
                  }}
                />
              </div>
              <div className="relative grid flex-1 grid-cols-1 grid-rows-1 overflow-hidden">
                <FileGrid ref={fileGridRef} smartSelect={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={createFileModalOpen}
        onClose={() => setCreateFileModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-gray-900/40 p-4">
          <Dialog.Panel className="w-full max-w-lg rounded border-t-4 border-indigo-600 bg-white p-8">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Create File
            </Dialog.Title>
            {/* <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description> */}

            <ul>
              <li>Empty Folder</li>
              <li>Leopard Sprite</li>
              <li>Empty File</li>
              <li>Upload File</li>
            </ul>

            <button onClick={() => setCreateFileModalOpen(false)}>
              Deactivate
            </button>
            <button onClick={() => setCreateFileModalOpen(false)}>
              Cancel
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
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
                src={`https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${file.asset}`}
                alt={`Image file ${file.path}`}
                className="h-6 w-6 border border-gray-300"
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

interface FileGridProps {
  path?: DirectoryPath;
  smartSelect?: boolean; // When the user selects a folder, intelligently select the "index" file inside
}

interface FileGridRef {
  createDirectory: () => void;
  createFile: () => void;
}

const FileGrid = forwardRef(function FileGrid(
  { path = [], smartSelect = false }: FileGridProps,
  ref,
) {
  const ctx = useContext(ProjectEditorContext);
  const directory = useDirectory(path);

  const goToDirectory = useCallback(
    (directory: DirectoryType<AbstractFile>) => {
      if (smartSelect) {
        ctx.setActivePath(getSmartSelectPath(directory));
      } else {
        ctx.setActivePath(directory.path);
      }
    },
    [ctx, smartSelect],
  );

  const [creatingState, setCreatingState] = useState<
    | { type: "directory"; name: string; loading: boolean }
    | { type: "file"; name: string; loading: boolean }
    | null
  >(null);

  useImperativeHandle<any, FileGridRef>(
    ref,
    () => ({
      createDirectory: () => {
        setCreatingState((state) =>
          state === null
            ? { type: "directory", name: "", loading: false }
            : state,
        );
      },
      createFile: () => {
        setCreatingState((state) =>
          state === null ? { type: "file", name: "", loading: false } : state,
        );
      },
    }),
    [],
  );

  if (directory === null) return null;

  return (
    <div
      className="relative grid justify-between gap-4 overflow-y-auto p-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, 3.5rem)" }}
    >
      {directory.directories.map((directory) => {
        const thumbnailImage = getDirectoryThumbnailImage(directory);
        const active = pathContains(directory.path, ctx.activePath);

        return (
          <button
            key={directory.name}
            className="flex h-16 w-14 flex-col items-stretch"
            onClick={() => goToDirectory(directory)}
            disabled={active}
          >
            <DirectoryIcon imageSrc={thumbnailImage ?? undefined} />
            <div
              className={classNames(
                "overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-center text-xs",
                { "text-indigo-600": active },
              )}
            >
              {directory.name}
            </div>
          </button>
        );
      })}
      {creatingState?.type === "directory" && (
        <div className="flex h-16 w-14 flex-col items-stretch">
          <DirectoryIcon />
          <input
            type="text"
            className="text-center text-xs"
            autoFocus={true}
            disabled={creatingState.loading}
            onBlur={() => setCreatingState(null)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setCreatingState(null);
              }
              if (event.key === "Enter") {
                setCreatingState({ ...creatingState, loading: true });
                ctx
                  .createDirectory([...directory.path, creatingState.name])
                  .then(() => setCreatingState(null));
              }
            }}
            value={creatingState.name}
            onChange={(event) => {
              setCreatingState({
                ...creatingState,
                name: event.target.value,
              });
            }}
          />
        </div>
      )}
      {directory.files.map((file) => {
        const active = pathMatches(ctx.activePath, file.path);

        return (
          <button
            key={file.id}
            className="flex h-16 flex-col items-stretch justify-center"
            onClick={() => ctx.setActivePath(file.path)}
            disabled={pathMatches(ctx.activePath, file.path)}
          >
            <FileIcon
              extension={file.name.split(".")[1] ?? ""}
              imageSrc={
                imageFileExtensions.includes(file.name.split(".")[1])
                  ? `https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${file.asset}`
                  : undefined
              }
            />
            <div
              className={classNames(
                "overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-center text-xs",
                { "text-indigo-600": active },
              )}
            >
              {file.name}
            </div>
          </button>
        );
      })}
      {creatingState?.type === "file" && (
        <div className="flex h-16 w-14 flex-col items-stretch">
          <FileIcon extension={creatingState.name.split(".")?.[1] ?? ""} />
          <input
            type="text"
            className="text-center text-xs"
            autoFocus={true}
            disabled={creatingState.loading}
            onBlur={() => setCreatingState(null)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setCreatingState(null);
              }
              if (event.key === "Enter") {
                if (!isFilePath([...directory.path, creatingState.name])) {
                  alert("Invalid file name");
                  return;
                }

                setCreatingState({ ...creatingState, loading: true });
                ctx
                  .createFile([
                    ...directory.path,
                    creatingState.name as FileName,
                  ])
                  .then(() => setCreatingState(null));
              }
            }}
            value={creatingState.name}
            onChange={(event) => {
              setCreatingState({
                ...creatingState,
                name: event.target.value,
              });
            }}
          />
        </div>
      )}
    </div>
  );
});

// function getDirectoryThumbnailFiles<FileType extends AbstractFile>(
//   directory: DirectoryType<FileType>,
//   maxCount: number = 3,
// ): FileType[] {
//   const jsFile = findFile(
//     directory,
//     (file) => fileExtension(file.path) === "js",
//   );

//   const imageFile = findFile(directory, (file) => {
//     return imageFileExtensions.includes(fileExtension(file.path));
//   });

//   let thumbnailFiles: FileType[] = [];
//   // if (jsFile) thumbnailFiles.push(jsFile);
//   if (imageFile) thumbnailFiles.push(imageFile);

//   return thumbnailFiles.slice(0, maxCount);
// }

function getDirectoryThumbnailImage<FileType extends AbstractFile>(
  directory: DirectoryType<FileType>,
): string | null {
  const imageFile = findFile(directory, (file) => {
    return imageFileExtensions.includes(fileExtension(file.path));
  });

  if (!imageFile) return null;

  return `https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${imageFile.asset}`;
}

interface FileTabsProps {
  path: Path;
}

interface FileTabsRef {
  createDirectory: () => void;
  createFile: () => void;
}

const FileTabs = forwardRef(function FileTabs({ path }: FileTabsProps, ref) {
  const ctx = useContext(ProjectEditorContext);

  const [creatingState, setCreatingState] = useState<
    | { type: "directory"; name: string; loading: boolean }
    | { type: "file"; name: string; loading: boolean }
    | null
  >(null);

  const createDirectory = useCallback(() => {
    setCreatingState((state) =>
      state === null ? { type: "directory", name: "", loading: false } : state,
    );
  }, []);

  const createFile = useCallback(() => {
    setCreatingState((state) =>
      state === null ? { type: "file", name: "", loading: false } : state,
    );
  }, []);

  useImperativeHandle<any, FileTabsRef>(
    ref,
    () => ({
      createDirectory,
      createFile,
    }),
    [createDirectory, createFile],
  );

  const content = usePath(path);
  if (!content) return null;

  return (
    <div className="box-content flex h-12 items-end border-b border-gray-300 bg-gray-100">
      {content.type === "file" ? (
        <TabButton
          name={content.file.name}
          selected={true}
          hasUnsavedChanges={content.file.id in ctx.fileEdits}
        >
          {content.file.name}
        </TabButton>
      ) : (
        <>
          {content.directory.directories.map((directory) => {
            const selected = pathContains(directory.path, ctx.activePath);

            return (
              <TabButton
                key={directory.name}
                type="directory"
                name={directory.name}
                selected={selected}
                onClick={() => {
                  ctx.setActivePath(directory.path);
                }}
              >
                {directory.name}
              </TabButton>
            );
          })}
          {creatingState?.type === "directory" && (
            <TabButton
              type="directory"
              name={creatingState.name}
              selected={false}
              hasUnsavedChanges={false}
              className="relative"
            >
              <input
                type="text"
                className="text-center"
                autoFocus={true}
                disabled={creatingState.loading}
                onBlur={() => setCreatingState(null)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setCreatingState(null);
                  }
                  if (event.key === "Enter") {
                    setCreatingState({ ...creatingState, loading: true });
                    ctx
                      .createDirectory([
                        ...content.directory.path,
                        creatingState.name,
                      ])
                      .then(() => setCreatingState(null));
                  }
                }}
                value={creatingState.name}
                onChange={(event) => {
                  setCreatingState({
                    ...creatingState,
                    name: event.target.value,
                  });
                }}
              />
            </TabButton>
          )}
          {content.directory.files.map((file) => {
            const selected = pathMatches(file.path, ctx.activePath);

            return (
              <TabButton
                key={file.id}
                name={file.name}
                selected={selected}
                hasUnsavedChanges={file.id in ctx.fileEdits}
                onClick={() => {
                  ctx.setActivePath(file.path);
                }}
              >
                {file.name}
              </TabButton>
            );
          })}

          <CreateFileMenu
            className="mr-3 h-8"
            onClickCreateFolder={() => createDirectory()}
            onClickCreateFile={() => createFile()}
          />
        </>
      )}
    </div>
  );
});

interface TabButtonProps {
  type?: "directory" | "file";
  name?: string;
  children: React.ReactNode;
  selected?: boolean;
  hasUnsavedChanges?: boolean;
  className?: string;
  onClick?: () => void;
}

function TabButton({
  type = "file",
  name,
  children,
  selected = false,
  hasUnsavedChanges = false,
  className,
  onClick,
}: TabButtonProps) {
  return (
    <button
      className={classNames(
        "flex items-center space-x-1 self-stretch rounded-t-lg border-x px-5",
        {
          "border-gray-300 bg-white text-indigo-800": selected,
          "border-transparent": !selected,
        },
        className,
      )}
      style={{ boxShadow: selected ? "0 1px 0 white" : undefined }}
      onClick={onClick}
    >
      {type === "directory" && (
        <svg className="-mb-[2px] h-7 w-7" viewBox="0 0 48 48">
          <rect
            x={8}
            y={8}
            width={14}
            height={8}
            rx={3}
            className="fill-gray-500"
          />
          <rect
            x={8}
            y={12}
            width={32}
            height={24}
            rx={3}
            className="fill-gray-500"
          />
        </svg>
      )}
      {type === "file" && (
        <svg className="-mb-px h-7 w-7" viewBox="0 0 48 48">
          <rect
            x={12}
            y={8}
            width={24}
            height={32}
            rx={3}
            className={
              { html: "fill-blue-700", js: "fill-yellow-600" }[
                fileExtension((name ?? "") as FileName)
              ] ?? "fill-gray-500"
            }
          />
          <rect x={16} y={13} width={16} height={3} className="fill-white" />
          <rect x={16} y={20} width={16} height={3} className="fill-white" />
          <rect x={16} y={27} width={8} height={3} className="fill-white" />
        </svg>
      )}
      <span>{children}</span>
      {hasUnsavedChanges && (
        <span className="block h-2 w-2 rounded-full bg-indigo-600" />
      )}
    </button>
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
      <div className="absolute top-0 left-0 h-full w-full">
        <Editor
          className="absolute top-0 left-0 h-full w-full"
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
    if (imageFileExtensions.includes(fileExtension(file.path))) {
      return <ImageEditor file={file} />;
    }

    return (
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-100">
        {audioFileExtensions.includes(fileExtension(file.path)) && (
          <audio
            key={file.id}
            src={`https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${file.asset}`}
            controls
          />
        )}
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
    <div className="absolute top-0 left-0 grid h-full w-full grid-rows-[1fr,auto] bg-gray-100">
      <div className="flex items-center justify-center">
        <img
          key={file.id}
          ref={(el) => setImage(el)}
          src={`https://pub-2c4c62070be24cd593a08b68263568f0.r2.dev/${file.asset}`}
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

interface FileIconProps {
  extension: string;
  imageSrc?: string;
}

function FileIcon({ extension, imageSrc }: FileIconProps) {
  extension = extension.toLowerCase();

  if (imageSrc) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 25 25">
        <rect
          x={0.5}
          y={0.5}
          width={24}
          height={24}
          strokeWidth={1}
          className="fill-white stroke-gray-300"
        />
        <image
          href={imageSrc}
          x={2}
          y={2}
          width={21}
          height={21}
          preserveAspectRatio="xMidYMid"
        />
      </svg>
    );
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 25 32">
      <rect x={0} y={0} width={25} height={32} rx={2} className="fill-white" />
      <g>
        {new Array(7).fill(null).map((_, i) => (
          <rect
            key={i}
            x={2}
            y={3 + i * 4}
            width={i === 6 ? 10.5 : 21}
            height={2}
            className="fill-gray-300"
          />
        ))}
      </g>
      {extension === "js" && (
        <g>
          <rect
            x={6}
            y={10}
            width={12}
            height={12}
            rx={2}
            className="fill-yellow-500"
          />
          <text
            x={12.5}
            y={16}
            style={{
              fontFamily: "'Arial-BoldMT', 'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 8,
            }}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-black"
          >
            JS
          </text>
        </g>
      )}
      {extension === "html" && (
        <g>
          <rect
            x={4}
            y={10}
            width={16}
            height={12}
            rx={2}
            className="fill-blue-700"
          />
          <text
            x={12.5}
            y={16}
            style={{
              fontFamily: "'Arial-BoldMT', 'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 5,
            }}
            dx={-0.5}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white"
          >
            HTML
          </text>
        </g>
      )}
    </svg>
  );
}

interface DirectoryIconProps {
  imageSrc?: string;
}

function DirectoryIcon({ imageSrc }: DirectoryIconProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 32">
      <path
        d="M0,2.346L0,27.725C0,30.084 1.916,32 4.275,32L35.725,32C38.084,32 40,30.084 40,27.725L40,7.775C40,5.416 38.084,3.5 35.725,3.5L19.2,3.5C18.538,3.5 18,2.962 18,2.3L18,2.286L17.999,2.286C17.968,1.019 16.929,0 15.654,0L2.346,0C1.051,0 0,1.051 0,2.346Z"
        className="fill-gray-600"
      />
      <rect
        x={0}
        y={6}
        width={40}
        height={26}
        rx={4}
        className="fill-gray-500"
      />
      {imageSrc && (
        <image
          href={imageSrc}
          x={3}
          y={9}
          width={34}
          height={20}
          preserveAspectRatio="xMidYMid"
        />
      )}
    </svg>
  );
}

const folderIcon = (
  <svg className="h-full w-full" viewBox="0 0 48 48">
    <rect x={8} y={8} width={14} height={8} rx={3} className="fill-current" />
    <rect x={8} y={12} width={32} height={24} rx={3} className="fill-current" />
    <rect x={22} y={16} width={4} height={16} className="fill-white" />
    <rect x={16} y={22} width={16} height={4} className="fill-white" />
  </svg>
);

const fileIcon = (
  <svg className="h-full w-full" viewBox="0 0 48 48">
    <rect x={12} y={8} width={24} height={32} rx={3} className="fill-current" />
    <rect x={22} y={16} width={4} height={16} className="fill-white" />
    <rect x={16} y={22} width={16} height={4} className="fill-white" />
  </svg>
);

const uploadFileIcon = (
  <svg className="h-full w-full" viewBox="0 0 48 48">
    <rect x={12} y={8} width={24} height={32} rx={3} className="fill-current" />
    <rect x={22} y={16} width={4} height={16} className="fill-white" />
    <rect x={16} y={22} width={16} height={4} className="fill-white" />
  </svg>
);

interface CreateFileMenuProps {
  className?: string;
  onClickCreateFolder?: () => void;
  onClickCreateFile?: () => void;
  onClickUploadFile?: () => void;
}

function CreateFileMenu({
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
      icon: folderIcon,
      text: "Folder",
      onClick: onClickCreateFolder,
    },
    {
      id: "file",
      icon: fileIcon,
      text: "File",
      onClick: onClickCreateFile,
    },
    {
      id: "upload",
      icon: uploadFileIcon,
      text: "Upload file",
      onClick: onClickUploadFile,
    },
  ];

  return (
    <div className={classNames("relative ml-auto self-center", className)}>
      <Menu>
        <Menu.Button className="flex h-full items-center rounded hover:bg-gray-200 active:bg-gray-300">
          <svg className="h-full w-full" viewBox="0 0 32 32">
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
        </Menu.Button>
        <Menu.Items className="absolute top-full right-0 z-40 mt-1 flex w-40 flex-col overflow-hidden rounded-md border bg-white shadow">
          {menuItems.map((item) => (
            <Menu.Item key={item.id} disabled={!item.onClick}>
              {({ active, disabled }) => (
                <button
                  disabled={disabled}
                  onClick={item.onClick}
                  className={classNames(
                    "group flex items-center justify-start space-x-2 px-2 py-1 text-left disabled:cursor-default",
                    { "bg-gray-200": active },
                  )}
                >
                  <div className="h-7 w-7 group-enabled:text-gray-500 group-disabled:text-gray-300">
                    {item.icon}
                  </div>
                  <span className="text-gray-800 group-disabled:text-gray-500">
                    {item.text}
                  </span>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
