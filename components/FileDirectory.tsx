import { useCallback, useContext, useState } from "react";
import {
  AbstractFile,
  DirectoryPath,
  DirectoryType,
  FileName,
  Path,
  getSmartSelectPath,
  isDirectoryPath,
  isFilePath,
  pathContains,
  pathMatches,
  getFile,
  getDirectory,
  pathToString,
} from "../lib/fileHelpers";
import { ProjectEditorContext } from "../lib/ProjectEditorContext";

type FileDirectoryRenderItemProps = (
  | {
      type: "file";
      item: AbstractFile | null;
      open: undefined;
      toggleOpen: undefined;
      contents: () => null;
    }
  | {
      type: "directory";
      item: DirectoryType<AbstractFile> | null;
      open: boolean;
      toggleOpen: (open?: boolean) => void;
      contents: () => React.ReactNode;
    }
) & {
  key: string;
  onClick: () => void;
  active: boolean;
  activeParent: boolean;
  renaming: {
    name: string;
    setName: (name: string) => void;
    loading: boolean;
    done: () => void;
    cancel: () => void;
  } | null;
};

interface FileDirectoryProps {
  path: Path; // Generally this will be a DirectoryPath, but we also accept a FilePath for the tabs view
  children: (props: {
    items: FileDirectoryRenderItemProps[];
    level: number;
    createDirectory: () => void;
    createFile: () => void;
  }) => React.ReactNode;
  smartSelect?: boolean;
  enableOpenDirectories?: boolean;
}

/**
 * `FileDirectory` is a headless component for displaying a file directory.
 * It is used to render file directories in many custom ways (as a grid, as tabs, as a tree, etc.)
 */
