import classNames from "classnames";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ContextMenuItem {
  id: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: "default" | "danger";
}

interface ContextMenuProps {
  children: (bag: { onContextMenu: MouseEventHandler }) => React.ReactNode;
  items: ContextMenuItem[];
}

type ContextMenuState =
  | {
      open: true;
      x: number;
      y: number;
    }
  | {
      open: false;
    };

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [state, setState] = useState<ContextMenuState>({ open: false });

  const ref = useRef<HTMLDivElement>(null);
  const onClick = useCallback((event: MouseEvent) => {
    // check if the click was outside the context menu
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setState({ open: false });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [onClick]);

  return (
    <>
      {children({
        onContextMenu: (e) => {
          e.preventDefault();
          e.stopPropagation();
          setState({ open: true, x: e.clientX, y: e.clientY });
        },
      })}
      {state.open &&
        createPortal(
          <div
            ref={ref}
            className="fixed z-50 flex flex-col rounded-md bg-white py-1 text-xs shadow"
            style={{ left: state.x, top: state.y }}
          >
            {items.map(({ id, onClick, label, style = "default" }) => (
              <button
                key={id}
                className={classNames("block px-3 py-1 text-left", {
                  "text-gray-700 hover:bg-gray-200": style === "default",
                  "text-red-900 hover:bg-red-100": style === "danger",
                })}
                onClick={onClick}
              >
                {label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
