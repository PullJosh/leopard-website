import { useRef } from "react";
import Link from "next/link";
import Title from "../components/Title";
import TopBorder from "../components/TopBorder";
import Center from "../components/Center";
import Nav from "../components/Nav";
import ConvertBox from "../components/ConvertBox";

function Index() {
  const bottomSectionRef = useRef(null);

  const scrollToBottom = () => {
    bottomSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Title />

      <TopBorder />

      <Center>
        <div className="relative flex flex-col min-h-[100vh]">
          <Nav />

          <div className="py-12 flex-grow flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-center mb-3 text-gray-800">
              Convert your Scratch projects to JavaScript!
            </h2>
            <ConvertBox />
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
            <Link href="https://youtu.be/qmM9OPWG5W4">
              <a className="p-4 min-h-[11rem] bg-indigo-600 rounded-md">
                <span className="text-xl font-semibold text-white">
                  Introduction to Leopard
                </span>
                <p className="text-indigo-100">
                  Learn the basics of Leopard in this video from PullJosh
                </p>
              </a>
            </Link>
            <Link href="/help/publish-with-vercel">
              <a className="p-4 min-h-[11rem] bg-orange-600 rounded-md">
                <span className="text-xl font-semibold text-white">
                  Publish your project as a website
                </span>
                <p className="text-orange-100">
                  You can publish Leopard projects anywhere!
                </p>
              </a>
            </Link>
            <Link href="https://scratch.mit.edu/discuss/topic/420162/">
              <a className="col-span-2 p-4 bg-gray-900 rounded-md flex items-center">
                <span className="font-semibold text-white">Need help?</span>
                <span className="text-gray-100 mx-2">Ask on the forums!</span>
                <svg viewBox="0 0 8 14" className="h-4 ml-auto text-white">
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
              </a>
            </Link>
          </div>
        </Center>
      </div>

      <footer className="py-16 bg-gray-300">
        <Center>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex-grow max-w-xs mb-4">
              <Link href="/">
                <a className="text-xl font-semibold text-gray-900 hover:underline">
                  Leopard
                </a>
              </Link>
              <p className="text-gray-600">
                Thank you to all the contributors who make this project
                possible!
              </p>
            </div>
            <div className="flex-grow-0 flex-shrink-0">
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

export default Index;

function ScrollDownButton({ onClick }) {
  return (
    <button
      className="absolute bottom-4 p-4 left-1/2 -translate-x-1/2"
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
