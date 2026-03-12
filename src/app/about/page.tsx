import Link from "next/link";
import Image from "next/image";
import { FileText, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { config } from "@/data/config";
import projects from "@/data/projects";
const contactLinks = [
  {
    label: "Email",
    value: config.email,
    href: `mailto:${config.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "/vikrant666",
    href: config.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "/luno141",
    href: config.social.github,
    icon: Github,
  },
  {
    label: "Instagram",
    value: "/luno_666",
    href: config.social.instagram,
    icon: Instagram,
  },
].filter((item) => Boolean(item.href));
const coreStack = [
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "AI/LLM integration",
  "NLP",
  "ML workflows",
  "Telegram bot development",
  "REST APIs",
  "Solidity",
  "Linux/Debian",
  "Git",
  "GitHub",
  "Colab",
];
export const metadata = {
  title: "About | Vikrant Dey",
  description:
    "About Vikrant Dey, a BCA student and developer building across full-stack web, AI systems, graphics, and emerging Web3 products.",
};
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 xl:px-16 py-24 min-h-screen">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <div className="surface-panel rounded-3xl border border-border bg-background/78 p-6 backdrop-blur-sm">
            <div className="surface-tile overflow-hidden rounded-2xl border border-border bg-muted/30">
              <Image
                className="block h-auto w-full object-cover"
                alt={config.author}
                src="/assets/me.jpg"
                width={1600}
                height={1067}
                priority
                sizes="(min-width: 1024px) 360px, 100vw"
              />
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <h1 className="text-3xl font-semibold">{config.author}</h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {config.headline}
                </p>
              </div>

              <Badge variant="secondary">BCA Student</Badge>

              <div className="flex flex-col gap-3 pt-3">
                {contactLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      className="surface-tile flex items-center gap-3 rounded-2xl border border-border bg-background/55 px-4 py-3 transition-colors hover:bg-muted/40"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.value}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link href={config.resume} target="_blank" className="block pt-2">
                <Button className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 md:p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold tracking-tight">About me</h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{config.about.shortBio}</p>
              {config.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 md:p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Focus areas
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {config.about.focusAreas.map((item) => (
                <div
                  key={item}
                  className="surface-tile rounded-2xl border border-border bg-background/55 p-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 md:p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Core stack
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {coreStack.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="bg-background/60"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 md:p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Current status
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {config.statusHighlights.map((item) => (
                <div
                  key={item}
                  className="surface-tile rounded-2xl border border-border bg-background/55 p-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="surface-tile mt-6 rounded-2xl border border-border bg-background/55 p-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Open to
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {config.availability.roles.map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className="bg-background/60"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/78 p-6 md:p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Selected work
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="surface-tile rounded-2xl border border-border bg-background/55 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-medium">{project.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.category}
                      </p>
                    </div>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Read case study
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
