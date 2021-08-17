import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import leopardLogo from "../public/leopard-logo.svg";
import { useRouter } from "next/router";

export default function Nav() {
  let currentMode = null;

  const router = useRouter();
  if (router.pathname === "/") {
    currentMode = "automatic";
  }
  if (router.pathname === "/manual") {
    currentMode = "manual";
  }

  return (
    <nav className="flex items-center justify-between pt-10 pb-8">
      <Link href="/">
        <a className="flex flex-col items-center hover:underline">
          <div className="w-20 flex">
            <Image src={leopardLogo} alt="Leopard logo" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">Leopard</h1>
        </a>
      </Link>
      <div className="flex space-x-4 bg-white p-1 rounded-full">
        <NavItem href="/" current={currentMode === "automatic"}>
          Automatic
        </NavItem>
        <NavItem href="/manual" current={currentMode === "manual"}>
          Manual
        </NavItem>
      </div>
    </nav>
  );
}

function NavItem({ children, href = "/", current = false }) {
  return (
    <Link href={href}>
      <a
        className={classNames("px-5 py-2 rounded-full", {
          "hover:bg-gray-300": !current,
          "bg-indigo-700 text-white": current
        })}
      >
        {children}
      </a>
    </Link>
  );
}
