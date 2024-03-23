import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import leopardLogo from "../public/leopard-logo.svg";
import { useRouter } from "next/router";

export default function HomepageNav() {
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
      <Link href="/" className="flex flex-col items-center hover:underline">
        <div className="flex w-20">
          <Image src={leopardLogo} alt="Leopard logo" />
        </div>
        <h1 className="text-lg font-bold text-gray-800">Leopard</h1>
      </Link>
      <div className="flex space-x-4 rounded-full bg-white p-1">
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

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  current?: boolean;
}

function NavItem({ children, href = "/", current = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={classNames("rounded-full px-5 py-2", {
        "hover:bg-gray-300": !current,
        "bg-indigo-600 text-white": current,
      })}
    >
      {children}
    </Link>
  );
}