export function FileDirectory({
  path,
  children,
  smartSelect = false,
  enableOpenDirectories = false,
}: FileDirectoryProps) {
  const ctx = useContext(ProjectEditorContext);

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
    | {
        type: "directory";
        parent: DirectoryPath;
        name: string;
        loading: boolean;
      }
    | { type: "file"; parent: DirectoryPath; name: string; loading: boolean }
    | null
  >(null);

  // Map from directory path string to whether it is open
  const [directoriesOpen, setDirectoriesOpen] = useState<
    Record<string, boolean>
  >({});

  const toggleDirectoryOpen = useCallback(
    (path: DirectoryPath, newOpen?: boolean) => {
      const pathStr = pathToString(path);

      setDirectoriesOpen((open) => ({
        ...open,
        [pathStr]: newOpen === undefined ? !open[pathStr] : newOpen,
      }));
    },
    [],
  );

  const revealPath = useCallback((path: Path) => {
    setDirectoriesOpen((oldOpen) => {
      let open = { ...oldOpen };

      // Open all directories in the path
      for (let i = 1; i < path.length + 1; i++) {
        const directoryPath = path.slice(0, i);
        console.log("Reveal", path, directoryPath);
        if (isDirectoryPath(directoryPath)) {
          open[pathToString(directoryPath)] = true;
        }
      }

      return open;
    });
  }, []);

  const createDirectory = () => {
    const parent = isFilePath(ctx.activePath)
      ? ctx.activePath.slice(0, -1)
      : ctx.activePath;

    revealPath(parent);

    setCreatingState((state) =>
      state?.type === "directory"
        ? state
        : { type: "directory", parent, name: "", loading: false },
    );
  };

  const createFile = () => {
    const parent = isFilePath(ctx.activePath)
      ? ctx.activePath.slice(0, -1)
      : ctx.activePath;

    revealPath(parent);

    setCreatingState((state) =>
      state?.type === "file"
        ? state
        : { type: "file", parent, name: "", loading: false },
    );
  };

  const getItemProps = (path: Path, level: number = 0) => {
    let allItemProps: FileDirectoryRenderItemProps[] = [];

    const file = isFilePath(path) ? getFile(path, ctx.root) : null;
    const directory = getDirectory(path, ctx.root);

    if (directory !== null) {
      allItemProps = [
        ...allItemProps,
        ...directory.directories.map(
          (directory): FileDirectoryRenderItemProps => ({
            key: `dir_${directory.name}`,
            type: "directory",
            item: directory,
            active: pathMatches(directory.path, ctx.activePath),
            activeParent:
              pathMatches(directory.path, ctx.activePath) ||
              pathContains(directory.path, ctx.activePath),
            open: directoriesOpen[pathToString(directory.path)] ?? false,
            toggleOpen: (open) => toggleDirectoryOpen(directory.path, open),
            onClick: () => {
              if (enableOpenDirectories) {
                if (pathMatches(directory.path, ctx.activePath)) {
                  toggleDirectoryOpen(directory.path);
                }
              }
              goToDirectory(directory);
            },
            renaming: null,
            contents: () => (
              <>
                {children({
                  items: getItemProps(directory.path, level + 1),
                  level: level + 1,
                  createDirectory,
                  createFile,
                })}
              </>
            ),
          }),
        ),
      ];

      if (
        creatingState?.type === "directory" &&
        pathMatches(creatingState.parent, path)
      ) {
        allItemProps.push({
          key: "new_directory",
          type: "directory",
          item: null,
          active: false,
          activeParent: false,
          open: false,
          toggleOpen: () => {},
          onClick: () => {},
          renaming: {
            name: creatingState.name,
            setName: (name) => setCreatingState({ ...creatingState, name }),
            loading: creatingState.loading,
            done: () => {
              if (!isDirectoryPath([...directory.path, creatingState.name])) {
                alert("Invalid directory name");
                return;
              }

              setCreatingState({ ...creatingState, loading: true });
              ctx
                .createDirectory([...directory.path, creatingState.name])
                .then(() => setCreatingState(null));
            },
            cancel: () => {
              setCreatingState(null);
            },
          },
          contents: () => null,
        });
      }

      allItemProps = [
        ...allItemProps,
        ...directory.files.map(
          (file): FileDirectoryRenderItemProps => ({
            key: `file_${file.id}`,
            type: "file",
            item: file,
            active: pathMatches(file.path, ctx.activePath),
            activeParent: pathMatches(file.path, ctx.activePath),
            open: undefined,
            toggleOpen: undefined,
            onClick: () => ctx.setActivePath(file.path),
            renaming: null,
            contents: () => null,
          }),
        ),
      ];

      if (
        creatingState?.type === "file" &&
        pathMatches(creatingState.parent, path)
      ) {
        allItemProps.push({
          key: "new_file",
          type: "file",
          item: null,
          active: false,
          activeParent: false,
          open: undefined,
          toggleOpen: undefined,
          onClick: () => {},
          renaming: {
            name: creatingState.name,
            setName: (name) => setCreatingState({ ...creatingState, name }),
            loading: creatingState.loading,
            done: () => {
              if (!isFilePath([...directory.path, creatingState.name])) {
                alert("Invalid file name");
                return;
              }

              setCreatingState({ ...creatingState, loading: true });
              ctx
                .createFile([...directory.path, creatingState.name as FileName])
                .then(() => setCreatingState(null));
            },
            cancel: () => {
              setCreatingState(null);
            },
          },
          contents: () => null,
        });
      }
    } else if (file !== null) {
      // If the path is a file, we only show that file
      // This is used for the tabs view
      allItemProps = [
        {
          key: `file_${file.id}`,
          type: "file",
          item: file,
          active: true,
          activeParent: true,
          open: undefined,
          toggleOpen: undefined,
          onClick: () => ctx.setActivePath(file.path),
          renaming: null,
          contents: () => null,
        },
      ];
    } else {
      throw new Error("Invalid path");
    }

    return allItemProps;
  };

  return (
    <>
      {children({
        items: getItemProps(path),
        level: 0,
        createDirectory,
        createFile,
      })}
    </>
  );
}

interface FileDirectoryFileNameInputProps {
  className?: string;
  style?: React.CSSProperties;

  name: string;
  setName: (name: string) => void;
  loading: boolean;
  done: () => void;
  cancel: () => void;
}

export function FileDirectoryFileNameInput({
  className,
  style,
  name,
  setName,
  loading,
  done,
  cancel,
}: FileDirectoryFileNameInputProps) {
  return (
    <input
      type="text"
      className={className}
      style={style}
      autoFocus={true}
      disabled={loading}
      onBlur={() => cancel()}
      onKeyDown={(event) => {
        switch (event.key) {
          case "Escape":
            cancel();
            break;
          case "Enter":
            done();
            break;
        }
      }}
      value={name}
      onChange={(event) => {
        setName(event.target.value);
      }}
    />
  );
}

export interface FileGridProps {
  path: DirectoryPath;
  smartSelect?: boolean;
}

export interface FileGridRef {
  createDirectory: () => void;
  createFile: () => void;
}
