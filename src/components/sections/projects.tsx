"use client";
import Link from "next/link";
import { ArrowUpRight, FileText, Github } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import projects from "@/data/projects";
import { cn } from "@/lib/utils";
const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto py-20">
      <SectionHeader
        id="projects"
        title="Projects"
        desc="Selected work across AI, full-stack systems, graphics, and Web3 concepts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="surface-panel relative overflow-hidden rounded-2xl border border-border bg-background/68 p-6 backdrop-blur-sm"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
                project.accentClass,
              )}
            />
            <div className="relative flex flex-col gap-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>
                <Badge variant="outline" className="w-fit bg-background/70">
                  {project.status}
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {project.summary}
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="surface-pill bg-background/70"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/projects/${project.id}`}>
                  <Button size="sm" variant="outline" className="gap-2">
                    Case Study
                    <FileText className="h-4 w-4" />
                  </Button>
                </Link>

                {project.live ? (
                  <Link href={project.live} target="_blank">
                    <Button size="sm" variant="outline" className="gap-2">
                      {project.liveLabel || "Live"}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="secondary" disabled>
                    {project.status}
                  </Button>
                )}

                {project.repo ? (
                  <Link href={project.repo} target="_blank">
                    <Button size="sm" variant="outline" className="gap-2">
                      {project.repoLabel || "Repository"}
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};
export default ProjectsSection;
