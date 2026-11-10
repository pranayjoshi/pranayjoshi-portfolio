// Everything the page says, in one place.

export const me = {
  name: "Pranay Joshi",
  line: "Backend and AI engineer. I build software for machines that sense and move.",
  email: "pranayjoshi4466@gmail.com",
  uni: "pjoshi6@crimson.ua.edu",
  github: "https://github.com/pranayjoshi/",
  linkedin: "https://linkedin.com/in/pranay-joshi-/",
  x: "https://x.com/pranayjoshi_4",
  xHandle: "@pranayjoshi_4",
  resume: "/resume.pdf",
}

export type Project = {
  id: string
  title: string
  domain: string
  role: string
  line: string
  desc: string
  img: string
  tags: string[]
  url?: string
  gh?: string
  /** link to a demo video post */
  video?: string
  /** local demo clip that plays in place; img is its poster */
  clip?: string
  /** the site allows embedding, so the demo viewer can run it in place */
  live?: boolean
  kind?: "video" | "phone"
  /** object-position for the screenshot crop */
  pos?: string
}

export const projects: Project[] = [
  {
    id: "armed", title: "Armed", domain: "Robotics · EMG", role: "Meta AI Hackathon · Featured",
    line: "A third robot arm that autocompletes you.",
    desc: "It watches the desk, proposes what you need next, and moves on a forearm twitch. A brace freezes it with no model in the loop.",
    img: "armed.jpg", clip: "armed-demo.mp4", video: "https://x.com/pranayjoshi_4/status/2118247247930400804",
    gh: "https://github.com/pranayjoshi/armed",
    tags: ["Robotics", "EMG", "SAM 3.1", "Muse Spark", "Python", "SO-101"], kind: "video", pos: "center",
  },
  {
    id: "ripple", title: "Ripple", domain: "AI Agents", role: "Open Agent Hackathon · Featured",
    line: "See how the public reacts before you post.",
    desc: "Simulates reactions on an audience built from Census and Pew data, then explains who reacts and why, with evidence for every reason.",
    img: "ripple.jpg", gh: "https://github.com/pranayjoshi/Ripple",
    tags: ["AI Agents", "Nemotron", "TypeScript", "SQL", "Docker"], pos: "28% center",
  },
  {
    id: "physlint", title: "Physlint", domain: "Robotics", role: "Builder",
    line: "Catches broken robot-learning data before it reaches training.",
    desc: "Local checks for LeRobot and MCAP recordings, with a CI report and a stable exit code.",
    img: "physlint.png", url: "https://physlint.com", gh: "https://github.com/pranayjoshi/physlint",
    tags: ["Python", "LeRobot", "MCAP", "CLI"], live: true,
  },
  {
    id: "crisprr", title: "CRISPRR.bio", domain: "Genomics", role: "Builder",
    line: "CRISPR guide design and Cas9 analysis in the browser.",
    desc: "Guide scoring, off-target search and export-ready instructions for researchers.",
    img: "crisprr.jpg", url: "https://crisprr.bio",
    tags: ["CRISPR", "Cas9", "Bioinformatics", "Next.js", "Python"], live: true,
  },
  {
    id: "mindbeats", title: "MindBeats", domain: "Neurotech", role: "Winner · UGAHacks",
    line: "Music picked by your live brain signals.",
    desc: "Real-time EEG and a custom CNN detect emotion, then build the playlist.",
    img: "mindbeats.png", gh: "https://github.com/pranayjoshi/mindbeat",
    tags: ["EEG", "CNN", "TensorFlow", "Streamlit"],
  },
  {
    id: "lifeline", title: "Lifeline", domain: "Voice AI", role: "Winner · HackUGA 11",
    line: "An AI second responder that ends busy signals.",
    desc: "Ultra-low-latency voice agent in 29+ languages with dispatch escalation.",
    img: "lifeline.jpg", gh: "https://github.com/pranayjoshi/ugahacks11",
    tags: ["Twilio", "Gemini", "ElevenLabs", "WebSockets"],
  },
  {
    id: "frl", title: "Find Research Labs", domain: "Research", role: "Founder",
    line: "Students and research labs find each other.",
    desc: "Compare a lab's questions, people and open roles, then take the next step.",
    img: "find-research-labs.png", url: "https://findresearchlabs.com",
    tags: ["Matching", "Discovery", "Labs"],
  },
  {
    id: "game", title: "The Game Factory", domain: "Agents", role: "Builder",
    line: "Describe a game or sketch a level. Play it in the browser.",
    desc: "Agents build the game, then you remix it and share it.",
    img: "game-factory.jpg", gh: "https://github.com/pranayjoshi/The-Game-Factory",
    tags: ["TypeScript", "Phaser", "FastAPI", "AI"],
  },
  {
    id: "oop", title: "Out of Pocket", domain: "iOS", role: "2nd place · HackBama",
    line: "Campus life in one app, with a buying agent.",
    desc: "Find a tutor, pass on a ticket, share a ride, or let an agent negotiate a textbook trade.",
    img: "out-of-pocket.png", gh: "https://github.com/pranayjoshi/Out-Of-Pocket",
    tags: ["SwiftUI", "TypeScript", "React"], kind: "phone",
  },
]

