"use client"

import type React from "react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, Award, Code2, Download, Github, Linkedin, Mail, Medal, Sparkles, Trophy } from "lucide-react"
import ExperienceSection from "@/components/experience-section"

const navItems = [
  { label: "About", href: "#about", angle: -72 },
  { label: "Projects", href: "#projects", angle: -43 },
  { label: "Experience", href: "#experience", angle: -14 },
  { label: "Research", href: "#research", angle: 15 },
  { label: "Let's Talk", href: "#talk", angle: 44 },
  { label: "Resume", href: "/resume.pdf", angle: 73, external: true },
]

type Project = {
  title: string
  role: string
  description: string
  tags: string[]
  githubUrl?: string
  featured?: boolean
  url?: string
}

const projects: Project[] = [
  {
    title: "CRISPRR.bio",
    role: "Builder",
    featured: true,
    url: "https://crisprr.bio",
    githubUrl: "https://github.com/pranayjoshi",
    description:
      "Web platform for CRISPR guide design and Cas9 analysis — guide scoring, off-target search, and export-ready instructions for researchers.",
    tags: ["CRISPR", "Cas9", "Bioinformatics", "Next.js", "Python"],
  },
  {
    title: "MindBeats",
    role: "Winner, UGAHacks",
    githubUrl: "https://github.com/pranayjoshi/mindbeat",
    description:
      "EEG-based music recommendation system that utilizes real-time brain signals and emotion detection via custom CNN model to generate playlist recommendations.",
    tags: ["Python", "TensorFlow", "Streamlit", "OpenAI API", "EEG", "CNN"],
  },
  {
    title: "NeuroOS",
    role: "Founder",
    url: "https://www.neuroos.xyz/",
    githubUrl: "https://github.com/pranayjoshi/neuroos",
    description:
      "Hardware-agnostic BCI operating system that translates raw EEG into clean intent APIs — like iOS for brain-computer interfaces.",
    tags: ["BCI", "EEG", "AI", "TypeScript", "SDK", "Accessibility"],
  },
  {
    title: "Neuroscope",
    role: "Developer",
    githubUrl: "https://github.com/htil/neuroscope",
    description:
      "EEG-powered neurotechnology to perform complex robotic simulation using brain waves and writing commands via Scratch like interface.",
    tags: ["JavaScript", "Python", "Electron", "BCI", "EEG", "Robotics", "Blockly"],
  },
  {
    title: "Lifeline",
    role: "Winner HackUGA 11",
    githubUrl: "https://github.com/pranayjoshi/ugahacks11",
    description:
      "AI-powered second responder that eliminates busy signals during emergencies — ultra-low-latency voice agent in 29+ languages with intelligent dispatch escalation.",
    tags: ["Twilio", "Gemini", "ElevenLabs", "Node.js", "Next.js", "WebSockets"],
  },
  {
    title: "InfraOD",
    role: "Developer",
    githubUrl: "https://github.com/pranayjoshi/InfraOD",
    description:
      "Infrared-based object detection pipeline powered by YOLOv8 for real-time thermal vision applications.",
    tags: ["Python", "YOLOv8", "Computer Vision", "OpenCV", "PyTorch"],
  },
]

const achievements = [
  { icon: Code2, label: "Google Summer of Code", detail: "Postman · Open Source" },
  { icon: Sparkles, label: "Google Code-in Winner", detail: "Open Source · Global" },
  { icon: Trophy, label: "ACM ICPC Finalist", detail: "Competitive Programming" },
  { icon: Award, label: "4x President's List", detail: "University Honors & Emerging Scholar" },
  { icon: Medal, label: "2x UGAHacks Winner", detail: "MindBeats · EEG + AI" },
]

const skillGroups = [
  {
    label: "Programming",
    items: [
      "Golang",
      "Python",
      "TypeScript/JavaScript",
      "SQL",
      "C/C++",
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "GraphQL",
      "gRPC",
    ],
  },
  {
    label: "AI & Backend",
    items: [
      "AI Agents",
      "LangGraph",
      "LangChain",
      "RAG",
      "Harness Engineering",
      "LLM Evaluation",
      "MCP",
      "Vector DBs",
    ],
  },
  {
    label: "Cloud & Infra",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Git",
      "Linux",
      "GCP",
    ],
  },
]

