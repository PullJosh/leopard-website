import Center from "../../components/Center";
import Nav from "../../components/Nav";

import { notFound } from "next/navigation";
import prisma from "../../lib/prisma";
import Link from "next/link";
import classNames from "classnames";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token } = searchParams;

  if (typeof token !== "string") {
    return notFound();
  }

  let updateEmail = await prisma.emailAddress
    .update({
      where: { verificationToken: token },
      data: { verified: true, verifiedAt: new Date() },
      include: { user: { select: { username: true } } },
    })
    .catch(() => {
      // If the token is invalid, the update will fail
      return null;
    });

  return (
    <>
      <div className="sticky top-[8px] z-30 border-b border-gray-300">
        <Nav title="Email Verification" />
      </div>
      {updateEmail ? (
        <div className="bg-green-200 py-4">
          <Center className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6 fill-green-700"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Your email address, {updateEmail.address}, has been verified.
            </span>
          </Center>
        </div>
      ) : (
        <div className="bg-yellow-200 py-4">
          <Center>This link is invalid.</Center>
        </div>
      )}
      <div className="my-8 text-center">
        <Center>
          {updateEmail ? (
            <>
              <h1 className="text-xl font-semibold">
                Welcome to the community!
              </h1>
              <div className="relative mx-auto my-4 h-48 w-48">
                {new Array(14).fill(null).map((_, i, arr) => {
                  const angle = (i / arr.length) * (2 * Math.PI) + Math.PI / 2;
                  const size = i % 2 === 0 ? 32 : 18;
                  return (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400"
                      style={{
                        width: size,
                        height: size,
                        left: `calc(50% + ${
                          (48 + 4 + size / 2) * Math.cos(angle)
                        }px)`,
                        top: `calc(50% - ${
                          (48 + 4 + size / 2) * Math.sin(angle)
                        }px)`,
                      }}
                    />
                  );
                })}
                {new Array(14).fill(null).map((_, i, arr) => {
                  let angle = (i / arr.length) * (2 * Math.PI) + Math.PI / 2;
                  const size = i % 2 === 0 ? 20 : 10;
                  if (i % 2 === 0) {
                    angle += 1.54 * (Math.PI / arr.length);
                  } else {
                    angle += 0.55 * (Math.PI / arr.length);
                  }
                  return (
                    <div
                      key={i}
                      className={classNames(
                        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                        {
                          "bg-gray-400/65": i % 2 === 0,
                          "bg-gray-400/50": i % 2 === 1,
                        },
                      )}
                      style={{
                        width: size,
                        height: size,
                        left: `calc(50% + ${
                          (72 + size / 2) * Math.cos(angle)
                        }px)`,
                        top: `calc(50% - ${
                          (72 + size / 2) * Math.sin(angle)
                        }px)`,
                      }}
                    />
                  );
                })}
                {new Array(28).fill(null).map((_, i, arr) => {
                  let angle = (i / arr.length) * (2 * Math.PI) + Math.PI / 2;
                  angle += [
                    (-3.3 * Math.PI) / arr.length,
                    (-3.77 * Math.PI) / arr.length,
                    (-4 * Math.PI) / arr.length,
                    (-4.65 * Math.PI) / arr.length,
                  ][i % 4];
                  const size = [9, 11, 6, 10][i % 4];
                  return (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400/30"
                      style={{
                        width: size,
                        height: size,
                        left: `calc(50% + ${
                          (93 - size / 2) * Math.cos(angle)
                        }px)`,
                        top: `calc(50% - ${
                          (93 - size / 2) * Math.sin(angle)
                        }px)`,
                      }}
                    />
                  );
                })}
                <img
                  className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  src="/default-profile-picture.svg"
                  alt={updateEmail?.user?.username ?? "User"}
                />
              </div>
              <p>
                You can now share projects and participate in the Leopard
                community.
              </p>
              <div className="mt-4 flex justify-center">
                <Link
                  href="/mystuff"
                  className="block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 active:bg-indigo-800"
                >
                  Start Creating
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-xl font-semibold">
                Your email verification link is invalid.
              </h1>
              <p>
                <Link href="/" className="text-indigo-700 hover:underline">
                  Return home
                </Link>
              </p>
            </>
          )}
        </Center>
      </div>
    </>
  );
}
