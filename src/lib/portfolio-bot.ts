import { config } from "@/data/config";
import { projects } from "@/data/projects";

export type PortfolioBotAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type PortfolioBotReply = {
  content: string;
  actions?: PortfolioBotAction[];
  suggestions?: string[];
};

const DEFAULT_SUGGESTIONS = [
  "What do you build?",
  "Show me your projects",
  "What are your strongest skills?",
  "How can I contact you?",
];

const PROJECT_SUGGESTIONS = projects
  .slice(0, 4)
  .map((project) => `Tell me about ${project.title}`);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const dedupe = (items: string[]) => Array.from(new Set(items));

const strongestSkills = dedupe(
  projects.flatMap((project) => project.tech),
).slice(0, 12);

const hasAny = (input: string, terms: string[]) =>
  terms.some((term) => input.includes(term));

const findProject = (input: string) =>
  projects.find((project) => {
    const slugTokens = project.id.split("-");
    const title = normalize(project.title);
    const category = normalize(project.category);
    const techTerms = project.tech.map((item) => normalize(item));
    const aliases = [
      title,
      normalize(project.id.replace(/-/g, " ")),
      category,
      ...slugTokens,
      ...techTerms,
    ];

    if (project.id === "cpp-ray-tracer") {
      aliases.push("ray tracer", "cpp", "graphics");
    }

    return aliases.some((alias) => alias.length > 2 && input.includes(alias));
  });

const buildProjectReply = (projectId: string): PortfolioBotReply => {
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return {
      content:
        "I could not find that project. Ask me about North Star, MediMind, Bet0verse, NeuroAssist, or the C++ Ray Tracer.",
      suggestions: PROJECT_SUGGESTIONS,
    };
  }

  const techPreview = project.tech.slice(0, 4).join(", ");

  return {
    content: `${project.title} is a ${project.category.toLowerCase()} project where Vikrant worked as ${project.role.toLowerCase()}. ${project.summary} Current status: ${project.status}. Core stack: ${techPreview}.`,
    actions: [
      { label: "Open Case Study", href: `/projects/${project.id}` },
      ...(project.repo
        ? [
            {
              label: project.repoLabel || "GitHub",
              href: project.repo,
              external: true,
            },
          ]
        : []),
      ...(project.live
        ? [
            {
              label: project.liveLabel || "Live Link",
              href: project.live,
              external: true,
            },
          ]
        : []),
    ],
    suggestions: [
      "Show me your projects",
      "What are your strongest skills?",
      "How can I contact you?",
    ],
  };
};

export const getPortfolioBotReply = (rawInput: string): PortfolioBotReply => {
  const input = normalize(rawInput);
  const matchedProject = findProject(input);

  if (matchedProject) {
    return buildProjectReply(matchedProject.id);
  }

  if (hasAny(input, ["hello", "hi", "hey", "yo"])) {
    return {
      content:
        "Hi. I am VikrantOS, a small local assistant wired into this portfolio. Ask me about projects, skills, availability, resume, or contact details.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (
    hasAny(input, [
      "who are you",
      "about you",
      "about vikrant",
      "introduce yourself",
    ])
  ) {
    return {
      content: `${config.author} is a BCA student and product-focused developer. ${config.about.shortBio} ${config.about.paragraphs.join(" ")}`,
      actions: [{ label: "Open About", href: "/about" }],
      suggestions: [
        "What do you build?",
        "What are your strongest skills?",
        "Are you available for work?",
      ],
    };
  }

  if (
    hasAny(input, [
      "what do you build",
      "what are you building",
      "what do you do",
      "currently building",
    ])
  ) {
    return {
      content: `Vikrant builds across full-stack web, AI systems, graphics, and Web3-oriented product ideas. Right now the main focus is ${config.currentlyBuilding
        .map((item) => `${item.title}: ${item.summary}`)
        .join(" ")}`,
      actions: [{ label: "See Projects", href: "/projects" }],
      suggestions: PROJECT_SUGGESTIONS,
    };
  }

  if (
    hasAny(input, [
      "skills",
      "stack",
      "tech stack",
      "strongest skills",
      "what are you good at",
    ])
  ) {
    return {
      content: `Strongest working areas: ${config.statusHighlights.join(
        "; ",
      )}. Stack highlights: ${strongestSkills.join(", ")}.`,
      actions: [{ label: "Open About", href: "/about" }],
      suggestions: [
        "Show me your projects",
        "Tell me about North Star",
        "Tell me about the C++ Ray Tracer",
      ],
    };
  }

  if (
    hasAny(input, [
      "projects",
      "project",
      "portfolio",
      "case study",
      "case studies",
    ])
  ) {
    return {
      content: `Main projects right now: ${projects
        .map((project) => `${project.title} (${project.category})`)
        .join(", ")}.`,
      actions: [{ label: "Open Projects", href: "/projects" }],
      suggestions: PROJECT_SUGGESTIONS,
    };
  }

  if (hasAny(input, ["resume", "cv", "download resume", "open resume"])) {
    return {
      content: "You can open Vikrant's resume directly from the portfolio.",
      actions: [{ label: "Open Resume", href: config.resume }],
      suggestions: [
        "How can I contact you?",
        "Are you available for work?",
        "Show me your projects",
      ],
    };
  }

  if (
    hasAny(input, [
      "contact",
      "email",
      "linkedin",
      "github",
      "instagram",
      "reach you",
    ])
  ) {
    return {
      content:
        "Best direct path is email. LinkedIn and GitHub are also linked here if you want to continue the conversation there.",
      actions: [
        { label: "Email", href: `mailto:${config.email}`, external: true },
        {
          label: "LinkedIn",
          href: config.social.linkedin,
          external: true,
        },
        { label: "GitHub", href: config.social.github, external: true },
      ],
      suggestions: [
        "Are you available for work?",
        "Open resume",
        "Show me your projects",
      ],
    };
  }

  if (
    hasAny(input, [
      "available",
      "hire",
      "internship",
      "role",
      "collaboration",
      "work with",
    ])
  ) {
    return {
      content: `${config.availability.headline} ${config.availability.summary} ${config.availability.responseTime}`,
      actions: [
        {
          label: "Email Vikrant",
          href: `mailto:${config.email}`,
          external: true,
        },
        {
          label: "LinkedIn",
          href: config.social.linkedin,
          external: true,
        },
      ],
      suggestions: [
        "Open resume",
        "Show me your projects",
        "What are your strongest skills?",
      ],
    };
  }

  if (hasAny(input, ["cat", "keyboard", "bongo"])) {
    return {
      content:
        "The cat behind the keyboard is permanent staff. It handles morale, percussion, and questionable deployment decisions.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (hasAny(input, ["help", "what can you do"])) {
    return {
      content:
        "I can answer questions about Vikrant's projects, stack, resume, availability, and contact details. I can also point you to the exact case study page you want.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  return {
    content:
      "I do not have a smart answer for that yet. Ask me about projects, skills, resume, availability, or how to contact Vikrant.",
    suggestions: DEFAULT_SUGGESTIONS,
  };
};

export const getPortfolioBotWelcome = (): PortfolioBotReply => ({
  content:
    "Hi. I am VikrantOS, a local portfolio assistant. Ask me about projects, skills, resume, availability, or contact details.",
  actions: [
    { label: "Open Projects", href: "/projects" },
    { label: "Open Resume", href: config.resume },
  ],
  suggestions: DEFAULT_SUGGESTIONS,
});
