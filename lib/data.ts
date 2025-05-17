import type { Project, SkillCategory } from "./types";

export const projects: Project[] = [
  {
    id: "dao-sentinel",
    title: "DAO Sentinel",
    description:
      "A comprehensive DAO analysis tool that provides insights into governance proposals, voting patterns, and treasury management with the use of AI.",
    image: "/images/dao-sentinel.jpg?height=400&width=600",
    tags: [
      "Rust",
      "Arbitrum Stylus",
      "Langchain",
      "The Graph",
      "Nillion Storage",
      "Next.js",
    ],
    highlights: [
      "DAO proposal analysis",
      "Voting pattern visualization",
      "Treasury management insights",
      "AI-driven recommendations",
      "Cross-chain compatibility",
      "User-friendly interface",
      "Real-time data updates",
      "Secure data storage",
    ],

    githubUrl: "https://github.com/ChrisKw0n/agentic-dao-visier",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Blockchain & Web3",
    icon: "🔗",
    skills: [
      "EVM",
      "Solidity",
      "Rust",
      "Ethers.js",
      "Viem",
      "Foundry",
      "Hardhat",
      "The Graph",
    ],
  },
  {
    name: "Frontend Development",
    icon: "🖥️",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Backend Development",
    icon: "⚙️",
    skills: ["Node.js", "GraphQL", "REST APIs", "PostgreSQL"],
  },

  {
    name: "Tools & DevOps",
    icon: "🛠️",
    skills: ["Git", "Docker", "AWS", "Vercel", "Testing"],
  },
  {
    name: "Other Skills",
    icon: "🧠",
    skills: ["Propeller Aircraft Flight", "Guitar", "Music Production"],
  },
];
