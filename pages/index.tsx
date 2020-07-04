import Link from "next/link";

import Preview from "../components/Preview";
import Title from "../components/Title";

function Center({ children }) {
  return <div className="container max-w-xl px-8 mx-auto">{children}</div>;
}

function Index({ id }) {
  return (
    <div className="bg-gray-200">
      <Title />
      <header className="py-8 pb-32 -mb-24 bg-white border-t-8 border-indigo-600">
        <Center>
          <nav className="flex items-center py-8">
            <h1 className="text-3xl">
              <Link href="/">
                <a className="font-bold text-gray-800 hover:underline">
                  Leopard
                </a>
              </Link>
            </h1>
            <div className="flex items-center ml-auto">
              <Link href="/translations/motion">
                <a className="text-xl text-indigo-800 hover:underline">
                  Block Translations
                </a>
              </Link>
            </div>
          </nav>
          <p className="text-xl text-gray-600">
            Automatically convert{" "}
            <a
              href="https://scratch.mit.edu/"
              target="_blank"
              className="text-indigo-700 hover:underline"
            >
              Scratch
            </a>{" "}
            projects to JavaScript!
          </p>
        </Center>
        <div className="py-8">
          <img
            className="max-w-full mx-auto"
            src="/translation-example.png"
            alt="Example of Scratch blocks translated to Javascript"
          />
        </div>
      </header>

      <Center>
        <Preview id={id} />
      </Center>

      <Center>
        <h2 className="mt-12 mb-2 text-2xl font-bold text-gray-800">
          Scratch is great, but it can be limiting.
        </h2>
        <p className="mb-4 text-xl text-gray-700">
          With JavaScript, you get...
        </p>
      </Center>

      <ul className="grid max-w-3xl grid-cols-1 gap-4 px-8 mx-auto sm:grid-cols-3">
        <li className="p-4 bg-white rounded shadow">
          <svg
            className="w-8 h-8 mb-2 text-white bg-indigo-600 rounded"
            viewBox="0 0 32 32"
          >
            <path
              d="m16 7 2.9389 4.9549 5.6206 1.2639-3.8042 4.3262 0.53478 5.7361-5.2901-2.2812-5.2901 2.2812 0.53478-5.7361-3.8042-4.3262 5.6206-1.2639z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Features</h4>
            <div>Cool tricks that Scratch just can't do.</div>
          </div>
        </li>
        <li className="p-4 bg-white rounded shadow">
          <svg
            className="w-8 h-8 mb-2 text-white bg-indigo-600 rounded"
            viewBox="0 0 32 32"
          >
            <path
              d="m17 7v7h4l-6 11v-7h-4z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Speed</h4>
            <div>Bigger projects, without the lag.</div>
          </div>
        </li>
        <li className="p-4 bg-white rounded shadow">
          <svg
            className="w-8 h-8 mb-2 text-white bg-indigo-600 rounded"
            viewBox="0 0 32 32"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="16" cy="16" r="8" />
              <ellipse cx="16" cy="16" rx="3" ry="8" />
              <path d="m8 16h16" />
            </g>
          </svg>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">
              Publishing options
            </h4>
            <div>
              Run your projects on <i>any</i> website, not just Scratch.
            </div>
          </div>
        </li>
      </ul>

      <Center>
        <h2 className="mt-12 mb-2 text-2xl font-bold text-gray-800">
          Get the big-picture introduction
        </h2>
        <p className="mb-4 text-xl text-gray-700">
          Who is Leopard for? How do you use it?{" "}
          <a
            href="https://scratch.mit.edu/users/PullJosh"
            target="_blank"
            className="text-indigo-700"
          >
            PullJosh
          </a>{" "}
          answers.
        </p>
        <div
          className="relative w-full"
          style={{ paddingTop: `${(9 / 16) * 100}%` }}
        >
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src="https://www.youtube-nocookie.com/embed/qmM9OPWG5W4"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Center>

      <Center>
        <h2 className="mt-12 mb-2 text-2xl font-bold text-gray-800">
          Beyond the basics
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/help/publish-with-vercel">
            <a className="p-4 pb-24 text-xl font-semibold text-white bg-orange-600 rounded-md">
              Publish your project as a website!
            </a>
          </Link>
        </div>
      </Center>

      <footer className="py-16 mt-16 bg-gray-300">
        <Center>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
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
            <div className="col-start-4">
              <h5 className="mb-2 font-semibold text-gray-900">Source Code</h5>
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
    </div>
  );
}

Index.getInitialProps = ({ query }) => {
  let { id } = query;
  if (id === undefined) {
    id = null;
  } else {
    id = parseInt(id, 10);
  }
  return { id };
};

export default Index;
