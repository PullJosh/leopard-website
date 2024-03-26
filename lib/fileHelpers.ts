export type FileName = `${string}.${string}`;
export type DirectoryName = string;
export type DirectoryPath = DirectoryName[];
export type FilePath = [...DirectoryName[], FileName];
export type Path = DirectoryPath | FilePath;

export interface AbstractFile {
  id: string;
  name: FileName;
  path: FilePath;
  content?: string;
  asset?: string;
}

export type DirectoryType<FileType extends AbstractFile> = {
  name: DirectoryName;
  path: DirectoryPath;
  directories: DirectoryType<FileType>[];
  files: FileType[];
};

export function getDirectory<FileType extends AbstractFile>(
  path: DirectoryPath,
  directory: DirectoryType<FileType>,
): DirectoryType<FileType> | null {
  if (path.length === 0) return directory;

  const subdirectory = directory.directories.find(
    (subdirectory) => subdirectory.name === path[0],
  );
  if (!subdirectory) return null;

  return getDirectory(path.slice(1), subdirectory);
}

export function getFile<FileType extends AbstractFile>(
  path: FilePath,
  directory: DirectoryType<FileType>,
) {
  if (path.length === 0) return null;

  const d = getDirectory(path.slice(0, -1) as DirectoryPath, directory);
  if (!d) return null;

  const file = d.files.find((file) => pathMatches(file.path, path));
  return file ?? null;
}

export function findFile<FileType extends AbstractFile>(
  directory: DirectoryType<FileType>,
  predicate: (file: FileType) => boolean,
): FileType | null {
  const file = directory.files.find(predicate);
  if (file) return file;

  for (const subdirectory of directory.directories) {
    const file = findFile(subdirectory, predicate);
    if (file) return file;
  }

  return null;
}

export function findAllFiles<FileType extends AbstractFile>(
  directory: DirectoryType<FileType>,
  predicate: (file: FileType) => boolean = () => true,
): FileType[] {
  const files = directory.files.filter(predicate);

  for (const subdirectory of directory.directories) {
    files.push(...findAllFiles(subdirectory, predicate));
  }

  return files;
}

export function pathToString(path: Path) {
  return path.join("/");
}

export function stringToPath(path: string): Path {
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  return path.split("/");
}

export function isFileName(name: string): name is FileName {
  return /^[^/]+\.[^/]+$/.test(name);
}

export function isFilePath(path: Path): path is FilePath {
  return path.length > 0 && isFileName(path[path.length - 1]);
}

export function isDirectoryPath(path: Path): path is DirectoryPath {
  return !isFilePath(path);
}

export function pathMatches(a: Path, b: Path) {
  return pathToString(a) === pathToString(b);
}

export function fileExtension(name: FileName | FilePath): string {
  if (Array.isArray(name)) {
    const fileName = name[name.length - 1] as FileName;
    return fileExtension(fileName);
  }

  const parts = name.split(".");
  return parts[parts.length - 1];
}

export function pathContains(path: DirectoryPath, subpath: Path): boolean {
  if (path.length > subpath.length) return false;

  for (let i = 0; i < path.length; i++) {
    if (path[i] !== subpath[i]) return false;
  }

  return true;
}

export function getPath<FileType extends AbstractFile>(
  path: Path,
  dir: DirectoryType<FileType>,
):
  | { type: "file"; file: FileType; path: FilePath }
  | {
      type: "directory";
      directory: DirectoryType<FileType>;
      path: DirectoryPath;
    }
  | null {
  if (isFilePath(path)) {
    const file = getFile(path, dir);
    if (file) return { type: "file", file, path };
  }

  if (isDirectoryPath(path)) {
    const directory = getDirectory(path, dir);
    if (directory) return { type: "directory", directory, path };
  }

  return null;
}

export function listAllFilesRecursive<FileType extends AbstractFile>(
  dir: DirectoryType<FileType>,
): FileType[] {
  return [...dir.files, ...dir.directories.flatMap(listAllFilesRecursive)];
}

export function getSmartSelectPath(directory: DirectoryType<AbstractFile>) {
  const findFirstMatch = <T>(
    arr: T[],
    conditions: ((value: T) => boolean)[],
  ) => {
    for (const c of conditions) {
      const result = arr.find(c);
      if (result) return result;
    }
  };

  const smartIndexFile = findFirstMatch(directory.files, [
    (f) => f.name === `${directory.name}.js`,
    (f) => f.name.split(".")[0] === directory.name,
    (f) => f.name.toLowerCase() === `${directory.name.toLowerCase()}.js`,
    (f) => f.name.toLowerCase().split(".")[0] === directory.name.toLowerCase(),
    (f) => f.name === "index.js",
    (f) => f.name === "index.html",
    (f) => f.name.split(".")[0] === "index",
    (f) => f.name.toLowerCase().split(".")[0] === "index",
  ]);

  if (smartIndexFile) {
    return smartIndexFile.path;
  } else {
    return directory.path;
  }
}
