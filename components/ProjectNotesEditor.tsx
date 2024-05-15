"use client";

import { useCallback, useRef, useState } from "react";
import { useToasts } from "../components/Toasts";
import { useRouter } from "next/navigation";

interface ProjectNotesEditorProps {
  projectId: string;
  defaultValue: string;
  editable?: boolean;
}

export function ProjectNotesEditor({
  projectId,
  defaultValue,
  editable = false,
}: ProjectNotesEditorProps) {
  const savedValue = useRef(defaultValue);
  const [value, setValue] = useState(defaultValue);

  const toasts = useToasts();
  const router = useRouter();

  const submit = useCallback(() => {
    // Don't submit if the value hasn't changed
    console.log("Value", value, savedValue.current);
    if (value === savedValue.current) return;

    fetch(`/api/projects/${projectId}/description`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: value }),
    })
      .then((res) => {
        if (!res.ok) {
          toasts.addToast({
            children: "Failed to save project notes",
            style: "error",
            duration: 5000,
          });
          return;
        }

        savedValue.current = value;
        router.refresh(); // Refresh server-rendered page so that the old value is not cached if you leave this page and then return

        toasts.addToast({
          children: "Project notes saved",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
        toasts.addToast({
          children: "Failed to save project notes",
          style: "error",
          duration: 5000,
        });
      });
  }, [projectId, router, toasts, value]);

  return (
    <textarea
      className="w-full flex-grow resize-none rounded-lg bg-gray-200 p-4"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={submit}
      readOnly={!editable}
    />
  );
}
