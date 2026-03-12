"use client";
import { BriefcaseBusiness, FolderKanban, Radar } from "lucide-react";
import { config } from "@/data/config";
import projects from "@/data/projects";
import { EXPERIENCE } from "@/data/constants";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
const stats = [
  {
    label: "Active project tracks",
    value: projects.length.toString(),
    icon: FolderKanban,
  },
  {
    label: "Experience tracks",
    value: EXPERIENCE.length.toString(),
    icon: BriefcaseBusiness,
  },
  {
    label: "Focus domains",
    value: config.about.focusAreas.length.toString(),
    icon: Radar,
  },
];
const StatusSection = () => {
  return (
    <SectionWrapper id="status" className="max-w-7xl mx-auto py-20">
      <SectionHeader
        id="status"
        title="Current Status"
        desc="Where I am strongest right now, what I am building, and the kind of work I am looking for."
      />

      <div className="grid gap-6 px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="surface-tile rounded-2xl border border-border bg-background/65 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="surface-panel rounded-3xl border border-border bg-background/75 p-6 backdrop-blur-sm md:p-8">
            <h3 className="text-2xl font-semibold tracking-tight">Open to</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {config.availability.summary}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {config.availability.roles.map((role) => (
                <li key={role} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-3xl border border-border bg-background/75 p-6 backdrop-blur-sm md:p-8">
            <h3 className="text-2xl font-semibold tracking-tight">
              Currently building
            </h3>
            <div className="mt-6 grid gap-4">
              {config.currentlyBuilding.map((item) => (
                <div
                  key={item.title}
                  className="surface-tile rounded-2xl border border-border bg-background/55 p-4"
                >
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default StatusSection;
