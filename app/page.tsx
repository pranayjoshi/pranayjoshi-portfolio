import { achievements, experience, me, pad, projects, research, skills, stats } from "@/lib/portfolio"
import { Tags } from "@/components/site/project-frame"
import ProjectDeck from "@/components/site/project-deck"
import DemoViewer from "@/components/site/demo-viewer"
import SiteNav from "@/components/site/site-nav"
import PageEffects from "@/components/site/page-effects"
import RobotScene from "@/components/site/robot/robot-scene"

const ext = { target: "_blank", rel: "noopener noreferrer" } as const
const LOGO = "/logos/"

/** A deterministic EEG-like trace for the paper card (same on every render). */
function eegPath() {
  let d = "M0 32"
  for (let x = 0; x <= 800; x += 4) {
    const burst = Math.exp(-((x - 520) ** 2) / 2600) * 22
    const jitter = Math.sin(x * 12.9898) * 43758.5453
    const y = 32 + Math.sin(x * 0.09) * 5 + Math.sin(x * 0.31) * 3 + ((jitter - Math.floor(jitter)) - 0.5) * 5 - burst * Math.sin(x * 0.5)
    d += ` L${x} ${y.toFixed(1)}`
  }
  return d
}

function SectionHead({ n, label, title, note }: { n: string; label: string; title: string; note: string }) {
  return (
    <div className="sec-head">
      <div>
        <div className="eyebrow" data-r>{n} · {label}</div>
        <h2 className="h2" data-r style={{ ["--d" as string]: ".06s" }}>{title}</h2>
      </div>
      <p className="sec-note" data-r style={{ ["--d" as string]: ".12s" }}>{note}</p>
    </div>
  )
}