const research = {
  title: "PhysioBots: Engaging K-12 Students with Physiological Computing and Robotics",
  authors: ["Myles Lewis", "Pranay Joshi", "Wesley Cade Junkins", "Vincent Ingram", "Chris S. Crawford"],
  venue: "CHI Conference on Human Factors in Computing Systems Extended Abstracts (CHI EA '24)",
  date: "May 2024",
  doi: "10.1145/3706599.3720106",
  url: "https://dl.acm.org/doi/10.1145/3706599.3720106",
  keywords: [
    "Physiological Computing",
    "Robotics",
    "K-12 Education",
    "EEG",
    "EMG",
    "Human-Computer Interaction",
    "STEM Education",
  ],
  abstract:
    "Physiological computing, which involves using physiological signals to control technology, has the potential to engage K-12 students in computing education. PhysioBots combines physiological computing with robotics to engage K-12 students in computing education while fostering creativity and problem-solving skills.",
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const isClickScrolling = useRef(false)
  const clickScrollTimeout = useRef<number | undefined>(undefined)

  const sectionNavItems = useMemo(() => navItems.filter((item) => !item.external), [])

  const handleSectionNav = useCallback((event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    isClickScrolling.current = true
    setActiveSection(sectionId)

    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: "smooth", block: "start" })

    window.clearTimeout(clickScrollTimeout.current)
    clickScrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false
    }, 900)
  }, [])

  useEffect(() => {
    const sectionElements = sectionNavItems
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((element): element is HTMLElement => element !== null)

    if (sectionElements.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) {
          return
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleSections[0]?.target.id) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.clearTimeout(clickScrollTimeout.current)
    }
  }, [sectionNavItems])

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b]">
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-[#1b1b1b] bg-[#f9f9f9] px-6 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <a href="#about" className="font-display text-lg font-extrabold uppercase tracking-[-0.04em]">
            Pranay Joshi
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1b1b1b] bg-[#1b1b1b] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white"
          >
            Resume
          </a>
        </div>
      </nav>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[30vw] min-w-[380px] max-w-[480px] overflow-hidden border-r border-[#1b1b1b] bg-white lg:block">
        <div className="grid h-full grid-rows-[auto_1fr_auto] p-16">
          <div>
            <a
              href="https://crisprr.bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#4c4546] transition-colors hover:text-[#ff3000]"
            >
              <span className="blinking-dot" aria-hidden="true" />
              Checkout CRISPRR.bio
            </a>
            <h1 className="mt-6 font-display text-7xl font-extrabold leading-[0.92] tracking-[-0.055em]">
              Pranay
              <br />
              Joshi
            </h1>
          </div>

          <div className="relative -ml-20 flex items-center">
            <div className="semi-wheel-arc" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="relative h-[520px] w-[430px]">
              {navItems.map((item, index) => {
                const radians = (item.angle * Math.PI) / 180
                const x = Math.cos(radians) * 190
                const y = Math.sin(radians) * 220
                const sectionId = item.href.replace("#", "")
                const isActive = !item.external && activeSection === sectionId

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={item.external ? undefined : (event) => handleSectionNav(event, sectionId)}
                    aria-current={isActive ? "page" : undefined}
                    className={`wheel-link ${isActive ? "wheel-link-active" : ""}`}
                    style={{ left: 110 + x, top: 260 + y, animationDelay: `${index * 120}ms` }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 border-t border-[#cfc4c5] pt-6 text-xs uppercase tracking-[0.16em] text-[#4c4546]">
            <a href="mailto:pjoshi6@crimson.ua.edu" className="hover:text-[#ff3000]">
              Email
            </a>
            <a href="https://github.com/pranayjoshi/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3000]">
              Github
            </a>
            <a
              href="https://linkedin.com/in/pranay-joshi-/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff3000]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </aside>

      <div className="lg:ml-[30vw]">
        <section id="about" className="portfolio-section about-section">
          <div className="about-hero">
            <div className="about-photo">
              <Image
                src="/IMG_3131.JPG"
                alt="Pranay Joshi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 280px"
                className="about-photo-image object-cover"
              />
            </div>

            <div className="about-intro">
              <div className="about-intro-meta">
                <p className="section-index mb-0">01 / About</p>
                <p className="about-status">
                  <span className="blinking-dot" aria-hidden="true" />
                  Shipping since 2018
                </p>
              </div>

              <div className="about-intro-copy">
                <p className="about-greeting">Hi, I&apos;m</p>
                <h2 className="about-name">Pranay Joshi</h2>
                <p className="about-tagline">
                  Engineering purpose into intelligent, high-performance systems.
                </p>
              </div>
            </div>
          </div>

          <div className="about-body">
            <div className="about-main">
              <div className="about-bio">
                <p>
                  I am driven by the desire to create technology that serves a{" "}
                  <BioHighlight>clear purpose</BioHighlight>. I focus on developing{" "}
                  <BioHighlight>scalable backend infrastructure</BioHighlight> and{" "}
                  <BioHighlight>intelligent, AI-driven applications</BioHighlight> designed to solve{" "}
                  <BioHighlight>real-world problems</BioHighlight>. By combining{" "}
                  <BioHighlight>modern engineering</BioHighlight> with <BioHighlight>AI orchestration</BioHighlight>, I
                  build <BioHighlight>efficient, high-performance solutions</BioHighlight>.
                </p>
                <p>
                  My work spans the intersection of <BioHighlight>complex backend architecture</BioHighlight>,{" "}
                  <BioHighlight>neurotech</BioHighlight>, and <BioHighlight>genomics</BioHighlight>, where I bridge the
                  gap between <BioHighlight>technical infrastructure</BioHighlight> and{" "}
                  <BioHighlight>biological data</BioHighlight> to{" "}
                  <BioHighlight>push the boundaries of what is possible</BioHighlight>.
                </p>
              </div>

              <div className="about-skills">
                <div className="about-skills-header">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff3000]">Technical Index</p>
                </div>
                <div className="about-skills-grid">
                  {skillGroups.map((group) => (
                    <div key={group.label} className="about-skill-group">
                      <p className="about-skill-label">{group.label}</p>
                      <ul className="about-skill-list">
                        {group.items.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-credentials">
              <EducationCard />
              <AchievementsCard />
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section">
          <SectionHeading index="02" eyebrow="Projects" title="Ideas, shipped in code." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const isFeatured = project.featured === true
              const cardHref = project.url ?? project.githubUrl
              const hasSeparateGithubLink = Boolean(project.githubUrl && project.url)

              return (
                <article
                  key={project.title}
                  className={`group relative border bg-white p-6 transition-colors hover:bg-[#1b1b1b] hover:text-white ${
                    isFeatured ? "border-[3px] border-[#ff3000]" : "border-[#1b1b1b]"
                  } ${cardHref ? "cursor-pointer" : ""}`}
                >
                  {cardHref && (
                    <a
                      href={cardHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-0"
                      aria-label={`Open ${project.title}`}
                    />
                  )}
                  {isFeatured && (
                    <span className="absolute left-4 top-0 z-20 inline-flex -translate-y-1/2 items-center gap-2 border border-[#ff3000] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff3000]">
                      <span className="blinking-dot" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                  <div className="relative z-10 pointer-events-none">
                    <div className="mb-8 flex items-start justify-between gap-6">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ff3000]">
                          {String(index + 1).padStart(2, "0")} / {project.role}
                        </p>
                        <h3 className="font-display text-3xl font-bold tracking-[-0.03em]">{project.title}</h3>
                      </div>
                      {cardHref && (
                        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </div>
                    <p className="line-clamp-4 leading-[1.55] text-[#4c4546] group-hover:text-[#e5e5e5]">{project.description}</p>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={hasSeparateGithubLink ? 0 : -1}
                        aria-hidden={!hasSeparateGithubLink}
                        className={`mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#4c4546] transition-colors hover:text-[#ff3000] group-hover:text-[#e5e5e5] group-hover:hover:text-[#ff3000] ${
                          hasSeparateGithubLink ? "pointer-events-auto relative z-20" : ""
                        }`}
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-current px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <ExperienceSection />

        <section id="research" className="portfolio-section">
          <SectionHeading index="04" eyebrow="Research" title="Physiological computing for learning and robotics." />
          <article className="grid gap-10 border border-[#1b1b1b] bg-white p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff3000]">{research.date}</p>
              <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.035em]">{research.title}</h3>
              <p className="mt-6 text-sm uppercase tracking-[0.14em] text-[#4c4546]">{research.venue}</p>
              <a
                href={research.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border border-[#1b1b1b] bg-[#1b1b1b] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-[#ff3000] hover:text-white"
              >
                View Publication <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-6">
              <InfoBlock label="Authors" title={research.authors.join(", ")} />
              <InfoBlock label="DOI" title={research.doi} />
              <p className="text-lg leading-[1.6] text-[#4c4546]">{research.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {research.keywords.map((keyword) => (
                  <span key={keyword} className="border border-[#cfc4c5] px-2.5 py-1 text-xs uppercase tracking-[0.08em]">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section id="talk" className="portfolio-section min-h-screen">
          <SectionHeading index="05" eyebrow="Let's Talk" title="Open to projects, opportunities, and collaborations." />
          <div className="grid gap-4 md:grid-cols-2">
            <ContactCard href="mailto:pjoshi6@crimson.ua.edu" label="University Email" value="pjoshi6@crimson.ua.edu" icon={<Mail className="h-5 w-5" />} />
            <ContactCard href="mailto:pranayjoshi4466@gmail.com" label="Personal Email" value="pranayjoshi4466@gmail.com" icon={<Mail className="h-5 w-5" />} />
            <ContactCard href="https://linkedin.com/in/pranay-joshi-/" label="LinkedIn" value="linkedin.com/in/pranay-joshi-/" icon={<Linkedin className="h-5 w-5" />} />
            <ContactCard href="https://github.com/pranayjoshi/" label="GitHub" value="github.com/pranayjoshi/" icon={<Github className="h-5 w-5" />} />
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border border-[#1b1b1b] bg-[#1b1b1b] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-[#ff3000]"
          >
            Resume <Download className="h-4 w-4" />
          </a>
        </section>
      </div>
    </main>
  )
}

function BioHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-[#1b1b1b] underline decoration-[#ff3000] decoration-2 underline-offset-[3px]">
      {children}
    </span>
  )
}

function EducationCard() {
  return (
    <div className="credential-card">
      <p className="credential-label">Education</p>
      <div className="credential-title-row mt-4">
        <h3 className="credential-title">The University of Alabama</h3>
        <span className="credential-title credential-year">&apos;27</span>
      </div>
      <p className="credential-detail">B.S. Computer Science · Minor in Robotics</p>
      <p className="credential-detail">
        <span className="credential-gpa">GPA 4.00/4.00</span>
      </p>
    </div>
  )
}

function AchievementsCard() {
  return (
    <div className="credential-card">
      <p className="credential-label">Achievements</p>
      <ul className="achievement-list">
        {achievements.map(({ icon: Icon, label, detail }) => (
          <li key={label} className="achievement-item">
            <span className="achievement-icon">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="achievement-copy">
              <span className="achievement-title">{label}</span>
              <span className="achievement-detail">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-12 grid gap-6 border-b border-[#1b1b1b] pb-8 md:grid-cols-[0.25fr_0.75fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff3000]">{index} / {eyebrow}</p>
      </div>
      <h2 className="font-display text-5xl font-extrabold leading-[1] tracking-[-0.045em] md:text-7xl">{title}</h2>
    </div>
  )
}

function InfoBlock({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="border-t border-[#1b1b1b] pt-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff3000]">{label}</p>
      <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em]">{title}</h3>
      {children && <div className="mt-3 space-y-1 leading-[1.55] text-[#4c4546]">{children}</div>}
    </div>
  )
}

function ContactCard({
  href,
  label,
  value,
  icon,
}: {
  href: string
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group border border-[#1b1b1b] bg-white p-6 transition-colors hover:bg-[#1b1b1b] hover:text-white"
    >
      <div className="mb-10 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff3000]">{label}</span>
        {icon}
      </div>
      <p className="break-words font-display text-2xl font-bold tracking-[-0.025em]">{value}</p>
    </a>
  )
}
