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
      "Ethereum",
      "Solidity",
      "Smart Contracts",
      "Web3.js",
      "Ethers.js",
      "Hardhat",
      "Truffle",
      "IPFS",
      "The Graph",
    ],
  },
  {
    name: "Frontend Development",
    icon: "🖥️",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML/CSS",
      "Redux",
      "React Query",
    ],
  },
  {
    name: "Backend Development",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express",
      "GraphQL",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
    ],
  },
  {
    name: "DeFi & NFTs",
    icon: "💰",
    skills: [
      "Yield Farming",
      "Liquidity Pools",
      "AMMs",
      "NFT Standards",
      "Tokenomics",
      "DAO Governance",
    ],
  },
  {
    name: "Tools & DevOps",
    icon: "🛠️",
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Testing",
    ],
  },
  {
    name: "Other Skills",
    icon: "🧠",
    skills: [
      "Technical Writing",
      "Project Management",
      "UI/UX Design",
      "Security Auditing",
      "Cryptography",
    ],
  },
];
