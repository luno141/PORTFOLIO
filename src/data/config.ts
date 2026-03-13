const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const config = {
  title: "Vikrant Dey | Product-Focused Developer",
  headline:
    "Developer building ambitious products across web, AI, interactive systems, and emerging Web3 experiences.",
  description: {
    long: "Portfolio of Vikrant Dey, a BCA student and product-focused developer building full-stack web applications, AI-powered systems, C++ graphics experiments, cybersecurity tooling, and blockchain-integrated product concepts.",
    short:
      "Vikrant Dey builds ambitious products across web, AI, graphics, and emerging Web3 experiences.",
  },
  keywords: [
    "Vikrant Dey",
    "portfolio",
    "product-focused developer",
    "BCA student",
    "full-stack developer",
    "AI systems",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "C++ graphics",
    "Web3",
    "cybersecurity platform",
    "healthcare AI",
    "Telegram bot",
    "Monad testnet",
  ],
  author: "Vikrant Dey",
  email: "deyvikrantofficial@gmail.com",
  resume: "/assets/Resume.pdf",
  site: siteUrl,
  githubUsername: "luno141",
  githubRepo: "",
  about: {
    shortBio:
      "I am a BCA student and product-focused developer building across full-stack web, AI-powered systems, C++ graphics, and blockchain-integrated applications.",
    paragraphs: [
      "My work spans cybersecurity platforms, healthcare AI systems, Telegram automation bots, zk-based reward concepts, and rendering engines.",
      "I enjoy creating products that feel technically strong, visually polished, and built for real-world impact.",
    ],
    focusAreas: [
      "Full-stack web products with strong UX and backend depth",
      "AI-assisted systems for healthcare, security, and intelligent workflows",
      "Low-level graphics and rendering experiments in C++",
      "Web3 concepts involving wallet flows, smart contracts, and testnet integrations",
    ],
  },
  availability: {
    headline:
      "Open to product engineering internships, startup roles, and select technical collaborations.",
    summary:
      "Best fit for teams building AI features, full-stack products, automation systems, internal tools, and technically demanding prototypes.",
    responseTime: "I usually reply within 24 to 48 hours.",
    roles: [
      "Product engineering internships",
      "Early-stage startup roles",
      "AI, automation, and systems-heavy collaborations",
      "Full-stack prototype and MVP builds",
    ],
  },
  statusHighlights: [
    "BCA student at Galgotias University",
    "Building across AI, cybersecurity, Web3, and graphics",
    "Strongest in product implementation, AI workflows, and systems-first experimentation",
  ],
  currentlyBuilding: [
    {
      title: "North Star",
      summary:
        "Threat intelligence ingestion, extraction, and alert prioritization workflows.",
    },
    {
      title: "MediMind",
      summary:
        "Clinical intake flows that turn patient conversation into structured context.",
    },
    {
      title: "Bet0verse",
      summary:
        "Telegram-first betting flows with backend state and planned on-chain extensions.",
    },
  ],
  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/vikrant666/",
    instagram: "https://instagram.com/luno_666",
    facebook: "",
    github: "https://github.com/luno141",
  },
};
export { config };
