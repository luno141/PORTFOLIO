import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import projects, { getProjectById } from "@/data/projects";
type ProjectPageProps = {
  params: {
    slug: string;
  };
};
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}
export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectById(params.slug);
  if (!project) {
    return {
      title: "Project Not Found | Vikrant Dey",
    };
  }
  return {
    title: `${project.title} | Case Study | Vikrant Dey`,
    description: project.summary,
  };
}
export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.slug);
  if (!project) {
    notFound();
  }
  return (
    <div className="container mx-auto min-h-screen px-4 py-24 md:px-8 xl:px-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="surface-panel relative overflow-hidden rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
              project.accentClass,
            )}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="outline" className="bg-background/60">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="bg-background/60">
                  {project.year}
                </Badge>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <InfoCard label="Role" value={project.role} />
                <InfoCard label="Challenge" value={project.category} />
                <InfoCard
                  label="Best fit"
                  value="AI products, system-heavy builds, and product engineering conversations"
                />
              </div>
            </div>

            <div className="surface-tile space-y-4 rounded-2xl border border-border bg-background/62 p-5">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Links
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/#contact">
                    <Button size="sm" className="gap-2">
                      Discuss this work
                      <Mail className="h-4 w-4" />
                    </Button>
                  </Link>

                  {project.live ? (
                    <Link href={project.live} target="_blank">
                      <Button size="sm" variant="outline" className="gap-2">
                        {project.liveLabel || "Live"}
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : null}

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

              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Stack
                </p>
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
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="The problem" />
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="Direction" />
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.approach}
            </p>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="What I built" />
            <List items={project.details} />
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="Architecture" />
            <List items={project.architecture} />
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="Current proof" />
            <List items={project.proof} />
          </section>

          <section className="rounded-3xl border border-border bg-background/70 p-6 backdrop-blur-sm md:p-8">
            <SectionTitle title="Next iterations" />
            <List items={project.roadmap} />
          </section>
        </div>

        <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm md:p-8">
          <SectionTitle title="Why it matters" />
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">
            {project.impact}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact">
              <Button className="gap-2">Start a conversation</Button>
            </Link>
            <Link href={`mailto:${config.email}`}>
              <Button variant="outline" className="gap-2">
                Email directly
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
);
const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="surface-tile rounded-2xl border border-border bg-background/58 p-4">
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{value}</p>
  </div>
);
const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/70" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
