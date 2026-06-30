"use client"

import Image from "next/image"

type Impact = {
  action: string
  headline: string
  metric?: string
}

type ExperienceRole = {
  logo: string
  logoAlt: string
  monogram: string
  title: string
  subtitle?: string
  company: string
  location: string
  period: string
  featured?: boolean
  current?: boolean
  impacts: Impact[]
  stack: string[]
}

const experience: ExperienceRole[] = [
  {
    logo: "/logos/shipt.svg",
    logoAlt: "Shipt logo",
    monogram: "SH",
    title: "Backend & AI Engineer Intern",
    subtitle: "Marketplace · Search · Payments",
    company: "Shipt",
    location: "Birmingham, AL",
    period: "Jun 2026 — Present",
    featured: true,
    current: true,
    impacts: [
      { action: "Built", headline: "Query Understanding", metric: "AI" },
      { action: "Launched", headline: "Fulfillment Agent", metric: "Live" },
    ],
    stack: ["Go", "LLMs", "Search", "Cache", "Agents"],
  },
  {
    logo: "/logos/shipt.svg",
    logoAlt: "Shipt logo",
    monogram: "SH",
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
    monogram: "CAPS",
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
    monogram: "GSoC",
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
    monogram: "HTIL",
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
    monogram: "DV",
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
  return (
    <section id="experience" className="portfolio-section experience-section">
      <header className="experience-header">
        <p className="section-index experience-header-label">03 / Experience</p>
        <span className="experience-header-count">{String(experience.length).padStart(2, "0")} Roles</span>
      </header>

      <div className="experience-track">
        <span className="experience-spine" aria-hidden="true" />

        <div className="experience-list">
          {experience.map((role, index) => (
            <ExperienceCard key={`${role.company}-${role.period}`} role={role} index={index} total={experience.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  role,
  index,
  total,
}: {
  role: ExperienceRole
  index: number
  total: number
}) {
  const cardClass = [
    "experience-card",
    role.featured ? "experience-card-featured" : "",
    role.current && !role.featured ? "experience-card-active" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={cardClass}>
      <div className="experience-card-spine" aria-hidden="true">
        <span className="experience-card-node">{String(index + 1).padStart(2, "0")}</span>
        {index < total - 1 && <span className="experience-card-connector" />}
      </div>

      <div className="experience-card-panel">
        {role.featured && (
          <div className="experience-card-banner">
            <div className="experience-banner-brand">
              <div className="experience-logo-wrap experience-logo-wrap-banner">
                <Image src={role.logo} alt="" width={32} height={32} className="experience-logo" aria-hidden="true" />
              </div>
              <p className="experience-banner-company">{role.company}</p>
            </div>
            <span className="experience-live">
              <span className="blinking-dot" aria-hidden="true" />
              Now
            </span>
          </div>
        )}

        <div className="experience-card-body">
          <header className="experience-card-header">
            <div className="experience-logo-wrap">
              <Image src={role.logo} alt={role.logoAlt} width={48} height={48} className="experience-logo" />
            </div>

            <div className="experience-card-meta">
              {!role.featured && <p className="experience-company">{role.company}</p>}
              <h3 className="experience-title">{role.title}</h3>
              {role.subtitle && <p className="experience-subtitle">{role.subtitle}</p>}
              <div className="experience-meta-row">
                <p className="experience-location">{role.location}</p>
                <p className="experience-period">{role.period}</p>
                {role.current && !role.featured && (
                  <span className="experience-active-dot" aria-label="Currently active">
                    <span className="blinking-dot" aria-hidden="true" />
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="experience-impacts">
            {role.impacts.map((impact) => (
              <div key={`${impact.action}-${impact.headline}`} className="experience-impact">
                <span className="experience-impact-marker" aria-hidden="true" />
                <div className="experience-impact-copy">
                  <p className="experience-impact-action">{impact.action}</p>
                  <p className="experience-impact-headline">{impact.headline}</p>
                </div>
                {impact.metric && <span className="experience-impact-metric">{impact.metric}</span>}
              </div>
            ))}
          </div>

          <div className="experience-stack">
            {role.stack.map((tech) => (
              <span key={tech} className="experience-stack-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
