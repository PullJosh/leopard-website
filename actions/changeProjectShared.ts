"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getUser, sessionTokenCookieName } from "../lib/getUser";
import prisma from "../lib/prisma";

export async function changeProjectShared(formData: FormData) {
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  if (!user) {
    throw new Error("Must be signed in");
  }

  const projectId = formData.get("projectId") as string;
  const project = await prisma.project.findFirst({
    where: { id: projectId, ownerId: user.id },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const newShared = formData.get("shared") === "true";

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { shared: newShared },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/mystuff");

  return updatedProject;
}
