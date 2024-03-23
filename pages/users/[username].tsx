import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { PrismaClient } from "@prisma/client";
import Title from "../../components/Title";
import TopBorder from "../../components/TopBorder";
import Nav, {
  NavLoggedOutUserInfo,
  NavSpace,
  NavUserInfo,
} from "../../components/Nav";
import classNames from "classnames";

import { Tab } from "@headlessui/react";

import Image from "next/image";
import DefaultProfilePicture from "../../public/default-profile-picture.svg";

import { useSession } from "../_app";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
const prisma = new PrismaClient();

interface ProfilePageProps {
  user: {
    id: string;
    username: string;
    joinDate: string;
  };
  projects: {
    id: string;
    title: string;
  }[];
}

export default function ProfilePage({
  user,
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user: sessionUser } = useSession();

  return (
    <>
      <Title>{user.username}</Title>
      <TopBorder />
      <div className="border-b border-gray-300">
        <Nav>
          {/* <Link
            href={`/users/${user.username}`}
            className="flex items-center text-lg font-semibold hover:underline"
          >
            {user.username}
          </Link> */}

          <NavSpace />

          {sessionUser === null ? (
            <NavLoggedOutUserInfo />
          ) : (
            <NavUserInfo username={sessionUser.username} />
          )}
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
                Joined {relativeDateStr(new Date(user.joinDate))}
              </div>
            </div>
            <div>
              <div className="rounded-xl border border-gray-300 bg-white">
                <Tab.Group>
                  <Tab.List className="flex border-b-2 border-gray-300">
                    {[
                      { name: "Projects", count: projects.length },
                      // { name: "Posts", count: 54 },
                      // { name: "Comments", count: 178 },
                    ].map((tab) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) =>
                          classNames(
                            "mb-[-2px] flex items-center space-x-2 border-b-2 px-4 py-2 focus-visible:bg-gray-100 focus-visible:outline-none",
                            {
                              "border-transparent hover:border-gray-400":
                                !selected,
                              "border-indigo-600": selected,
                            },
                          )
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames("text-lg font-medium", {
                                "text-indigo-800": selected,
                              })}
                            >
                              {tab.name}
                            </span>{" "}
                            <span className="rounded-full bg-indigo-100 px-2 py-px text-sm text-indigo-900">
                              {tab.count}
                            </span>
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div className="divide-y divide-gray-300">
                        {projects.map((project) => (
                          <div key={project.id}>
                            <Link
                              href={`/projects/${project.id}`}
                              className="flex items-center px-4 py-4 hover:bg-gray-100"
                            >
                              <strong className="mr-auto font-bold">
                                {project.title}
                              </strong>
                              <div className="text-sm text-gray-500">
                                {relativeDateStr(new Date(project.createdAt))}
                              </div>
                            </Link>
                          </div>
                        ))}
                        {projects.length === 0 && (
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
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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

interface ScaledIframeProps
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {}

function ScaledIframe(props: ScaledIframeProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const parent = iframe.parentElement!;

    const updateSize = () => {
      const width = parent.clientWidth;
      iframe.style.transformOrigin = "top left";
      iframe.style.transform = `scale(${width / 480})`;
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(parent);

    return () => observer.disconnect();
  }, []);

  return <iframe ref={ref} {...props} />;
}

export const getServerSideProps = (async (ctx) => {
  const params = ctx.params as { username: string };
  const { username } = params;

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

  return {
    props: {
      user: {
        id: user.id,
        username: user.username,
        joinDate: user.createdAt.toISOString(),
      },
      projects: user.projects.map((project) => ({
        id: project.id,
        title: project.title,
        createdAt: project.createdAt.toISOString(),
      })),
    },
  };
}) satisfies GetServerSideProps<ProfilePageProps>;
