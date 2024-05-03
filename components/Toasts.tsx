"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

interface ToastsContextValue {
  toasts: ToastType[];
  addToast: (toast: ToastType) => void;
}

const ToastsContext = createContext<ToastsContextValue>({
  toasts: [],
  addToast: () => {},
});

interface ToastType {
  children: React.ReactNode;
  style?: "default" | "error";
  duration: number;
}

function Toast({ children, style = "default", duration }: ToastType) {
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowing(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition
      appear={true}
      show={showing}
      enter="transition-all duration-300"
      enterFrom="opacity-0 -mt-14 translate-y-[calc(100%+1rem)]"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={classNames(
          "duration mb-2 h-12 rounded-md px-4 py-3 text-white shadow-lg",
          {
            "bg-gray-900": style === "default",
            "bg-red-600": style === "error",
          },
        )}
      >
        <div className="flex items-center space-x-2">
          {style === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          )}
          <span>{children}</span>
        </div>
      </div>
    </Transition>
  );
}

interface ToastsProviderProps {
  children: React.ReactNode;
}

export function ToastsProvider({ children }: ToastsProviderProps) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((toast: ToastType) => {
    toast = { ...toast };
    setToasts((toasts) => [...toasts, toast]);

    setTimeout(() => {
      console.log("removing toast");
      setToasts((toasts) => toasts.filter((t) => t !== toast));
    }, toast.duration + 500); // Leave 500ms for any kind of exit animation before removing the toast
  }, []);

  return (
    <ToastsContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastsContext.Provider>
  );
}

export function Toasts() {
  const { toasts } = useContext(ToastsContext);

  console.log(toasts);

  return (
    <div className="fixed bottom-2 right-4 z-50">
      {toasts.map((toast, i) => (
        <Toast key={i} {...toast} />
      ))}
    </div>
  );
}

export function useToasts() {
  const { addToast } = useContext(ToastsContext);
  return { addToast };
}
