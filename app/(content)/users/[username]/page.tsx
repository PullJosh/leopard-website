import classNames from "classnames";

import Image from "next/image";
import DefaultProfilePicture from "../../../../public/default-profile-picture.svg";

import Link from "next/link";

import { Metadata, ResolvingMetadata } from "next";

import prisma from "../../../../lib/prisma";
import { relativeDateStr } from "../../../../lib/fuzzyDate";
import { cookies } from "next/headers";
import { getUser, sessionTokenCookieName } from "../../../../lib/getUser";

interface Props {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params: { username } }: Props) {
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  const profile = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    include: {
      projects: {
        where: {
          shared: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          projects: {
            where: {
              shared: false,
            },
          },
        },
      },
    },
  });

  if (!profile) {
    throw new Error(`User with username ${username} does not exist`);
  }

  const unsharedCount = profile._count.projects;

  return (
    <>
      <div className="my-8">
        <div className="mx-auto max-w-4xl px-8">
          <div className="grid grid-cols-[auto,1fr] grid-rows-[auto] gap-x-8">
            <div className="w-44">
              <div className="h-44 w-44 overflow-hidden rounded-lg">
                <Image
                  layout="intrinsic"
                  src={DefaultProfilePicture}
                  alt={profile.username}
                />
              </div>
              <h1
                className={classNames("mt-2 break-words font-semibold", {
                  "text-2xl": profile.username.length < 16,
                  "text-xl":
                    profile.username.length >= 16 &&
                    profile.username.length < 20,
                  "text-lg": profile.username.length >= 20,
                })}
              >
                {profile.username}
              </h1>
              <div className="text-sm">
                Joined {relativeDateStr(profile.createdAt)}
              </div>
            </div>
            <div>
              {user && user.id === profile.id && unsharedCount > 0 && (
                <div className="mb-4 flex items-center space-x-2 rounded-md bg-gray-200 px-4 py-2">
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <div>
                    You have{" "}
                    <Link
                      href="/mystuff"
                      className="text-indigo-700 hover:underline"
                    >
                      {unsharedCount} unshared projects
                    </Link>{" "}
                    that only you can see.
                  </div>
                </div>
              )}
              <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
                <div className="flex border-b-2 border-gray-300">
                  <div className="mb-[-2px] flex items-center space-x-2 border-b-2 border-indigo-600 px-4 py-2 focus-visible:bg-gray-100 focus-visible:outline-none">
                    <span className="text-lg font-medium text-indigo-800">
                      Projects
                    </span>{" "}
                    <span className="rounded-full bg-indigo-100 px-2 py-px text-sm text-indigo-900">
                      {profile.projects.length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="divide-y divide-gray-300">
                    {profile.projects.map((project) => (
                      <div key={project.id}>
                        <Link
                          href={`/projects/${project.id}`}
                          className="flex justify-between space-x-4 px-4 py-4 hover:bg-gray-100"
                        >
                          <div className="self-start">
                            <strong className="font-bold">
                              {project.title}
                            </strong>
                            {project.description && (
                              <div className="text-sm text-gray-500">
                                {project.description
                                  .replaceAll("\n", " ")
                                  .slice(0, 100)}
                                {project.description.length > 100 && "..."}
                              </div>
                            )}
                          </div>
                          <div
                            className={classNames(
                              "whitespace-nowrap text-sm text-gray-500",
                              {
                                "self-center": !project.description,
                                "self-baseline": !!project.description,
                              },
                            )}
                            title={`Created on ${project.createdAt.toLocaleDateString()} at ${project.createdAt.toLocaleTimeString()}`}
                          >
                            {relativeDateStr(project.createdAt)}
                          </div>
                        </Link>
                      </div>
                    ))}
                    {profile.projects.length === 0 && (
                      <div className="bg-gray-100 px-8 py-24 text-center">
                        <div className="font-medium text-gray-700">
                          There's nothing here!
                        </div>
                        <p className="text-sm text-gray-600">
                          {profile.username} has not shared any projects yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(
  { params: { username } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Username is case-insensitive, but we fetch the exact username to display
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: { username: true },
  });

  return {
    title: user!.username,
    description: `Projects by ${user!.username}`,
  };
}
