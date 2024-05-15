"use client";

import { useRef } from "react";
import Link from "next/link";
import Center from "../components/Center";
import ConvertBox from "../components/ConvertBox";
import Nav, { NavSpace } from "../components/Nav";

export default function Index() {
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="sticky top-[8px] z-30 border-b border-gray-300">
        <Nav title="Leopard" />
      </div>

      {process.env.NEXT_PUBLIC_IS_ALPHA === "true" && (
        <div className="-mb-px border-b border-yellow-400 bg-yellow-200 py-2 text-yellow-900">
          <div className="mx-auto max-w-4xl px-8">
            You are currently exploring the Leopard alpha. It is broken,
            insecure, and incomplete. Nothing you create here is private, and it
            may be deleted at any time. Please test it out and{" "}
            <Link
              href="https://github.com/PullJosh/leopard-website/issues"
              className="font-semibold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              report any issues you find
            </Link>
            .
          </div>
        </div>
      )}

      <Center>
        <div
          className={`relative flex ${
            process.env.NEXT_PUBLIC_IS_ALPHA === "true"
              ? "min-h-[calc(100vh-8.5rem)]"
              : "min-h-[calc(100vh-4.5rem)]"
          } flex-col`}
        >
          <div className="flex flex-grow flex-col justify-center py-12">
            <img
              className="mx-auto my-2 h-20 w-20"
              src="/leopard-logo.svg"
              alt="Leopard logo"
            />
            <h2 className="mb-3 text-center text-xl font-semibold text-gray-800">
              Convert Scratch projects to JavaScript!
            </h2>
            <div className="mx-auto w-full max-w-3xl space-y-16 px-8">
              <ConvertBox />
            </div>
          </div>

          <ScrollDownButton onClick={scrollToBottom} />
        </div>
      </Center>

      <div ref={bottomSectionRef} className="bg-gray-200 py-16">
        <Center>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Scratch is great, but it can be limiting.
          </h2>
          <p className="mb-4 text-xl text-gray-700">
            Leopard translates your Scratch projects to JavaScript, which opens
            up a whole new world of programming possibilities.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="https://youtu.be/qmM9OPWG5W4"
              className="min-h-[11rem] rounded-md bg-indigo-600 p-4"
            >
              <span className="text-xl font-semibold text-white">
                Introduction to Leopard
              </span>
              <p className="text-indigo-100">
                Learn the basics of Leopard in this video from PullJosh
              </p>
            </Link>
            <Link
              href="/help/publish-with-vercel"
              className="min-h-[11rem] rounded-md bg-orange-600 p-4"
            >
              <span className="text-xl font-semibold text-white">
                Publish your project as a website
              </span>
              <p className="text-orange-100">
                You can publish Leopard projects anywhere!
              </p>
            </Link>
            <Link
              href="https://scratch.mit.edu/discuss/topic/420162/"
              className="col-span-2 flex items-center rounded-md bg-gray-900 p-4"
            >
              <span className="font-semibold text-white">Need help?</span>
              <span className="mx-2 text-gray-100">Ask on the forums!</span>
              <svg viewBox="0 0 8 14" className="ml-auto h-4 text-white">
                <line
                  x1="1"
                  y1="1"
                  x2="7"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="13"
                  x2="7"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </Center>
      </div>

      <footer className="bg-gray-300 py-16">
        <Center>
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="mb-4 max-w-xs flex-grow">
              <Link
                href="/"
                className="text-xl font-semibold text-gray-900 hover:underline"
              >
                Leopard
              </Link>
              <p className="text-gray-600">
                Thank you to all the contributors who make this project
                possible!
              </p>
            </div>
            <div className="flex-shrink-0 flex-grow-0">
              <h5 className="mb-1 font-semibold text-gray-900">Source Code</h5>
              <ul>
                <li>
                  <a
                    className="text-gray-700 hover:underline"
                    href="https://github.com/PullJosh/leopard"
                    target="_blank"
                  >
                    leopard
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 hover:underline"
                    href="https://github.com/PullJosh/sb-edit"
                    target="_blank"
                  >
                    sb-edit
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 hover:underline"
                    href="https://github.com/PullJosh/leopard-website"
                    target="_blank"
                  >
                    leopard-website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Center>
      </footer>
    </>
  );
}

interface ScrollDownButtonProps {
  onClick?: React.MouseEventHandler;
}

function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  return (
    <button
      className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4"
      onClick={onClick}
    >
      <svg viewBox="0 0 16 9" className="w-6 text-gray-800">
        <line
          x1={1}
          y1={1}
          x2={8}
          y2={8}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={15}
          y1={1}
          x2={8}
          y2={8}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
