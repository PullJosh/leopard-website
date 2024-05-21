import prisma from "./prisma";

export const PROJECT_SIZE_LIMIT = 10_000_000;
export const USER_SIZE_LIMIT = 50_000_000;

export async function getProjectCurrentFilesSize(projectId: string) {
  return (
    (
      await prisma.file.aggregate({
        where: { projectId },
        _sum: { size: true },
      })
    )._sum.size ?? 0
  );
}

export async function getUserCurrentFilesSize(userId: string) {
  return (
    (
      await prisma.file.aggregate({
        where: { project: { ownerId: userId } },
        _sum: { size: true },
      })
    )._sum.size ?? 0
  );
}
