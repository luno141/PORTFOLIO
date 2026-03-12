import Link from "next/link";
import { ArrowUpRight, FileText, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import projects from "@/data/projects";
export const metadata = {
  title: "Projects | Vikrant Dey",
  description:
    "Selected projects by Vikrant Dey across AI systems, cybersecurity tooling, Web3 concepts, and graphics programming.",
};
export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 xl:px-16 py-24 min-h-screen">
      <div className="max-w-3xl mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I build product-heavy experiments across cybersecurity, healthcare AI,
          conversational systems, graphics, and emerging blockchain workflows.
        </p>
        <p className="text-sm text-muted-foreground">
          Each project below now includes a dedicated case study focused on the
          problem, architecture, design decisions, and next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="surface-panel relative overflow-hidden rounded-3xl border border-border bg-background/68 p-6 md:p-8 backdrop-blur-sm"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
                project.accentClass,
              )}
            />

            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-fit">
                      {project.category}
                    </Badge>
                    <h2 className="text-3xl font-semibold">{project.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit bg-background/70">
                    {project.status}
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  {project.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-tile relative space-y-5 rounded-2xl border border-border bg-background/58 p-5">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Tech Stack
                  </h3>
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
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Links
                  </h3>
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
