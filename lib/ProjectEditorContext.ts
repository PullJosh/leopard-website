import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  AbstractFile,
  DirectoryPath,
  DirectoryType,
  FilePath,
  Path,
  getDirectory,
  getFile,
  getPath,
  isFilePath,
} from "./fileHelpers";

interface ProjectEditorContext<FileType extends AbstractFile> {
  root: DirectoryType<FileType>;
  activePath: Path;
  setActivePath: (newPath: Path) => void;
  fileEdits: { [key: string]: string };
  setFileEdits: Dispatch<SetStateAction<{ [key: string]: string }>>;
  createDirectory: (path: DirectoryPath) => Promise<void>;
  createFile: (path: FilePath, content?: string) => Promise<void>;
}

export const ProjectEditorContext = createContext<
  ProjectEditorContext<AbstractFile>
>({
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

export function useFile(path: Path) {
  const ctx = useContext(ProjectEditorContext);

  if (!isFilePath(path)) return null;
  return getFile(path, ctx.root);
}

export function useDirectory(path: DirectoryPath) {
  const ctx = useContext(ProjectEditorContext);
  const directory = useMemo(
    () => getDirectory(path, ctx.root),
    [ctx.root, path],
  );
  return directory;
}

export function usePath(path: Path, root?: DirectoryType<AbstractFile>) {
  const ctx = useContext(ProjectEditorContext);
  const fileOrDirectory = useMemo(
    () => getPath(path, root ?? ctx.root),
    [root, ctx.root, path],
  );
  return fileOrDirectory;
}
