import Link from "next/link";
import Center from "./Center";

export function Footer() {
  return (
    <footer className="border-t border-dashed border-gray-400 bg-gray-200 py-16">
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
              Thank you to all the contributors who make this project possible!
            </p>
          </div>
          <div className="mb-4 flex-shrink-0 flex-grow-0 sm:mb-0">
            <h5 className="mb-1 font-semibold text-gray-900">Community</h5>
            <ul>
              <li>
                <Link
                  className="text-gray-700 hover:underline"
                  href="/community-guidelines"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:underline"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
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
  );
}
