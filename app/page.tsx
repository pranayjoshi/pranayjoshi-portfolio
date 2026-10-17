"use client"

import type React from "react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, Award, Code2, Download, Github, Linkedin, Mail, Medal, Sparkles, Trophy } from "lucide-react"
import ExperienceSection from "@/components/experience-section"
import ThemeToggle from "@/components/theme-toggle"

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
  image?: string
  imagePosition?: string
  imageScale?: number
  imageOrigin?: string
  mark?: string
}

const projects: Project[] = [
  {
    title: "Find Research Labs",
    role: "Founder",
    url: "https://findresearchlabs.com",
    image: "/projects/find-research-labs.png",
    imagePosition: "center",
    description:
      "A place for students and researchers to find each other. Compare a lab’s questions, people, and open roles, then take the next step with that context in view.",
    tags: ["Research", "Matching", "Labs", "Discovery"],
  },
  {
    title: "CRISPRR.bio",
    role: "Builder",
    featured: true,
    url: "https://crisprr.bio",
    githubUrl: "https://github.com/pranayjoshi",
    image: "/projects/crisprr.jpg",
    imagePosition: "center",
    imageScale: 1.8,
    imageOrigin: "42% 50%",
    mark: "CRISPR",
    description:
      "Web platform for CRISPR guide design and Cas9 analysis — guide scoring, off-target search, and export-ready instructions for researchers.",
    tags: ["CRISPR", "Cas9", "Bioinformatics", "Next.js", "Python"],
  },
  {
    title: "Physlint",
    role: "Builder",
    url: "https://physlint.com",
    githubUrl: "https://github.com/pranayjoshi/physlint",
    image: "/projects/physlint.png",
    imagePosition: "center top",
    description:
      "Local checks for robot-learning data. Physlint catches broken recordings before they reach training, then writes a CI report with a stable exit code.",
    tags: ["Python", "Robotics", "LeRobot", "MCAP", "CLI"],
  },
  {
    title: "MindBeats",
    role: "Winner, UGAHacks",
    githubUrl: "https://github.com/pranayjoshi/mindbeat",
    image: "/projects/mindbeats.png",
    imagePosition: "center top",
    mark: "EEG",
    description:
      "EEG-based music recommendation system that utilizes real-time brain signals and emotion detection via custom CNN model to generate playlist recommendations.",
    tags: ["Python", "TensorFlow", "Streamlit", "OpenAI API", "EEG", "CNN"],
  },
  {
    title: "The Game Factory",
    role: "Builder",
    githubUrl: "https://github.com/pranayjoshi/The-Game-Factory",
    image: "/projects/game-factory.jpg",
    imagePosition: "center top",
    description:
      "Describe a game or sketch a level, and it becomes something you can play in the browser. Agents build it, then you can remix it and share it.",
    tags: ["TypeScript", "Python", "Phaser", "FastAPI", "AI"],
  },
  {
    title: "Lifeline",
    role: "Winner HackUGA 11",
    githubUrl: "https://github.com/pranayjoshi/ugahacks11",
    image: "/projects/lifeline.jpg",
    imagePosition: "center",
    mark: "Voice",
    description:
      "AI-powered second responder that eliminates busy signals during emergencies — ultra-low-latency voice agent in 29+ languages with intelligent dispatch escalation.",
    tags: ["Twilio", "Gemini", "ElevenLabs", "Node.js", "Next.js", "WebSockets"],
  },
]

