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

  {
    id: "relief-link",
    title: "Relief Link",
    description:
      "An automated disaster relief platform that delivers immediate financial aid using blockchain, real-time disaster data, identity verification, and fiat onramps to ensure secure and efficient support for verified users in affected regions.",
    image: "/images/relief-link.png?height=400&width=600",
    tags: [
      "Chainlink",
      "Worldcoin",
      "Unlimit",
      "Thirdweb",
      "Next.js",
      "PredictHQ",
      "Base",
      "Solidity",
    ],
    highlights: [
      "Real-time disaster-triggered aid distribution",
      "Chainlink Oracle automation",
      "Worldcoin-based personhood verification",
      "Fiat onramp via Unlimit and Account Abstraction",
      "Impact tracking using PredictHQ API",
      "Disaster trend visualization",
      "Optimized API payloads for lower gas fees",
      "Smart contract deployment on Base Sepolia",
      "Monorepo for full-stack development",
      "Seamless onboarding for non-crypto users",
    ],

    githubUrl: "https://github.com/myanzik/relief-link",
  },

  {
    id: "eth-talk",
    title: "Eth Talk",
    description:
      "An AI-powered voice chatbot that simplifies Ethereum smart wallet management through natural language commands, enabling users to check balances, send funds, mint ENS names, and more via an intuitive interface and OMI voice device integration.",
    image: "/images/ethtalk.png?height=400&width=600",
    tags: [
      "Next.js",
      "Langchain",
      "AgentKit",
      "Coinbase Developer Platform",
      "OMI",
      "Base Sepolia",
      "Python",
      "PostgreSQL",
    ],
    highlights: [
      "Voice-controlled Ethereum smart wallet assistant",
      "Natural language command processing via Langchain",
      "OMI integration for audio command transcription",
      "Real-time wallet actions like balance checks and fund transfers",
      "ENS name minting for wallets and AI agents",
      "ERC-20 and NFT contract deployment using AgentKit",
      "Multi-network support with Base Sepolia default",
      "Secure spend-control via expiring contracts",
      "Persistent chat history and message voting via PostgreSQL",
      "Personalized conversational blockchain experience",
    ],
    githubUrl: "https://github.com/myanzik/eth-talk",
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
