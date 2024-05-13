"use client";

import { useCallback, useRef, useState } from "react";
import { useToasts } from "../components/Toasts";
import { useRouter } from "next/navigation";
import classNames from "classnames";

interface ProjectTitleEditorProps {
  projectId: string;
  defaultTitle: string;
  editable?: boolean;
  size?: "small" | "large";
}

export function ProjectTitleEditor({
  projectId,
  defaultTitle,
  editable = false,
  size = "large",
}: ProjectTitleEditorProps) {
  const savedTitle = useRef(defaultTitle);
  const [title, setTitle] = useState(defaultTitle);

  const toasts = useToasts();
  const router = useRouter();

  const submit = useCallback(() => {
    // Don't submit if the value hasn't changed
    if (title === savedTitle.current) return;

    fetch(`/api/projects/${projectId}/title`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => {
        if (!res.ok) {
          toasts.addToast({
            children: "Failed to save project title",
            style: "error",
            duration: 5000,
          });
          return;
        }

        savedTitle.current = title;
        router.refresh(); // Refresh server-rendered page so that the old value is not cached if you leave this page and then return

        toasts.addToast({
          children: "Project title saved",
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
  }, [projectId, router, toasts, title]);

  if (!editable) {
    return <div>{title}</div>;
  }

  return (
    <input
      type="text"
      className={classNames("flex-grow bg-gray-200 font-[inherit]", {
        "rounded-md px-4 py-1": size === "large",
        "rounded px-2 py-px": size === "small",
      })}
      style={{ fontSize: "inherit" }}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={submit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          submit();
        }
      }}
      readOnly={!editable}
    />
  );
}
