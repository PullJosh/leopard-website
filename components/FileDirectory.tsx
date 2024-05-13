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
} from "../lib/fileHelpers";
import {
  ProjectEditorContext,
  useDirectory,
  useFile,
} from "../lib/ProjectEditorContext";

type FileDirectoryRenderItemProps = (
  | { type: "file"; item: AbstractFile | null }
  | { type: "directory"; item: DirectoryType<AbstractFile> | null }
) & {
  key: string;
  onClick: () => void;
  active: boolean;
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
    createDirectory: () => void;
    createFile: () => void;
  }) => React.ReactNode;
  smartSelect?: boolean;
}

/**
 * `FileDirectory` is a headless component for displaying a file directory.
 * It is used to render file directories in many custom ways (as a grid, as tabs, as a tree, etc.)
 */
export function FileDirectory({
  path,
  children,
  smartSelect = false,
}: FileDirectoryProps) {
  const ctx = useContext(ProjectEditorContext);
  const file = useFile(path);
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

  const createDirectory = () => {
    setCreatingState((state) =>
      state?.type === "directory"
        ? state
        : { type: "directory", name: "", loading: false },
    );
  };

  const createFile = () => {
    setCreatingState((state) =>
      state?.type === "file"
        ? state
        : { type: "file", name: "", loading: false },
    );
  };

  let allItemProps: FileDirectoryRenderItemProps[] = [];

  if (directory !== null) {
    allItemProps = [
      ...allItemProps,
      ...directory.directories.map(
        (directory): FileDirectoryRenderItemProps => ({
          key: `dir_${directory.name}`,
          type: "directory",
          item: directory,
          active: pathContains(directory.path, ctx.activePath),
          onClick: () => goToDirectory(directory),
          renaming: null,
        }),
      ),
    ];

    if (creatingState?.type === "directory") {
      allItemProps.push({
        key: "new_directory",
        type: "directory",
        item: null,
        active: false,
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
          cancel: () => setCreatingState(null),
        },
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
          onClick: () => ctx.setActivePath(file.path),
          renaming: null,
        }),
      ),
    ];

    if (creatingState?.type === "file") {
      allItemProps.push({
        key: "new_file",
        type: "file",
        item: null,
        active: false,
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
          cancel: () => setCreatingState(null),
        },
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
        onClick: () => ctx.setActivePath(file.path),
        renaming: null,
      },
    ];
  } else {
    throw new Error("Invalid path");
  }

  return <>{children({ items: allItemProps, createDirectory, createFile })}</>;
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
