"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transition } from "@headlessui/react";

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
  duration: number;
}

function Toast({ children, duration }: ToastType) {
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
      <div className="duration mb-2 h-12 rounded-md bg-gray-900 px-4 py-3 text-white shadow-lg">
        {children}
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
