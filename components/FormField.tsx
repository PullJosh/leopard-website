import { useEffect, useState } from "react";
import classNames from "classnames";

interface FormFieldProps {
  type: "text" | "email" | "password" | "month";
  label: string;
  name?: string;
  required?: boolean;
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  helpText?: string;
  validate?: (value: string) => string[];
  disabled?: boolean;
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
  disabled,
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
        {type === "month" ? (
          <div className="flex space-x-2 self-stretch">
            <select
              name={name}
              value={parseMonthStr(value).month}
              onChange={(event) => {
                const newValue = modifyMonthStr(value, {
                  month: event.target.value,
                });
                setValue(newValue);
                if (validate && errors !== null) {
                  setErrors(validate(newValue));
                }
              }}
              onBlur={(event) => {
                const newValue = modifyMonthStr(value, {
                  month: event.target.value,
                });
                if (validate) {
                  setErrors(validate(newValue));
                }
              }}
              className={classNames(
                "flex-grow self-stretch rounded border px-4 py-2",
                {
                  "border-gray-400": isValid,
                  "border-red-700": !isValid,
                },
              )}
              required={required}
              disabled={disabled}
            >
              <option value="" disabled={true} hidden={true}>
                Month
              </option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select
              name={name}
              value={parseMonthStr(value).year}
              onChange={(event) => {
                const newValue = modifyMonthStr(value, {
                  year: event.target.value,
                });
                setValue(newValue);
                if (validate && errors !== null) {
                  setErrors(validate(newValue));
                }
              }}
              onBlur={(event) => {
                const newValue = modifyMonthStr(value, {
                  year: event.target.value,
                });
                if (validate) {
                  setErrors(validate(newValue));
                }
              }}
              className={classNames(
                "flex-grow self-stretch rounded border px-4 py-2",
                {
                  "border-gray-400": isValid,
                  "border-red-700": !isValid,
                },
              )}
              required={required}
              disabled={disabled}
            >
              <option value="" disabled={true} hidden={true}>
                Year
              </option>
              {new Array(new Date().getFullYear() - 1900 + 1)
                .fill(null)
                .map((_, i, arr) => {
                  const year = String(1900 + arr.length - i - 1).padStart(
                    4,
                    "0",
                  );
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
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
              let value = event.target.value;
              if (validate) {
                setErrors(validate(value));
              }
            }}
            placeholder={placeholder}
            className={classNames("self-stretch rounded border px-4 py-2", {
              "border-gray-400": isValid,
              "border-red-700": !isValid,
            })}
            required={required}
            disabled={disabled}
          />
        )}
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

interface ParsedMonth {
  month: string;
  year: string;
}

function parseMonthStr(yyyymm: string): ParsedMonth {
  if (/^\d{4}-\d{2}$/.test(yyyymm)) {
    return {
      year: yyyymm.slice(0, 4),
      month: yyyymm.slice(5),
    };
  }

  if (/^\d{4}$/.test(yyyymm)) {
    return {
      year: yyyymm,
      month: "",
    };
  }

  if (/^\d{2}$/.test(yyyymm)) {
    return {
      year: "",
      month: yyyymm,
    };
  }

  return {
    year: "",
    month: "",
  };
}

function serializeMonthStr(parsed: ParsedMonth): string {
  const yearValid = /^\d{4}$/.test(parsed.year);
  const monthValid = /^\d{2}$/.test(parsed.month);

  if (yearValid && monthValid) {
    return `${parsed.year}-${parsed.month}`;
  }

  if (yearValid) {
    return parsed.year;
  }

  if (monthValid) {
    return parsed.month;
  }

  return "";
}

function modifyMonthStr(str: string, patch: Partial<ParsedMonth>): string {
  const parsed = parseMonthStr(str);
  return serializeMonthStr({ ...parsed, ...patch });
}