export const stats: [string, string][] = [
  ["150+", "Repos shipped"],
  ["2019", "Building since"],
  ["6", "Roles · Shipt to GSoC"],
  ["5×", "Hackathon wins"],
]

export type Role = {
  logo: string
  company: string
  title: string
  subtitle?: string
  location: string
  period: string
  current?: boolean
  impacts: [string, string, string?][]
  stack: string[]
}

export const experience: Role[] = [
  {
    logo: "shipt.svg", company: "Shipt", title: "Backend & AI Engineer Intern", subtitle: "Marketplace · Search · Payments",
    location: "Birmingham, AL", period: "Jun 2026 — Present", current: true,
    impacts: [["Architected", "AI Coding Agent Harness", "MCP"], ["Powered", "E-commerce Search", "GenAI"], ["Shipped", "AI Cart Builder", "Live"]],
    stack: ["Go", "LLMs", "RAG", "Agents", "Harness"],
  },
  {
    logo: "shipt.svg", company: "Shipt", title: "Backend Engineer Intern",
    location: "Birmingham, AL", period: "Jun 2025 — Aug 2025",
    impacts: [["Shipped", "Gen AI Chatbot", "12×"], ["Integrated", "Stripe Refunds", "100K+"], ["Fixed", "Checkout Flow"]],
    stack: ["Go", "GraphQL", "Kafka", "Stripe"],
  },
  {
    logo: "caps.png", company: "Center for Advanced Public Safety", title: "Backend Developer",
    location: "Tuscaloosa, AL", period: "Aug 2024 — Present", current: true,
    impacts: [["Automated", "ArcGIS Pipeline", "Python"], ["Scaled", "Crash Analytics", "67"], ["Deployed", "SQL Framework", "170+"]],
    stack: ["Go", "Next.js", "Docker", "SQL"],
  },
  {
    logo: "gsoc.svg", company: "Google Summer of Code", title: "Software Developer", subtitle: "Postman · Open Source",
    location: "Remote", period: "May 2024 — Aug 2024",
    impacts: [["Generated", "Schema CLI", "OSS"], ["Standardized", "JSON Models"]],
    stack: ["C#", "CLI", "JSON Schema"],
  },
  {
    logo: "alabama.png", company: "Human Tech & Interaction Lab", title: "Research Assistant",
    location: "Tuscaloosa, AL", period: "Jan 2024 — Present", current: true,
    impacts: [["Published", "CHI 2025 Paper", "CHI"], ["Built", "Neuroscope BCI", "Live"], ["Trained", "EEG/EMG Platform"]],
    stack: ["Python", "JS", "Electron", "BCI"],
  },
  {
    logo: "dubverse.jpg", company: "Dubverse", title: "AI Developer",
    location: "Delhi, India", period: "Oct 2021 — Oct 2022",
    impacts: [["Led", "CV Product Team", "6"], ["Shipped", "Lens Masking", "$100/wk"]],
    stack: ["Python", "TensorFlow", "GCP", "OpenCV"],
  },
]

export const achievements: [string, string][] = [
  ["Google Summer of Code", "Postman · Open Source"],
  ["Google Code-in Winner", "Open Source · Global"],
  ["ACM ICPC Finalist", "Competitive Programming"],
  ["4× President's List", "University Honors & Emerging Scholar"],
  ["5× Hackathon Winner", "MindBeats · Lifeline · more"],
]

export const skills: string[][] = [
  ["Golang", "Python", "TypeScript", "SQL", "C/C++", "React", "Next.js", "Node.js", "FastAPI", "GraphQL", "gRPC"],
  ["AI Agents", "LangGraph", "LangChain", "RAG", "Harness Engineering", "LLM Evaluation", "MCP", "Vector DBs"],
  ["AWS", "Docker", "Kubernetes", "Terraform", "Kafka", "Redis", "PostgreSQL", "MongoDB", "Git", "Linux", "GCP"],
]

export const research = {
  title: "PhysioBots: Engaging K-12 Students with Physiological Computing and Robotics",
  authors: "Myles Lewis, Pranay Joshi, Wesley Cade Junkins, Vincent Ingram, Chris S. Crawford",
  venue: "CHI EA ’24 · ACM · May 2024",
  url: "https://dl.acm.org/doi/10.1145/3706599.3720106",
  keywords: ["Physiological Computing", "Robotics", "EEG", "EMG", "HCI", "K-12"],
}

export const pad = (n: number) => String(n).padStart(2, "0")
export const host = (p: Project) => (p.url || p.gh || "").replace("https://", "").replace(/\/$/, "")
