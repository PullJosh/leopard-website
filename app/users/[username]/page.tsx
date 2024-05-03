import classNames from "classnames";

import Image from "next/image";
import DefaultProfilePicture from "../../../public/default-profile-picture.svg";

import Link from "next/link";

import { Metadata, ResolvingMetadata } from "next";
import Nav, { NavSpace } from "../../../components/Nav";

import prisma from "../../../lib/prisma";

interface Props {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params: { username } }: Props) {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    include: {
      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    throw new Error(`User with username ${username} does not exist`);
  }

  return (
    <>
      <div className="border-b border-gray-300">
        <Nav>
          <NavSpace />
        </Nav>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-4xl px-8">
          <div className="grid grid-cols-[auto,1fr] grid-rows-[auto] gap-x-8">
            <div className="w-44">
              <div className="h-44 w-44 overflow-hidden rounded-lg">
                <Image
                  layout="intrinsic"
                  src={DefaultProfilePicture}
                  alt={user.username}
                />
              </div>
              <h1
                className={classNames("mt-2 break-words font-semibold", {
                  "text-2xl": user.username.length < 16,
                  "text-xl":
                    user.username.length >= 16 && user.username.length < 20,
                  "text-lg": user.username.length >= 20,
                })}
              >
                {user.username}
              </h1>
              <div className="text-sm">
                Joined {relativeDateStr(user.createdAt)}
              </div>
            </div>
            <div>
              <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
                <div className="flex border-b-2 border-gray-300">
                  <div className="mb-[-2px] flex items-center space-x-2 border-b-2 border-indigo-600 px-4 py-2 focus-visible:bg-gray-100 focus-visible:outline-none">
                    <span className="text-lg font-medium text-indigo-800">
                      Projects
                    </span>{" "}
                    <span className="rounded-full bg-indigo-100 px-2 py-px text-sm text-indigo-900">
                      {user.projects.length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="divide-y divide-gray-300">
                    {user.projects.map((project) => (
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
                            className={classNames("text-sm text-gray-500", {
                              "self-center": !project.description,
                              "self-baseline": !!project.description,
                            })}
                          >
                            {relativeDateStr(project.createdAt)}
                          </div>
                        </Link>
                      </div>
                    ))}
                    {user.projects.length === 0 && (
                      <div className="bg-gray-100 px-8 py-24 text-center">
                        <div className="font-medium text-gray-700">
                          There's nothing here!
                        </div>
                        <p className="text-sm text-gray-600">
                          {user.username} has not created any projects yet
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

function relativeDateStr(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (24 * 60 * 60 * 1000)); // TODO: Count days as # of times past midnight, not # of 24-hour periods (so if the date was 11:59pm last night and now it's 12:01am the result is "yesterday")
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(date);
}
