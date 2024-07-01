import classNames from "classnames";

export interface RemixIconProps {
  className?: string;
}

export function RemixIcon({ className }: RemixIconProps) {
  return (
    <svg
      className={classNames("stroke-current", className)}
      viewBox="0 0 20 10"
      strokeLinecap="round"
      fill="none"
    >
      <g transform="matrix(1.29412,0,0,1.44118,-2.88235,-14.1684)">
        <path
          d="M3,10.525C3,12.167 4.485,13.5 6.313,13.5L16.687,13.5"
          strokeWidth={1.46}
        />
      </g>
      <g transform="matrix(1,0,0,1,0,-11.2125)">
        <path d="M18.713,16.5L15.645,13.433" strokeWidth={2} />
      </g>
      <g transform="matrix(1,0,0,-1,0,21.7875)">
        <path d="M18.713,16.5L15.645,13.433" strokeWidth={2} />
      </g>
    </svg>
  );
}
