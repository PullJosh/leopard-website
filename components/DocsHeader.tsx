import Link from "next/link";
import classNames from "classnames";
import palettes from "../lib/palettes";

export default function DocsHeader({ palette }: { palette?: string }) {
  return (
    <header className="sticky top-0 bg-white border-t-8 border-indigo-600 shadow-md">
      <div className="flex items-center max-w-4xl px-4 py-6 mx-auto">
        <h1 className="mr-12 text-3xl">
          <Link href="/">
            <a className="font-bold text-gray-800 hover:underline">Leopard</a>
          </Link>
        </h1>
        <Link href="/translations/motion">
          <a className="text-xl text-indigo-800 hover:underline">
            Block Translations
          </a>
        </Link>
      </div>
      <nav className="border-t">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="-mx-4">
            {palettes.map(({ name, color }) => {
              const active = name === palette;
              return (
                <Link
                  key={name}
                  href={`/translations/${name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  <a
                    className={classNames("palette-nav__link", {
                      "palette-nav__link--active": active
                    })}
                    style={
                      {
                        "--paletteColor": color.join(", ")
                      } as React.CSSProperties
                    }
                  >
                    {name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <style jsx>
        {`
          .palette-nav__link {
            display: inline-block;
            padding: 8px 16px;
            position: relative;
            font-size: 16px;
            color: rgb(var(--paletteColor));
            font-weight: 500;
            text-decoration: none;
          }
          .palette-nav__link--active,
          .palette-nav__link:hover {
            background: rgba(var(--paletteColor), 0.13);
          }
          .palette-nav__link--active::after {
            content: " ";
            position: absolute;
            bottom: 0;
            left: 16px;
            right: 16px;
            height: 4px;
            background: rgb(var(--paletteColor));
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          }
        `}
      </style>
    </header>
  );
}
