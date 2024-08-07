"use client";

import { useRef } from "react";
import Link from "next/link";
import Center from "../../components/Center";
import ConvertBox from "../../components/ConvertBox";
import { PatreonIcon } from "../../components/icons/Patreon";
import { sponsors } from "./sponsors/sponsors";

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
      <Center>
        <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col">
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

      <div
        ref={bottomSectionRef}
        className="border-y border-gray-300 bg-white py-8"
      >
        <Center>
          <div className="flex space-x-8">
            <div className="flex flex-grow-0 flex-col">
              <h1 className="mb-1 text-xl font-bold">Sponsors</h1>
              <p className="self-stretch">
                Leopard is made possible by generous
                <br />
                support from sponsors and donors.
              </p>
              <div className="mt-4 flex justify-start">
                <a
                  href="https://www.patreon.com/bePatron?u=128069536"
                  className="z-10 flex items-center justify-center space-x-2 pr-4 text-center text-indigo-600 hover:text-indigo-800 active:text-indigo-900"
                >
                  <PatreonIcon className="h-4 w-4 fill-current" />
                  <span>Support Leopard</span>
                </a>
                <div className="-mx-px h-6 self-center border-r-2 border-gray-300" />
                <Link
                  href="/sponsors"
                  className="z-10 flex items-center justify-center space-x-2 pl-4 text-center text-indigo-600 hover:text-indigo-800 active:text-indigo-900"
                >
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="flex flex-grow items-center justify-center">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  className="flex items-center space-x-4 text-gray-500 transition-colors hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-16">{sponsor.logo}</div>
                  <span className="text-2xl font-bold">{sponsor.name}</span>
                </a>
              ))}
            </div>
          </div>
        </Center>
      </div>

      <div className="bg-gray-100 py-16">
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
