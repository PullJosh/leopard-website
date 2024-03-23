interface FormErrorMessageProps {
  children: React.ReactNode;
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  return (
    <div className="flex items-start space-x-2 rounded bg-red-100 p-3 text-sm text-red-700">
      <svg
        className="h-5 w-5 flex-shrink-0 flex-grow-0"
        viewBox="0 0 28 28"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="matrix(1,0,0,1,2,2)">
          <path
            d="M7,0L17,0L24,7L24,17L17,24L7,24L0,17L0,7L7,0Z"
            className="fill-red-700 stroke-red-700"
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
      <div className="flex-grow">
        <strong>Error:</strong> {children}
      </div>
    </div>
  );
}
