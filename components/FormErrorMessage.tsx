import { ErrorIcon } from "./icons/ErrorIcon";

interface FormErrorMessageProps {
  children: React.ReactNode;
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  return (
    <div className="flex items-start space-x-2 rounded bg-red-100 p-3 text-sm text-red-700">
      <ErrorIcon className="h-5 w-5 flex-shrink-0 flex-grow-0" />
      <div className="flex-grow">
        <strong>Error:</strong> {children}
      </div>
    </div>
  );
}
