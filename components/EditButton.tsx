import { useState, useEffect } from "react";
import classNames from "classnames";

export default function EditButton({ projectId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  });

  return (
    <div className="EditButton">
      <a
        className="codesandbox"
        href={`/api/${projectId}/codesandbox`}
        download
      >
        <img src="/codesandbox.svg" alt="CodeSandbox" />
        <span>Edit as Javascript</span>
      </a>
      <button className="arrow" onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/down-arrow.svg" alt="More" />
      </button>

      <div className={classNames("menu", { "menu--open": menuOpen })}>
        <a className="menuItem" href={`/api/${projectId}/zip`} download>
          <img src="/download-icon.svg" alt="" />
          <span>Download ZIP</span>
        </a>
      </div>

      <style jsx>
        {`
          .EditButton {
            display: flex;
            position: relative;

            border: 1px solid hsl(245, 100%, 27%);
            border-radius: 5px;
          }

          .codesandbox {
            display: flex;
            align-items: center;

            color: #fff;
            background: hsl(245, 79%, 52%);
            padding: 8px 16px;
            text-decoration: none;

            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          .codesandbox > img {
            margin-right: 16px;
            opacity: 0.8;
          }
          .codesandbox:hover,
          .codesandbox:active {
            background: hsl(245, 86%, 40%);
          }

          .arrow {
            display: flex;
            align-items: center;

            background: hsl(245, 79%, 52%);
            border: none;
            border-left: 1px solid hsl(245, 100%, 27%);
            padding: 0 12px;

            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            cursor: pointer;
          }
          .arrow:hover,
          .arrow:active {
            background: hsl(245, 86%, 40%);
          }

          .menu {
            display: none;

            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            min-width: 80%;

            background: #fff;
            padding: 8px 0;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .menu--open {
            display: block;
          }
          .menu::before {
            content: " ";
            position: absolute;
            right: 12px;
            top: 0;
            transform: translateY(-100%);
            border: 12px solid transparent;
            border-bottom-color: #fff;
          }
          .menuItem {
            display: flex;
            align-items: center;

            font-size: 18px;
            padding: 6px 16px;
            text-decoration: none;
          }
          .menuItem > img {
            margin-right: 16px;
          }
          .menuItem:hover,
          .menuItem:active {
            background: hsl(210, 36%, 96%);
          }
        `}
      </style>
    </div>
  );
}
