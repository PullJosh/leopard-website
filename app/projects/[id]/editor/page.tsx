import { getProject } from "../../../../pages/api/projects/[id]/get";
import { ProjectEditor } from "../../../../components/ProjectEditor";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { JSTranslationsReferencePanel } from "../../../../components/JSTranslationsReferencePanel";
import { palettes } from "../../../../lib/translationPalettes";
import { JSTranslationsReferenceTable } from "../../../../components/JSTranslationsTable";
import { mentors } from "../../../../lib/mentors";

interface ProjectEditorPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectEditorPage({
  params: { id },
}: ProjectEditorPageProps) {
  let project;
  try {
    project = await getProject(id, true);
  } catch (err) {
    return notFound();
  }

  return (
    <ProjectEditor
      projectId={id}
      defaultProject={project}
      translationsReferencePanel={
        <JSTranslationsReferencePanel
          palettes={palettes.map((palette) => ({
            name: palette.name,
            color: palette.color,
            children: (
              <JSTranslationsReferenceTable
                translations={palette.translations}
              />
            ),
          }))}
        />
      }
      // Show mentor popup if project is new (created less than a minute ago)
      showMentorsPopup={
        Date.now() - new Date(project.createdAt).getTime() < 1000 * 60
      }
      mentor={mentors[Math.floor(Math.random() * mentors.length)]}
    />
  );
}

export async function generateMetadata(
  { params: { id } }: ProjectEditorPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const project = await getProject(id, false);

  return {
    title: project.title,
    // TODO: description: project.description,
  };
}
