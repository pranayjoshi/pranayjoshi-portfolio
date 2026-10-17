"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Impact = {
  action: string
  headline: string
  metric?: string
}

type ExperienceRole = {
  logo: string
  logoAlt: string
  title: string
  subtitle?: string
  company: string
  location: string
  period: string
  current?: boolean
  impacts: Impact[]
  stack: string[]
}

const experience: ExperienceRole[] = [
  {
    logo: "/logos/shipt.svg",
    logoAlt: "Shipt logo",
    title: "Backend & AI Engineer Intern",
    subtitle: "Marketplace · Search · Payments",
    company: "Shipt",
    location: "Birmingham, AL",
    period: "Jun 2026 — Present",
    current: true,
    impacts: [
      { action: "Architected", headline: "AI Coding Agent Harness", metric: "MCP" },
      { action: "Powered", headline: "E-commerce Search", metric: "GenAI" },
      { action: "Shipped", headline: "AI Cart Builder", metric: "Live" },
    ],
    stack: ["Go", "LLMs", "RAG", "Agents", "Harness"],
  },
  {
    logo: "/logos/shipt.svg",
    logoAlt: "Shipt logo",
    title: "Backend Engineer Intern",
    company: "Shipt",
    location: "Birmingham, AL",
    period: "Jun 2025 — Aug 2025",
    impacts: [
      { action: "Shipped", headline: "Gen AI Chatbot", metric: "12×" },
      { action: "Integrated", headline: "Stripe Refunds", metric: "100K+" },
      { action: "Fixed", headline: "Checkout Flow" },
    ],
    stack: ["Go", "GraphQL", "Kafka", "Stripe"],
  },
  {
    logo: "/logos/caps.png",
    logoAlt: "Center for Advanced Public Safety logo",
    title: "Backend Developer",
    company: "Center for Advanced Public Safety",
    location: "Tuscaloosa, AL",
    period: "Aug 2024 — Present",
    current: true,
    impacts: [
      { action: "Automated", headline: "ArcGIS Pipeline", metric: "Python" },
      { action: "Scaled", headline: "Crash Analytics", metric: "67" },
      { action: "Deployed", headline: "SQL Framework", metric: "170+" },
    ],
    stack: ["Go", "Next.js", "Docker", "SQL"],
  },
  {
    logo: "/logos/gsoc.svg",
    logoAlt: "Google Summer of Code logo",
    title: "Software Developer",
    subtitle: "Postman · Open Source",
    company: "Google Summer of Code",
    location: "Remote",
    period: "May 2024 — Aug 2024",
    impacts: [
      { action: "Generated", headline: "Schema CLI", metric: "OSS" },
      { action: "Standardized", headline: "JSON Models" },
    ],
    stack: ["C#", "CLI", "JSON Schema"],
  },
  {
    logo: "/logos/alabama.png",
    logoAlt: "University of Alabama logo",
    title: "Research Assistant",
    company: "Human Tech & Interaction Lab",
    location: "Tuscaloosa, AL",
    period: "Jan 2024 — Present",
    current: true,
    impacts: [
      { action: "Published", headline: "CHI 2025 Paper", metric: "CHI" },
      { action: "Built", headline: "Neuroscope BCI", metric: "Live" },
      { action: "Trained", headline: "EEG/EMG Platform" },
    ],
    stack: ["Python", "JS", "Electron", "BCI"],
  },
  {
    logo: "/logos/dubverse.jpg",
    logoAlt: "Dubverse logo",
    title: "AI Developer",
    company: "Dubverse",
    location: "Delhi, India",
    period: "Oct 2021 — Oct 2022",
    impacts: [
      { action: "Led", headline: "CV Product Team", metric: "6" },
      { action: "Shipped", headline: "Lens Masking", metric: "$100/wk" },
    ],
    stack: ["Python", "TensorFlow", "GCP", "OpenCV"],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const role = experience[active]

  const move = (next: number) => {
    const index = (next + experience.length) % experience.length
    setActive(index)
    tabs.current[index]?.focus()
  }

  return (
    <section id="experience" className="portfolio-section experience-section">
      <header className="experience-header">
        <p className="section-index experience-header-label">03 / Experience</p>
        <h2 className="experience-heading">Roles, and the work that shipped.</h2>
      </header>

      <div className="experience-stage">
        <div
          className="experience-rail"
          role="tablist"
          aria-label="Roles"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault()
              move(active + 1)
            }
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault()
              move(active - 1)
            }
          }}
        >
          {experience.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={`${item.company}-${item.period}`}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`experience-tab-${index}`}
                className={`experience-pick${selected ? " is-active" : ""}`}
                aria-selected={selected}
                aria-controls="experience-detail"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
              >
                <span className="experience-logo-wrap">
                  <Image src={item.logo} alt="" width={48} height={48} className="experience-logo" />
                </span>
                <span className="experience-pick-copy">
                  <span className="experience-pick-company">
                    {item.company}
                    {item.current ? <span className="experience-pick-dot" aria-hidden="true" /> : null}
                  </span>
                  <span className="experience-pick-title">{item.title}</span>
                </span>
              </button>
            )
          })}
        </div>

        <article
          id="experience-detail"
          role="tabpanel"
          aria-labelledby={`experience-tab-${active}`}
          className="experience-detail"
          key={`${role.company}-${role.period}`}
        >
          <header className="experience-detail-top">
            <div>
              <p className="experience-meta">
                {role.location}
                <span aria-hidden="true"> · </span>
                {role.period}
              </p>
              <h3 className="experience-company">{role.company}</h3>
              <p className="experience-title">{role.title}</p>
              {role.subtitle ? <p className="experience-subtitle">{role.subtitle}</p> : null}
            </div>
            {role.current ? (
              <span className="experience-now">
                <span className="blinking-dot" aria-hidden="true" />
                Now
              </span>
            ) : null}
          </header>

          <div className="experience-impacts">
            {role.impacts.map((impact, index) => (
              <div key={impact.headline} className="experience-impact" style={{ animationDelay: `${80 + index * 70}ms` }}>
                <p className="experience-impact-action">{impact.action}</p>
                <p className="experience-impact-headline">{impact.headline}</p>
                {impact.metric ? <p className="experience-impact-metric">{impact.metric}</p> : <span />}
              </div>
            ))}
          </div>

          <p className="experience-stack">
            {role.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </p>
        </article>
      </div>
    </section>
  )
}
