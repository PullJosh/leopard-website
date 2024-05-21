import { useEffect, useState } from "react";
import classNames from "classnames";

interface FormFieldProps {
  type: "text" | "email" | "password";
  label: string;
  name?: string;
  required?: boolean;
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  helpText?: string;
  validate?: (value: string) => string[];
}

export function FormField({
  type,
  label,
  name,
  required,
  value,
  setValue,
  placeholder,
  helpText,
  validate,
}: FormFieldProps) {
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    if (validate && value !== "") {
      setErrors(validate(value));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isValid = errors === null || errors.length === 0;

  return (
    <div>
      <label className="flex flex-col items-start">
        <span
          className={classNames("mb-1 text-sm font-medium", {
            "text-gray-800": isValid,
            "text-red-800": !isValid,
          })}
        >
          {label}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (validate && errors !== null) {
              setErrors(validate(event.target.value));
            }
          }}
          onBlur={(event) => {
            if (validate) {
              setErrors(validate(event.target.value));
            }
          }}
          placeholder={placeholder}
          className={classNames("self-stretch rounded border px-4 py-2", {
            "border-gray-400": isValid,
            "border-red-700": !isValid,
          })}
          required={required}
        />
      </label>
      {isValid ? (
        <div className="mt-1 text-xs text-gray-600">{helpText}</div>
      ) : (
        <ul
          className={classNames("mt-1 text-xs text-red-800", {
            "list-inside list-disc pl-4": errors.length > 1,
          })}
        >
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
