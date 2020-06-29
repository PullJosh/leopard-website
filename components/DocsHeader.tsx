import Link from "next/link";
import classNames from "classnames";
import palettes from "../lib/palettes";

export default function DocsHeader({ palette }: { palette?: string }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <h1 className="site-title">
          <Link href="/">
            <a>Leopard</a>
          </Link>
        </h1>
        <Link href="/translations/motion">
          <a className="nav-link">Block Translations</a>
        </Link>
      </div>
      <nav className="palette-nav">
        <div className="palette-nav__inner">
          {palettes.map(({ name, color }) => {
            const active = name === palette;
            return (
              <Link
                key={name}
                href={`/translations/${name.toLowerCase().replace(/ /g, "-")}`}
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
      </nav>
      <style jsx>
        {`
          .site-header {
            position: sticky;
            top: 0;
            background: #fff;
            border-top: 8px solid hsl(243, 94%, 66%);
            border-bottom: 1px solid #ddd;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }
          .site-header__inner {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 16px;
            display: flex;
            align-items: center;
          }
          .palette-nav__inner {
            max-width: 1000px;
            margin: 0 auto;
          }

          .site-title {
            font-size: 24px;
            margin-right: 32px;
          }
          .site-title a {
            color: hsl(211, 39%, 23%);
          }

          .palette-nav {
            border-top: 1px solid #ddd;
          }
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