const achievements = [
  { icon: Code2, label: "Google Summer of Code", detail: "Postman · Open Source" },
  { icon: Sparkles, label: "Google Code-in Winner", detail: "Open Source · Global" },
  { icon: Trophy, label: "ACM ICPC Finalist", detail: "Competitive Programming" },
  { icon: Award, label: "4x President's List", detail: "University Honors & Emerging Scholar" },
  { icon: Medal, label: "4x Hackathon Winner", detail: "MindBeats · EEG + AI" },
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
  const syncActiveSection = useRef<() => void>(() => {})

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
      syncActiveSection.current()
    }, 900)
  }, [])

  useEffect(() => {
    const update = () => {
      if (isClickScrolling.current) return

      const sections = sectionNavItems
        .map((item) => document.getElementById(item.href.replace("#", "")))
        .filter((element): element is HTMLElement => element !== null)

      if (sections.length === 0) return

      const marker = window.innerHeight * 0.34
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id
      }
      setActiveSection(current)
    }

    syncActiveSection.current = update
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      window.clearTimeout(clickScrollTimeout.current)
    }
  }, [sectionNavItems])

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-[var(--ink)] bg-[var(--bg)] px-6 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <a href="#about" className="font-display text-lg font-extrabold uppercase tracking-[-0.04em]">
            Pranay Joshi
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--on-ink)]"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[30vw] min-w-[380px] max-w-[480px] overflow-hidden border-r border-[var(--ink)] bg-[var(--surface)] lg:block">
        <div className="grid h-full grid-rows-[auto_1fr_auto] p-16">
          <div>
            <a
              href="https://crisprr.bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)] transition-colors hover:text-[var(--mark)]"
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

          <div className="border-t border-[var(--line)] pt-6">
            <div className="theme-toggle-row">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Theme</p>
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-3 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            <a href="mailto:pjoshi6@crimson.ua.edu" className="hover:text-[var(--mark)]">
              Email
            </a>
            <a href="https://github.com/pranayjoshi/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mark)]">
              Github
            </a>
            <a
              href="https://linkedin.com/in/pranay-joshi-/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--mark)]"
            >
              LinkedIn
            </a>
            </div>
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
                  I build backend systems and AI tools.
                </p>
              </div>
            </div>
          </div>

          <div className="about-body">
            <div className="about-main">
              <p className="about-bio">
                Neurotech, genomics, and robotics are part of the work. The software has to handle biological data, and the robotics projects have to work alongside the hardware.
              </p>

              <div className="about-venture">
                <p className="credential-label">Entrepreneurship</p>
                <a
                  className="about-foundry"
                  href="https://www.hbs.edu/foundry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="about-foundry-plate">
                    <Image
                      src="/logos/hbs-foundry.png"
                      alt="Harvard Business School Foundry"
                      width={655}
                      height={377}
                      className="about-foundry-logo"
                    />
                  </span>
                  <span className="about-foundry-copy">
                    <span className="about-foundry-kicker">Accepted</span>
                    <span className="about-foundry-name">Humans2Machines</span>
                    <span className="about-foundry-rule" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="about-foundry-arrow" aria-hidden="true" />
                </a>
              </div>

              <div className="about-skills">
                <div className="about-skills-header">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--mark)]">Technical Index</p>
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

            <div className="about-side">
              <EducationCard />
              <AchievementsCard />
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section">
          <SectionHeading index="02" eyebrow="Projects" title="Ideas, shipped in code." />
          <div className="project-grid">
            {projects.map((project, index) => {
              const isFeatured = project.featured === true
              const cardHref = project.url ?? project.githubUrl
              const hasSeparateGithubLink = Boolean(project.githubUrl && project.url && project.githubUrl !== project.url)

              return (
                <article
                  key={project.title}
                  className={`project-card ${isFeatured ? "project-card-featured" : ""} ${cardHref ? "project-card-linked" : ""}`}
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
                    <span className="project-featured">
                      <span className="blinking-dot" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                  {project.image ? (
                    <div className="project-media">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="project-media-image object-cover"
                        style={{
                          objectPosition: project.imagePosition ?? "center",
                          transform: project.imageScale ? `scale(${project.imageScale})` : undefined,
                          transformOrigin: project.imageOrigin,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="project-media project-plate" aria-hidden="true">
                      <span className="project-plate-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="project-plate-mark">{project.mark}</span>
                    </div>
                  )}
                  <div className="project-body pointer-events-none relative z-10">
                    <div className="project-title-row">
                      <div>
                        <p className="project-kicker">
                          {String(index + 1).padStart(2, "0")} / {project.role}
                        </p>
                        <h3 className="project-title">{project.title}</h3>
                      </div>
                      {cardHref && <ArrowUpRight className="project-arrow" />}
                    </div>
                    <p className="project-copy line-clamp-4">{project.description}</p>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={hasSeparateGithubLink ? 0 : -1}
                        aria-hidden={!hasSeparateGithubLink}
                        className={`project-github ${hasSeparateGithubLink ? "pointer-events-auto relative z-20" : ""}`}
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
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

        <section id="research" className="portfolio-section research-section">
          <header className="research-header">
            <p className="section-index research-header-label">04 / Research</p>
            <h2 className="research-heading">Physiological computing for learning and robotics.</h2>
          </header>
          <article className="research-card">
            <div className="research-card-main">
              <p className="research-date">{research.date}</p>
              <h3 className="research-paper-title">{research.title}</h3>
              <p className="research-venue">{research.venue}</p>
              <a
                href={research.url}
                target="_blank"
                rel="noopener noreferrer"
                className="research-link"
              >
                View Publication <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="research-card-meta">
              <p className="research-meta">
                <span className="research-meta-label">Authors</span>
                {research.authors.join(", ")}
              </p>
              <p className="research-meta">
                <span className="research-meta-label">DOI</span>
                {research.doi}
              </p>
              <p className="research-abstract">{research.abstract}</p>
              <div className="research-keywords">
                {research.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
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
            className="mt-10 inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--on-ink)] hover:bg-[var(--mark)]"
          >
            Resume <Download className="h-4 w-4" />
          </a>
        </section>
      </div>
    </main>
  )
}

function EducationCard() {
  return (
    <div className="credential-card">
      <p className="credential-label">Education</p>
      <div className="education-row">
        <Image src="/logos/alabama.png" alt="" width={128} height={128} className="education-mark" />
        <div className="education-copy">
          <div className="credential-title-row">
            <h3 className="credential-title">The University of Alabama</h3>
            <span className="credential-title credential-year">&apos;23 - &apos;27</span>
          </div>
          <p className="credential-detail">B.S. Computer Science · Minor in Robotics</p>
          <p className="credential-detail">
            <span className="credential-gpa">GPA 4.00/4.00</span>
          </p>
        </div>
      </div>
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
    <div className="mb-12 grid gap-6 border-b border-[var(--ink)] pb-8 md:grid-cols-[0.25fr_0.75fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--mark)]">{index} / {eyebrow}</p>
      </div>
      <h2 className="font-display text-5xl font-extrabold leading-[1] tracking-[-0.045em] md:text-7xl">{title}</h2>
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
      className="group border border-[var(--ink)] bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--ink)] hover:text-[var(--on-ink)]"
    >
      <div className="mb-10 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mark)]">{label}</span>
        {icon}
      </div>
      <p className="break-words font-display text-2xl font-bold tracking-[-0.025em]">{value}</p>
    </a>
  )
}
