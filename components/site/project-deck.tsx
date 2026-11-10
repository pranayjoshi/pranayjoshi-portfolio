"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { pad, projects } from "@/lib/portfolio"
import { ProjectActions, ProjectFrame, Tags } from "./project-frame"

const n = projects.length
const wrap = (d: number) => (d > n / 2 ? d - n : d < -n / 2 ? d + n : d)

/**
 * 3D carousel: the centre card is the highlight, its neighbours fan out behind it,
 * and a filmstrip jumps to any project. Auto-advances until the visitor takes over.
 */
export default function ProjectDeck() {
  const [cur, setCur] = useState(0)
  const [auto, setAuto] = useState(true)
  const deckRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const visible = useRef(false)
  const hovering = useRef(false)
  const curRef = useRef(0)
  curRef.current = cur

  const select = useCallback((i: number, user = false) => {
    if (user) setAuto(false)
    setCur(((i % n) + n) % n)
  }, [])

  // only the centre card's clip runs, and only while on screen with no demo open
  const syncClips = useCallback(() => {
    cardRefs.current.forEach((c, j) => {
      const v = c?.querySelector<HTMLVideoElement>("video.clip")
      if (!v) return
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
      if (j === curRef.current && visible.current && !reduce && !document.body.classList.contains("modal-open")) v.play().catch(() => {})
      else v.pause()
    })
  }, [])

  useEffect(() => {
    syncClips()
    const t = stripRef.current?.children[cur] as HTMLElement | undefined
    const strip = stripRef.current
    if (t && strip) strip.scrollTo({ left: t.offsetLeft - strip.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" })
  }, [cur, syncClips])

  // auto-advance; video projects get longer so the clip can play
  const dwell = projects[cur].clip ? 16000 : 7000
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // time only counts while the carousel is on screen and not being hovered
    let elapsed = 0
    const id = setInterval(() => {
      if (!visible.current || hovering.current) return
      elapsed += 250
      if (elapsed >= dwell) select(curRef.current + 1)
    }, 250)
    return () => clearInterval(id)
  }, [auto, cur, dwell, select])

  useEffect(() => {
    const deck = deckRef.current!
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; syncClips() }, { threshold: 0.4 })
    io.observe(deck)
    const onKey = (e: KeyboardEvent) => {
      if (!visible.current || document.body.classList.contains("modal-open") || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "ArrowRight") { select(curRef.current + 1, true); e.preventDefault() }
      if (e.key === "ArrowLeft") { select(curRef.current - 1, true); e.preventDefault() }
    }
    addEventListener("keydown", onKey)
    addEventListener("demo:toggle", syncClips)
    return () => { io.disconnect(); removeEventListener("keydown", onKey); removeEventListener("demo:toggle", syncClips) }
  }, [select, syncClips])

  // drag / swipe and horizontal trackpad swipes on the stage
  const x0 = useRef<number | null>(null)
  const dragged = useRef(false)
  const wheel = useRef({ acc: 0, until: 0 })
  useEffect(() => {
    const stage = deckRef.current!.querySelector<HTMLDivElement>(".deck-stage")!
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      const w = wheel.current
      if (performance.now() < w.until) return
      w.acc += e.deltaX
      if (Math.abs(w.acc) > 60) { select(curRef.current + Math.sign(w.acc), true); w.acc = 0; w.until = performance.now() + 450 }
    }
    stage.addEventListener("wheel", onWheel, { passive: false })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [select])

  const p = projects[cur]

  return (
    <div
      ref={deckRef}
      className={`deck${auto ? " auto" : ""}`}
      style={{ ["--dwell" as string]: `${dwell}ms` }}
      aria-roledescription="carousel"
      aria-label="Projects"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <div
        className="deck-stage"
        onPointerDown={(e) => { x0.current = e.clientX; dragged.current = false }}
        onPointerUp={(e) => {
          if (x0.current === null) return
          const dx = e.clientX - x0.current
          x0.current = null
          if (Math.abs(dx) > 50) { dragged.current = true; select(curRef.current + (dx < 0 ? 1 : -1), true) }
        }}
        onClickCapture={(e) => { if (dragged.current) { e.stopPropagation(); dragged.current = false } }}
      >
        {projects.map((proj, j) => {
          const d = wrap(j - cur), a = Math.abs(d)
          return (
            <div
              key={proj.id}
              ref={(el) => { cardRefs.current[j] = el }}
              className={`deck-card${d === 0 ? " on" : ""}${a > 2 ? " far" : ""}`}
              style={{ ["--d" as string]: d, ["--a" as string]: a, zIndex: 20 - a }}
              role="group"
              aria-label={`${j + 1} of ${n}: ${proj.title}`}
              {...(d === 0 ? { "data-open": j } : {})}
              onClick={(e) => { if (d !== 0) { e.stopPropagation(); select(j, true) } }}
            >
              <ProjectFrame p={proj} />
              <span className="p-cue">▸ {proj.live ? "Run live demo" : proj.clip ? "Watch with sound" : "Open project"}</span>
            </div>
          )
        })}
      </div>

      <div className="deck-row">
        <div className="deck-info" aria-live="polite" key={p.id}>
          <div>
            <div className="num">{pad(cur + 1)} · {p.domain}<b>{p.role}</b></div>
            <h3>{p.title}</h3>
            <p>{p.line}</p>
            <Tags items={p.tags} />
          </div>
          <ProjectActions p={p} index={cur} />
        </div>
        <div className="deck-ctrl">
          <button className="deck-btn" aria-label="Previous project" onClick={() => select(cur - 1, true)}>←</button>
          <span className="deck-count"><b>{pad(cur + 1)}</b> / {pad(n)}</span>
          <button className="deck-btn" aria-label="Next project" onClick={() => select(cur + 1, true)}>→</button>
        </div>
      </div>

      <div className="deck-strip" ref={stripRef}>
        {projects.map((proj, j) => (
          <button key={proj.id} className={`thumb${j === cur ? " on" : ""}`} aria-label={`Show ${proj.title}`} aria-current={j === cur} onClick={() => select(j, true)}>
            <span className="ti"><img src={`/projects/${proj.img}`} alt="" loading="lazy" style={proj.pos ? { objectPosition: proj.pos } : undefined} /></span>
            <span className="tt"><b>{pad(j + 1)}</b>{proj.title}</span>
            <i className="tbar" key={`${cur}-${auto}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