function Hero() {
  let c = 0
  const word = (w: string) => (
    <span className="ln" aria-hidden="true">
      {[...w].map((ch) => <span key={c} className="ch" style={{ animationDelay: `${0.25 + c++ * 0.045}s` }}>{ch}</span>)}
    </span>
  )
  return (
    <section className="hero" id="home">
      <h1 aria-label={me.name}>{word("Pranay")}{word("Joshi")}</h1>
      <p className="focus fade" style={{ ["--d" as string]: ".75s" }}>
        {me.focus.map((f, i) => <span key={f}>{i > 0 && <i aria-hidden>/</i>}{f}</span>)}
      </p>
      <p className="lede fade" style={{ ["--d" as string]: ".85s" }}>{me.line}</p>
      <div className="cta fade" style={{ ["--d" as string]: ".95s" }}>
        <a className="btn mark" href="#work">See the work <span>↓</span></a>
        <a className="btn" href={me.resume} {...ext}>Resume <span>↗</span></a>
        <a className="btn" href={me.x} {...ext}>{me.xHandle} <span>↗</span></a>
      </div>
      <div className="hero-stats fade" style={{ ["--d" as string]: "1.1s" }}>
        {stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <div className="xp">
      <span className="xp-line"><i /></span>
      {experience.map((x) => (
        <article className="xp-row" data-r key={`${x.company}-${x.period}`}>
          <span className={`xp-dot${x.current ? " now" : ""}`} />
          <div className="xp-when"><span>{x.period}</span>{x.location}{x.current && <em>Current</em>}</div>
          <div className="xp-who">
            <span className="logo"><img src={LOGO + x.logo} alt="" loading="lazy" /></span>
            <div>
              <h3>{x.company}</h3>
              <p>{x.title}</p>
              {x.subtitle && <small>{x.subtitle}</small>}
              <Tags items={x.stack} />
            </div>
          </div>
          <div className="xp-imp">
            {x.impacts.map(([a, h, m, d]) => (
              <div className="imp" key={h}><div className="top"><span>{a}</span>{m && <b>{m}</b>}</div><div><strong>{h}</strong>{d && <p>{d}</p>}</div></div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function About() {
  const [before, after] = research.authors.split(me.name)
  return (
    <div className="ab">
      <article className="ab-card ab-paper" data-r>
        <div className="lab">Publication · {research.venue}</div>
        <h3>{research.title}</h3>
        <p className="by">{before}<b>{me.name}</b>{after}</p>
        <svg className="signal" viewBox="0 0 800 64" preserveAspectRatio="none" aria-hidden="true"><path d={eegPath()} /></svg>
        <div className="foot"><Tags items={research.keywords} /><a className="btn mark" href={research.url} {...ext}>Read paper <span>↗</span></a></div>
      </article>
      <div className="ab-side">
        <article className="ab-card ab-edu" data-r style={{ ["--d" as string]: ".08s" }}>
          <div className="lab">Education · ’23 — ’27</div>
          <div className="who">
            <span className="logo"><img src={LOGO + "alabama.png"} alt="" loading="lazy" /></span>
            <div><h3>The University of Alabama</h3><p>B.S. Computer Science · Minor in Robotics</p></div>
            <span className="gpa-pill"><b>4.00</b>GPA</span>
          </div>
        </article>
        <a className="ab-card ab-foundry" data-r style={{ ["--d" as string]: ".14s" }} href="https://www.hbs.edu/foundry" {...ext}>
          <div className="lab">Entrepreneurship · Accepted</div>
          <div className="fd-row">
            <span className="plate"><img src={LOGO + "hbs-foundry.png"} alt="Harvard Business School Foundry" loading="lazy" /></span>
            <div><h3>Humans2Machines</h3><p>Harvard Business School Foundry</p></div>
            <span className="fd-go">↗</span>
          </div>
        </a>
      </div>
      <article className="ab-card ab-awards" data-r>
        <div className="lab">Achievements</div>
        <ol>{achievements.map(([a, b], i) => <li key={a}><i>{pad(i + 1)}</i><b>{a}</b><span>{b}</span></li>)}</ol>
      </article>
      <article className="ab-card ab-skills" data-r>
        <div className="lab">Stack</div>
        {skills.map((row, r) => (
          <div className="mq" key={r}>
            <div className="mq-track">{[...row, ...row, ...row, ...row].map((s, i) => <span key={i} aria-hidden={i >= row.length}>{s}</span>)}</div>
          </div>
        ))}
      </article>
    </div>
  )
}

function Contact() {
  // emails wrap at the @, not mid-word
  const brk = (v: string) => { const i = v.indexOf("@", 1); return i > 0 ? <>{v.slice(0, i)}<wbr />{v.slice(i)}</> : v }
  const card = (label: string, value: string, href: string) => (
    <a className="ct-card" href={href} key={label} {...(href.startsWith("http") ? ext : {})}>
      <span>{label}<i>↗</i></span><b>{brk(value)}</b>
    </a>
  )
  return (
    <div className="ct">
      <div className="eyebrow" data-r>04 · Contact</div>
      <h2 data-r style={{ ["--d" as string]: ".06s", marginTop: 18 }}>Let’s build something that moves.</h2>
      <div className="ct-grid" data-r style={{ ["--d" as string]: ".14s" }}>
        {card("Email", me.email, `mailto:${me.email}`)}
        {card("X", me.xHandle, me.x)}
        {card("LinkedIn", "in/pranay-joshi-", me.linkedin)}
        {card("GitHub", "github.com/pranayjoshi", me.github)}
        {card("University", me.uni, `mailto:${me.uni}`)}
      </div>
      <div className="foot-line">
        <span>© {new Date().getFullYear()} Pranay Joshi</span>
        <span>Jump with <kbd>1</kbd>–<kbd>5</kbd> · browse projects with <kbd>←</kbd> <kbd>→</kbd></span>
        <a href="#home">Back to top ↑</a>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <RobotScene />
      <SiteNav />
      <main>
        <Hero />
        <section className="sec" id="work">
          <SectionHead n="01" label="Work" title="Built, shipped, running." note={`${projects.length} projects · open any screen for the demo`} />
          <ProjectDeck />
        </section>
        <section className="sec" id="experience">
          <SectionHead n="02" label="Experience" title="Where I’ve shipped." note={`${experience.length} roles · 2021 — 2026`} />
          <Experience />
        </section>
        <section className="sec" id="about">
          <SectionHead n="03" label="About" title="Research, school, wins." note="CHI paper · Alabama CS · HBS Foundry" />
          <About />
        </section>
        <section className="sec" id="talk"><Contact /></section>
      </main>
      <DemoViewer />
      <PageEffects />
    </>
  )
}
