import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  // Sync "checked" state to checkbox input, regardless of whether it is controlled or uncontrolled
  const [checked, setChecked] = useState(false);
  useLayoutEffect(() => {
    const checkbox = ref.current;

    if (!checkbox) return;

    setChecked(checkbox.checked);
    const onChange = () => {
      setChecked(checkbox.checked);
    };

    checkbox.addEventListener("change", onChange);
    return () => checkbox.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <div
        className={classNames(
          className,
          "mr-2 h-5 w-5 flex-shrink-0 flex-grow-0 rounded border border-transparent ring-indigo-700/20 group-focus-within:border-indigo-700 group-focus-within:ring-2",
          {
            "bg-indigo-600": checked,
            "bg-gray-400": !checked,
          },
        )}
      >
        <svg
          className={classNames("-m-px h-5 w-5 text-white", {
            "opacity-0 group-hover:text-gray-600 group-hover:opacity-50":
              !checked,
          })}
          viewBox="0 0 20 20"
        >
          <polyline
            points="4 10, 8 14, 16 6"
            className="stroke-current"
            strokeWidth={2}
            fill="none"
          />
        </svg>
      </div>
      <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
    </>
  );
}
