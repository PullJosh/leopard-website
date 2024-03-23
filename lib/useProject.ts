import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProjectResponseJSON } from "../pages/api/projects/[id]/get";

export type UseProjectType =
  | {
      state: "ready";
      project: ProjectResponseJSON;
      setProject: Dispatch<SetStateAction<ProjectResponseJSON | null>>;
    }
  | { state: "loading" }
  | { state: "error" };

export function useProject(id: string): UseProjectType {
  const [project, setProject] = useState<ProjectResponseJSON | null>(null);
  const [projectState, setProjectState] = useState<
    "loading" | "error" | "ready"
  >("loading");

  useEffect(() => {
    if (id) {
      setProjectState("loading");
      fetch(`/api/projects/${id}/get`)
        .then((res) => res.json() as Promise<ProjectResponseJSON>)
        .then((data) => {
          setProject(data);
          setProjectState("ready");
        })
        .catch((error) => setProjectState("error"));
    }
  }, [id]);

  if (projectState === "loading") {
    return { state: "loading" };
  }

  if (projectState === "error") {
    return { state: "error" };
  }

  return { state: "ready", project: project!, setProject };
}
