import classNames from "classnames";
import Link from "next/link";

interface SeeInsideButtonProps {
  id: string;
}

export function SeeInsideButton({ id }: SeeInsideButtonProps) {
  return (
    <Link
      href={`/projects/${id}/editor`}
      className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 active:bg-indigo-800"
    >
      <FlipIcon className="mr-2 h-6 w-auto" /> See Inside
    </Link>
  );
}

interface SeeProjectPageButtonProps {
  id: string;
}

export function SeeProjectPageButton({ id }: SeeProjectPageButtonProps) {
  return (
    <Link
      href={`/projects/${id}`}
      className="flex items-center rounded-md bg-white px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-400 hover:bg-gray-200 active:bg-gray-300"
    >
      <FlipIcon className="mr-2 h-6 w-auto text-gray-600" /> See Project Page
    </Link>
  );
}

interface FlipIconProps {
  className?: string;
}

function FlipIcon({ className }: FlipIconProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-current stroke-current", className)}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
    >
      <g transform="matrix(1,0,0,1,-3.85335,-2.49173)">
        <g transform="matrix(1.58892,-0.669599,0.616506,1.46293,-24.6274,11.6723)">
          <path
            d="M13.902,26.972L19.494,20.194L21.826,28.78L13.902,26.972Z"
            strokeWidth={1.81}
          />
        </g>
        <g transform="matrix(1.42696,0,0,1.34329,-8.03168,-2.17865)">
          <path
            d="M17.499,25.564C12.243,25.192 11.139,15.328 19.772,11.606C8.909,14.583 7.292,25.192 16.348,29.658"
            strokeWidth={2.16}
          />
        </g>
      </g>
      <g transform="matrix(-1,0,0,-1,51.8533,50.4917)">
        <g transform="matrix(1.58892,-0.669599,0.616506,1.46293,-24.6274,11.6723)">
          <path
            d="M13.902,26.972L19.494,20.194L21.826,28.78L13.902,26.972Z"
            strokeWidth={1.81}
          />
        </g>
        <g transform="matrix(1.42696,0,0,1.34329,-8.03168,-2.17865)">
          <path
            d="M17.499,25.564C12.243,25.192 11.139,15.328 19.772,11.606C8.909,14.583 7.292,25.192 16.348,29.658"
            strokeWidth={2.16}
          />
        </g>
      </g>
    </svg>
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-current stroke-current", className)}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
    >
      <g transform="matrix(0.932702,0,0,0.932702,0.13521,-2.5475)">
        <g transform="matrix(1.52992,0,0,1.44022,-8.75616,-10.3261)">
          <path
            d="M12.5,28L16.5,18.5L22.184,26.514L12.5,28Z"
            strokeWidth={1.5}
          />
        </g>
        <g transform="matrix(1.52992,0,0,1.44022,-8.75616,-10.3261)">
          <path
            d="M15.279,21.399C8.991,20.362 8.991,15.502 19.341,12.316C6.392,13.967 2.327,19.223 13.669,25.223"
            strokeWidth={1.5}
          />
        </g>
      </g>
      <g transform="matrix(-0.932702,0,0,-0.932702,47.8739,30.4811)">
        <g transform="matrix(1.52992,0,0,1.44022,-8.75616,-10.3261)">
          <path
            d="M12.5,28L16.5,18.5L22.184,26.514L12.5,28Z"
            strokeWidth={1.5}
          />
        </g>
        <g transform="matrix(1.52992,0,0,1.44022,-8.75616,-10.3261)">
          <path
            d="M15.279,21.399C8.991,20.362 8.991,15.502 19.341,12.316C6.392,13.967 2.327,19.223 13.669,25.223"
            strokeWidth={1.5}
          />
        </g>
      </g>
    </svg>
  );
}
