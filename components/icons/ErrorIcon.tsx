import classNames from "classnames";

interface ErrorIconProps {
  className?: string;
}

export function ErrorIcon({ className = "h-5 w-5" }: ErrorIconProps) {
  return (
    <svg
      className={classNames("flex-shrink-0 flex-grow-0", className)}
      viewBox="0 0 28 28"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="matrix(1,0,0,1,2,2)">
        <path
          d="M7,0L17,0L24,7L24,17L17,24L7,24L0,17L0,7L7,0Z"
          className="fill-current stroke-current"
          strokeWidth="4"
        />
      </g>
      <g transform="matrix(1,0,0,1,-0.5,0)">
        <path
          d="M14.5,4.5L14.5,16"
          className="stroke-red-100"
          fill="none"
          strokeWidth="4"
        />
      </g>
      <g transform="matrix(1,0,0,1,-0.5,-0.5)">
        <circle cx="14.5" cy="23.5" r="2" className="fill-red-100" />
      </g>
    </svg>
  );
}
