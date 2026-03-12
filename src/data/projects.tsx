export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  impact: string;
  details: string[];
  architecture: string[];
  proof: string[];
  roadmap: string[];
  tech: string[];
  status: string;
  repo?: string;
  repoLabel?: string;
  live?: string;
  liveLabel?: string;
  accentClass: string;
};
export const projects: Project[] = [
  {
    id: "north-star",
    title: "North Star",
    category: "Threat Intelligence",
    year: "2025 - Present",
    role: "Product Designer, Full-Stack Builder, AI Workflow Design",
    summary:
      "An AI-powered threat intelligence platform that monitors open-source data, detects cyber threats, extracts actionable intelligence, and generates structured alerts with prioritization.",
    challenge:
      "Security data is noisy, fragmented, and difficult to operationalize quickly. I wanted to design a system that turns raw open-source signals into structured, readable intelligence instead of another dashboard full of unfiltered feeds.",
    approach:
      "North Star is designed as an end-to-end workflow: ingest open-source sources, normalize the data, run NLP and ML-assisted extraction, score relevance, and surface readable alerts through a product-oriented frontend.",
    impact:
      "The project direction focuses on analyst efficiency. Instead of asking users to manually process noisy streams, the product is aimed at prioritizing likely threats and presenting enough context to support quick decisions.",
    details: [
      "Designed the product around open-source intelligence workflows, structured alerting, and actionable prioritization.",
      "Mapped the ingestion-to-alert pipeline so the product logic stays legible instead of feeling like a black-box AI demo.",
      "Shaped the interface around clarity, triage speed, and technically credible output.",
    ],
    architecture: [
      "Python data processing and NLP/ML pipeline for ingestion, extraction, and classification.",
      "Backend workflow layer for storing signals, scored alerts, and supporting metadata.",
      "React-based frontend designed to surface structured alerts, summaries, and priority context.",
    ],
    proof: [
      "Defined a concrete ingestion, extraction, scoring, and alerting workflow rather than a vague AI concept.",
      "Structured the product around real operator needs: readability, prioritization, and traceable signal handling.",
      "Built it as a security product concept with depth in workflow design, not just model experimentation.",
    ],
    roadmap: [
      "Expand the source ingestion layer and alert confidence logic.",
      "Add entity relationship views, IOC exports, and investigation flows.",
      "Refine analyst-facing UX for triage, history, and collaboration.",
    ],
    tech: [
      "Python",
      "NLP",
      "ML pipelines",
      "Node.js",
      "React",
      "Databases",
      "Threat intelligence workflows",
    ],
    status: "Complete",
    repo: "https://github.com/luno141/NORTH-STAR",
    repoLabel: "GitHub Repo",
    accentClass: "from-emerald-500/25 via-cyan-500/10 to-transparent",
  },
  {
    id: "medimind",
    title: "MediMind",
    category: "Healthcare AI",
    year: "2025 - Present",
    role: "Product Architect, Full-Stack Developer, AI Integration",
    summary:
      "An AI clinical intake and decision-support platform that transforms patient conversations into structured medical intelligence for preliminary assessment and workflow support.",
    challenge:
      "Clinical conversations are messy, unstructured, and time-constrained. I wanted to explore how AI could help convert that raw interaction into usable intake context without reducing the experience to a shallow chatbot.",
    approach:
      "MediMind is designed around structured intake logic: capture patient input, transform it into organized medical context, and support preliminary workflow decisions through a guided full-stack product flow.",
    impact:
      "The product concept is aimed at reducing friction in early-stage intake and making conversational data more useful for downstream healthcare workflows.",
    details: [
      "Focused on converting real-world patient dialogue into structured clinical context.",
      "Designed the product around workflow support, clarity, and trust rather than one-off AI output.",
      "Explored healthcare UX patterns that balance intelligence, speed, and legibility.",
    ],
    architecture: [
      "Next.js frontend for intake flows, results display, and product navigation.",
      "Node.js and TypeScript backend logic for request handling and workflow orchestration.",
      "AI-assisted summarization and structuring layer for preliminary decision-support context.",
    ],
    proof: [
      "Turned the idea into a clear product workflow instead of a generic healthcare chatbot concept.",
      "Framed the system around structured output that can plug into real operational flows.",
      "Used the project to explore product trust, user experience, and AI utility in a sensitive domain.",
    ],
    roadmap: [
      "Improve data structuring quality and prompt reliability.",
      "Expand guided intake logic across more clinical scenarios.",
      "Add stronger review, editing, and escalation flows for medical workflow support.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "AI/LLM integration",
      "Healthcare workflow logic",
    ],
    status: "Complete",
    repo: "https://github.com/luno141/MEDIMIND",
    repoLabel: "GitHub Repo",
    accentClass: "from-sky-500/25 via-blue-500/10 to-transparent",
  },
  {
    id: "bet0verse",
    title: "Bet0verse",
    category: "Telegram x Web3",
    year: "2025 - Present",
    role: "Product Builder, Backend Developer, Bot Workflow Design",
    summary:
      "A Telegram-based betting bot with user registration, bet creation, bet placement, database-backed logic, and planned on-chain integration through Monad testnet.",
    challenge:
      "Telegram bots often feel thin because the product logic behind them is weak. I wanted to build a bot-first system with real state, user flows, and backend depth, then extend that into wallet-linked blockchain behavior.",
    approach:
      "Bet0verse treats Telegram as the interface layer, not the whole product. The system handles registration, user state, bet creation, bet placement, and persistence through a backend-driven architecture designed to grow into on-chain integrations.",
    impact:
      "The project demonstrates product thinking inside a constrained interface. It is less about gambling mechanics and more about building reliable stateful experiences through bots, databases, and future smart-contract workflows.",
    details: [
      "Built registration, bet lifecycle management, and data-backed user interactions inside Telegram.",
      "Designed the backend around stateful product behavior rather than disposable command handlers.",
      "Used the project to explore wallet linking and future Monad testnet integrations.",
    ],
    architecture: [
      "Node.js and TypeScript backend for business logic and bot orchestration.",
      "Telegram Bot API interface layer for chat-native product interactions.",
      "Prisma and PostgreSQL for persistence, bet state, and user records.",
    ],
    proof: [
      "Implemented actual user and bet lifecycle logic instead of a static proof-of-concept bot.",
      "Mapped a believable path from off-chain backend workflows into future wallet flows.",
      "Used the project to test how conversational interfaces can support complex multi-step actions.",
    ],
    roadmap: [
      "Add wallet linking and testnet-facing settlement flows.",
      "Improve user state management and moderation logic.",
      "Explore cleaner game creation and payout UX inside Telegram.",
    ],
    tech: [
      "Node.js",
      "Telegram Bot API",
      "Prisma",
      "PostgreSQL",
      "TypeScript",
      "Monad testnet",
    ],
    status: "Complete",
    repo: "https://github.com/luno141/Bet0verse",
    repoLabel: "GitHub Repo",
    accentClass: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
  },
  {
    id: "neuroassist",
    title: "NeuroAssist",
    category: "AI Assistant",
    year: "2024 - Present",
    role: "Concept Builder, Full-Stack Developer, Conversational UX Exploration",
    summary:
      "An AI-powered mental health assistant concept focused on conversational support through a full-stack architecture.",
    challenge:
      "Conversational support tools are easy to prototype superficially but much harder to shape into products that feel supportive, structured, and technically grounded. I wanted to explore that gap.",
    approach:
      "NeuroAssist is framed as a full-stack conversational system with stored context, guided interactions, and product-level thinking around empathy, session flow, and usefulness.",
    impact:
      "The project helped me explore how conversational AI should be designed when trust, tone, and continuity matter more than flashy output.",
    details: [
      "Designed the concept around conversational support backed by a real application architecture.",
      "Paired AI dialogue flows with backend storage for session context and product continuity.",
      "Approached the product through empathy, usability, and system design rather than novelty alone.",
    ],
    architecture: [
      "React frontend for interaction flows and user-facing interface.",
      "Flask backend for request handling and AI integration points.",
      "MongoDB layer for session context, user history, and flexible document storage.",
    ],
    proof: [
      "Used the project to explore conversational system design beyond prompt-response demos.",
      "Treated continuity and context as product requirements, not optional extras.",
      "Built a concept that reflects both AI curiosity and full-stack implementation thinking.",
    ],
    roadmap: [
      "Improve guardrails and context retention strategies.",
      "Expand guided support flows and journaling-style features.",
      "Explore better feedback loops and human-escalation patterns.",
    ],
    tech: ["Python", "Flask", "React", "MongoDB", "AI/LLM integration"],
    status: "Concept / In Progress",
    accentClass: "from-amber-500/25 via-orange-500/10 to-transparent",
  },
  {
    id: "cpp-ray-tracer",
    title: "C++ Ray Tracer",
    category: "Graphics / Rendering",
    year: "2024 - Present",
    role: "Systems Programmer, Graphics Learner",
    summary:
      "A minimal offline ray tracing renderer built in C++ that renders basic geometric objects and outputs generated images in PPM format.",
    challenge:
      "I wanted a project that pushed me below the web stack and forced me to reason about rendering fundamentals, math, and low-level implementation details directly.",
    approach:
      "The ray tracer is a small but deliberate graphics project focused on building the rendering loop from scratch: rays, intersections, image output, and a minimal offline pipeline.",
    impact:
      "This project is important because it shows systems-oriented curiosity and implementation depth outside standard frontend and full-stack product work.",
    details: [
      "Built the renderer to deepen my understanding of graphics fundamentals and low-level programming.",
      "Implemented ray-object intersection and image generation in a minimal offline pipeline.",
      "Used the project as deliberate practice in math-heavy, systems-oriented code.",
    ],
    architecture: [
      "Core C++ rendering loop for ray casting and scene evaluation.",
      "Geometric intersection logic for basic shapes and object testing.",
      "PPM image output pipeline for generated frame data.",
    ],
    proof: [
      "Created a functioning offline renderer rather than stopping at graphics theory.",
      "Used the project to work directly with rendering logic, not libraries that abstract it away.",
      "Expanded the portfolio beyond web applications into lower-level technical work.",
    ],
    roadmap: [
      "Add materials, lighting improvements, and richer scene composition.",
      "Extend object support and camera behavior.",
      "Experiment with reflections, shading, and higher-quality output.",
    ],
    tech: [
      "C++",
      "Rendering",
      "Ray-object intersection",
      "Graphics fundamentals",
    ],
    status: "Complete",
    repo: "https://github.com/luno141/raytracer",
    repoLabel: "GitHub Repo",
    accentClass: "from-zinc-400/20 via-slate-500/10 to-transparent",
  },
];
export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);
export default projects;
