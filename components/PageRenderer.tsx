"use client";

import type { ReactNode } from "react";
import AboutPage from "@/components/pages/AboutPage";
import ContactPage from "@/components/pages/ContactPage";
import { FlyleafPage, ThanksPage } from "@/components/pages/DecorativePages";
import { ProjectsLeftPage, ProjectsRightPage } from "@/components/pages/ProjectsPage";
import SkillsPage from "@/components/pages/SkillsPage";
import StudiesPage from "@/components/pages/StudiesPage";

export type PageId =
  | "flyleaf"
  | "about"
  | "studies"
  | "skills"
  | "projects-left"
  | "projects-right"
  | "contact"
  | "thanks"
  | "endpaper";

export type PageRenderProps = {
  active: boolean;
  runId: number;
};

export default function PageRenderer({
  id,
  active,
  runId,
}: PageRenderProps & { id: PageId }): ReactNode {
  const props = { active, runId };

  switch (id) {
    case "flyleaf":
      return <FlyleafPage {...props} />;
    case "about":
      return <AboutPage {...props} />;
    case "studies":
      return <StudiesPage {...props} />;
    case "skills":
      return <SkillsPage {...props} />;
    case "projects-left":
      return <ProjectsLeftPage {...props} />;
    case "projects-right":
      return <ProjectsRightPage {...props} />;
    case "contact":
      return <ContactPage {...props} />;
    case "thanks":
      return <ThanksPage {...props} />;
    case "endpaper":
      return null;
    default:
      return null;
  }
}
