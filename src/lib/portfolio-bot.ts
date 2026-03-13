import { config } from "@/data/config";
import projects from "@/data/projects";

export type PortfolioBotAction = {
  label: string;
  href: string;
  external?: boolean;
};

type PortfolioBotReply = {
  content: string;
  actions?: PortfolioBotAction[];
  suggestions?: string[];
};

const DEFAULT_SUGGESTIONS = [
  "What does Vikrant build?",
  "Show me Vikrant's projects",
  "What are Vikrant's strongest skills?",
  "How do I contact Vikrant?",
];

const HELP_PROMPTS = [
  "What does Vikrant build?",
  "Who is Vikrant?",
  "Show me Vikrant's projects",
  "What are Vikrant's strongest skills?",
  "Is Vikrant available for work?",
  "Open Vikrant's resume",
  "How do I contact Vikrant?",
  "Tell me about North Star",
  "Tell me about MediMind",
  "Tell me about Bet0verse",
  "Tell me about NeuroAssist",
  "Tell me about the C++ Ray Tracer",
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

const toWords = (value: string) => normalize(value).split(" ").filter(Boolean);

const dedupe = (items: string[]) => Array.from(new Set(items));

const strongestSkills = dedupe(
  projects.flatMap((project) => project.tech),
).slice(0, 12);

const hasAny = (input: string, terms: string[]) =>
  terms.some((term) => input.includes(term));

const hasGreeting = (input: string) => {
  const greetings = new Set(["hello", "hi", "hey", "yo"]);
  return toWords(input).some((word) => greetings.has(word));
};

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

const topSkills = strongestSkills.slice(0, 8).join(", ");

const buildProjectReply = (projectId: string): PortfolioBotReply => {
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return {
      content:
        "I could not find that project. Ask me about North Star, MediMind, Bet0verse, NeuroAssist, or the C++ Ray Tracer.",
      suggestions: PROJECT_SUGGESTIONS,
    };
  }

  const techPreview = project.tech.slice(0, 3).join(", ");

  return {
    content: `${project.title} is Vikrant's ${project.category.toLowerCase()} project. Stack: ${techPreview}. Use the case study for the full breakdown.`,
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
      "Show me Vikrant's projects",
      "What are Vikrant's strongest skills?",
      "How do I contact Vikrant?",
    ],
  };
};

export const getPortfolioBotReply = (rawInput: string): PortfolioBotReply => {
  const input = normalize(rawInput);
  const matchedProject = findProject(input);

  if (matchedProject) {
    return buildProjectReply(matchedProject.id);
  }

  if (hasGreeting(input)) {
    return {
      content: "Hey.",
      suggestions: HELP_PROMPTS,
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
      content:
        "Vikrant is a product-focused developer building across web, AI, graphics, and Web3.",
      actions: [
        { label: "Open About", href: "/about" },
        { label: "See Projects", href: "/projects" },
      ],
      suggestions: [
        "What does Vikrant build?",
        "What are Vikrant's strongest skills?",
        "Is Vikrant available for work?",
      ],
    };
  }

  if (
    hasAny(input, [
      "what does luno build",
      "what does vikrant build",
      "what do you build",
      "what are you building",
      "what does luno do",
      "what does vikrant do",
      "what do you do",
      "what is luno building",
      "what is vikrant building",
      "currently building",
    ])
  ) {
    return {
      content:
        "Vikrant builds full-stack, AI, graphics, and Web3-oriented products.",
      actions: [
        { label: "See Projects", href: "/projects" },
        { label: "Open About", href: "/about" },
      ],
      suggestions: [
        "Tell me about North Star",
        "Tell me about MediMind",
        "Show me Vikrant's projects",
      ],
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
      content: `Core stack: ${topSkills}.`,
      actions: [
        { label: "Open About", href: "/about" },
        { label: "See Projects", href: "/projects" },
      ],
      suggestions: [
        "Show me Vikrant's projects",
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
      content:
        "Main projects: North Star, MediMind, Bet0verse, NeuroAssist, and the C++ Ray Tracer.",
      actions: [{ label: "Open Projects", href: "/projects" }],
      suggestions: [
        "Tell me about North Star",
        "Tell me about MediMind",
        "Tell me about Bet0verse",
      ],
    };
  }

  if (hasAny(input, ["resume", "cv", "download resume", "open resume"])) {
    return {
      content: "Open Vikrant's resume here.",
      actions: [{ label: "Open Resume", href: config.resume }],
      suggestions: [
        "How do I contact Vikrant?",
        "Is Vikrant available for work?",
        "Show me Vikrant's projects",
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
      content: "Best direct path is email. LinkedIn and GitHub are here too.",
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
        "Is Vikrant available for work?",
        "Open Vikrant's resume",
        "Show me Vikrant's projects",
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
      content:
        "Vikrant is open to internships, collaborations, and product-focused roles.",
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
        "Open Vikrant's resume",
        "Show me Vikrant's projects",
        "What are Vikrant's strongest skills?",
      ],
    };
  }

  if (hasAny(input, ["cat", "keyboard", "bongo"])) {
    return {
      content: "The cat is part of the setup.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (hasAny(input, ["help", "what can you do"])) {
    return {
      content: "Hey.",
      suggestions: HELP_PROMPTS,
    };
  }

  return {
    content: "Use the prompts below or open Projects/About.",
    actions: [
      { label: "Open Projects", href: "/projects" },
      { label: "Open About", href: "/about" },
    ],
    suggestions: DEFAULT_SUGGESTIONS,
  };
};

export const getPortfolioBotWelcome = (): PortfolioBotReply => ({
  content: "Hey.",
  suggestions: HELP_PROMPTS,
});
