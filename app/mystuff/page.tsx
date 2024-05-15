import Nav, { NavSpace } from "../../components/Nav";

import { cookies } from "next/headers";
import { getUser, sessionTokenCookieName } from "../../lib/getUser";
import { redirect } from "next/navigation";

import prisma from "../../lib/prisma";

import { relativeDateStr } from "../../lib/fuzzyDate";
import Link from "next/link";
import { changeProjectShared } from "../../actions/changeProjectShared";

export default async function MyStuff() {
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  if (!user) {
    return redirect("/");
  }

  const projects = await prisma.project.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="border-b border-gray-300">
        <Nav>
          <NavSpace />
        </Nav>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-4xl px-8">
          <h1 className="text-3xl font-semibold">My Stuff</h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="mt-2">
              {projects.length === 0 ? (
                <div className="rounded-lg bg-gray-300 px-8 py-16 text-center">
                  <svg
                    className="mx-auto mb-4 h-16 w-16"
                    viewBox="0 0 773 768"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeMiterlimit={1.5}
                  >
                    <g
                      transform="matrix(1,0,0,1,-183.667,-186.667)"
                      className="fill-none stroke-gray-600"
                      strokeLinecap="square"
                      strokeWidth={26.67}
                    >
                      <path d="M570,680C728,680 781,746 794,759C794,834 818,941 570,941C322,941 346,830 346,759C357,742 412,680 570,680Z" />
                      <path d="M345.369,789.038C263.747,764.734 197,708.932 197,582C197,383 371,200 570,200C769,200 943,383 943,582C943,710.521 876.218,766.261 794.566,790.14" />
                      <g transform="matrix(1,0,0,1,0,20)">
                        <path d="M872.158,365.973C834.728,478.363 847.977,565.454 924.469,650.667" />
                      </g>
                      <g transform="matrix(-1,0,0,1,1140,20)">
                        <path d="M872.158,365.973C834.728,478.363 847.977,565.454 924.469,650.667" />
                      </g>
                      <g transform="matrix(0.95567,0,0,0.931319,25.2683,52.6291)">
                        <circle cx="570" cy="395" r="182" />
                      </g>
                      <g className="fill-gray-600 stroke-none">
                        <g transform="matrix(1,0,0,1.01626,0,-13.6748)">
                          <ellipse cx="492.5" cy="779.5" rx="21.5" ry="61.5" />
                        </g>
                        <g transform="matrix(1,0,0,1.01626,156,-13.6748)">
                          <ellipse cx="492.5" cy="779.5" rx="21.5" ry="61.5" />
                        </g>
                      </g>
                    </g>
                  </svg>

                  <p>
                    <strong className="font-semibold">
                      Power up your programming!
                    </strong>
                  </p>
                  <p>
                    Begin by{" "}
                    <Link href="/" className="text-indigo-700 hover:underline">
                      creating your first Leopard project
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="grid grid-cols-[1fr,auto] rounded-lg border border-gray-300 bg-white p-4"
                    >
                      <div>
                        <div>
                          <Link
                            href={`/projects/${project.id}`}
                            className="font-semibold hover:underline"
                          >
                            {project.title}
                          </Link>
                          {project.scratchProjectId && (
                            <>
                              {" "}
                              (
                              <Link
                                href={`https://scratch.mit.edu/projects/${project.scratchProjectId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-700 hover:underline"
                              >
                                Scratch
                              </Link>
                              )
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-700">
                          {relativeDateStr(project.createdAt)}
                        </div>
                      </div>

                      <form action={changeProjectShared}>
                        <input
                          type="hidden"
                          name="projectId"
                          value={project.id}
                        />
                        <input
                          type="hidden"
                          name="shared"
                          value={String(!project.shared)}
                        />
                        {project.shared ? (
                          <button
                            type="submit"
                            className="flex items-center space-x-2 rounded-md border border-indigo-600 bg-white px-4 py-2 text-indigo-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                                clipRule="evenodd"
                              />
                              <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                            </svg>
                            <span>Unshare</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="flex items-center space-x-2 rounded-md bg-indigo-600 px-4 py-2 text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                              <path
                                fillRule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Share</span>
                          </button>
                        )}
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
