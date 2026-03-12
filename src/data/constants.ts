export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VIM = "vim",
  VERCEL = "vercel",
  PYTHON = "python",
  PRISMA = "prisma",
  CPP = "cpp",
  SOLIDITY = "solidity",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription:
      "Core language for interactive interfaces and product logic.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "Type-safe application code for faster iteration and fewer surprises.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription:
      "Semantic structure for accessible and maintainable interfaces.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription:
      "Layout, motion, and visual polish that make products feel finished.",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription:
      "Component-driven frontend architecture for ambitious interfaces.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "Vue",
    shortDescription:
      "Lightweight UI development when speed and simplicity matter.",
    color: "#41b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "Production-ready React framework for full-stack web products.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Fast, scalable styling for consistent design systems.",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "Backend services, automation, and product infrastructure in JavaScript.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Express",
    shortDescription:
      "Straightforward APIs and server-side workflows for product backends.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Relational data modeling for reliable application state and analytics.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription:
      "Flexible document storage for fast-moving product ideas.",
    color: "#4db33d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription:
      "Version control discipline for building and shipping safely.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription:
      "Collaboration, source management, and project visibility in one place.",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "Prettier",
    shortDescription:
      "Consistent formatting that keeps large codebases readable.",
    color: "#f7b93a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription:
      "Package management for rapid prototyping and stable builds.",
    color: "#cb3837",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "Managed backend tools for experiments and fast launches.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "WordPress",
    shortDescription: "CMS work when content workflows need to move quickly.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription:
      "Daily driver environment for development, tooling, and deployment.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription:
      "Reproducible environments for services, testing, and shipping.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "Nginx",
    shortDescription:
      "Traffic handling and deployment support for production systems.",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "AWS",
    shortDescription:
      "Cloud building blocks for infrastructure and deployment experiments.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  },
  [SkillNames.GCP]: {
    id: 23,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "Cloud services for managed workloads and scalable prototypes.",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  [SkillNames.VIM]: {
    id: 24,
    name: "vim",
    label: "Vim",
    shortDescription: "Keyboard-first editing for speed and low-level control.",
    color: "#019733",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  [SkillNames.VERCEL]: {
    id: 25,
    name: "vercel",
    label: "Vercel",
    shortDescription:
      "Fast deployment for modern frontend and full-stack applications.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 26,
    name: "python",
    label: "Python",
    shortDescription:
      "Used for AI workflows, automation, and applied systems work.",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.PRISMA]: {
    id: 27,
    name: "prisma",
    label: "Prisma",
    shortDescription:
      "Type-safe database access for faster backend development.",
    color: "#2d3748",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  [SkillNames.CPP]: {
    id: 28,
    name: "cpp",
    label: "C++",
    shortDescription:
      "Low-level systems and graphics experiments focused on performance.",
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.SOLIDITY]: {
    id: 29,
    name: "solidity",
    label: "Solidity",
    shortDescription:
      "Smart contract exploration for blockchain product concepts.",
    color: "#363636",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  },
};
export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2024",
    endDate: "Present",
    title: "Student Developer",
    company: "Galgotias University / Independent Projects",
    description: [
      "Building full-stack, AI, and systems-driven projects across healthcare, cybersecurity, graphics, and Web3.",
      "Developed product concepts such as North Star, MediMind, Bet0verse, and NeuroAssist with a strong focus on usability and technical depth.",
      "Worked with React, Next.js, Node.js, TypeScript, Python, PostgreSQL, MongoDB, Prisma, and C++ across product experiments.",
      "Explored rendering and graphics fundamentals through a custom C++ ray tracer and other low-level programming projects.",
    ],
    skills: [
      SkillNames.NEXTJS,
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.PYTHON,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.PRISMA,
      SkillNames.CPP,
    ],
  },
  {
    id: 2,
    startDate: "2025",
    endDate: "Present",
    title: "Hackathon Product Builder",
    company: "Independent",
    description: [
      "Designed startup-style software products with an emphasis on real-world relevance, clean execution, and strong presentation.",
      "Built AI-assisted concepts for threat analysis, medical intake, and intelligent conversational systems.",
      "Created backend-driven systems integrating APIs, databases, automation flows, and bot-based interfaces.",
      "Explored blockchain workflows including wallet linking, smart contract integration, and Monad testnet-based product ideas.",
    ],
    skills: [
      SkillNames.NEXTJS,
      SkillNames.TS,
      SkillNames.NODEJS,
      SkillNames.PYTHON,
      SkillNames.POSTGRES,
      SkillNames.PRISMA,
      SkillNames.SOLIDITY,
      SkillNames.GIT,
    ],
  },
];
export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
