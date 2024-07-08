"use client";

import { useEffect, useRef, useState } from "react";
import { Footer } from "../../components/Footer";
import Nav, { NavLink, NavLinks, NavSpace } from "../../components/Nav";
import TopBorder from "../../components/TopBorder";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Center from "../../components/Center";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const { theme } = resolveConfig(tailwindConfig);

interface TOCSection {
  title: string;
  url: string;
  children?: TOCSection[];
}

const tableOfContents: TOCSection = {
  title: "JavaScript for Scratchers",
  url: "/learn",
  children: [
    {
      title: "Major differences between Scratch and JavaScript",
      url: "/learn/differences-between-scratch-and-javascript",
    },
    {
      title: "How do I create a Leopard project?",
      url: "/learn/how-to-create-a-leopard-project",
    },
  ],
};

interface LearnLayoutProps {
  children: React.ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
  const width = useWindowWidth();
  const xlWidth = Number(theme.screens.xl.replace("px", ""));
  const xl = width >= xlWidth;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col xl:grid xl:h-screen xl:grid-cols-[300px,1fr] xl:grid-rows-[auto,1fr] xl:items-stretch xl:overflow-hidden">
      <div className="sticky top-0 z-30 xl:static xl:col-span-full">
        <TopBorder />
        <Nav
          title="Leopard"
          width={xl ? "full" : "default"}
          scrollRef={xl ? scrollRef : undefined}
        >
          <NavLinks>
            <NavLink href="/learn">Learn</NavLink>
          </NavLinks>
          <NavSpace />
        </Nav>
      </div>
      {xl && (
        <nav className="border-r border-gray-300 bg-white">
          <TableOfContents />
        </nav>
      )}
      <div className="flex flex-grow flex-col xl:overflow-auto" ref={scrollRef}>
        <Center className="flex-grow">
          {!xl && (
            <nav className="mt-8 rounded-lg border border-gray-300 bg-white">
              <TableOfContents />
            </nav>
          )}
          <div className="mb-auto py-8">{children}</div>
        </Center>
        <Footer />
      </div>
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function TableOfContents() {
  const pathname = usePathname();

  return (
    <div className="p-4">
      <h2
        className={classNames(
          "mb-1 truncate text-lg font-semibold hover:underline",
          { "text-indigo-800": pathname === tableOfContents.url },
        )}
      >
        <Link href={tableOfContents.url}>{tableOfContents.title}</Link>
      </h2>
      <ul>
        {tableOfContents.children?.map((section, i) => (
          <li
            key={i}
            className={classNames("truncate text-sm hover:underline", {
              "text-indigo-800": pathname === section.url,
            })}
          >
            <Link href={section.url}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
