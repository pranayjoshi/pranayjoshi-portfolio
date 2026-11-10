"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { pad, projects } from "@/lib/portfolio"
import { ProjectActions, ProjectFrame, Tags } from "./project-frame"

/**
 * Full-size project viewer. Anything on the page with data-open="<index>" opens it.
 * Demo clips play with sound; sites that allow embedding run live in place.
 */
export default function DemoViewer() {
  const [open, setOpen] = useState<number | null>(null)
  const [live, setLive] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<Element | null>(null)

  const show = useCallback((i: number) => { setOpen(((i % projects.length) + projects.length) % projects.length); setLive(false) }, [])
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element
      const opener = t.closest("[data-open]")
      if (!opener || t.closest("a") || t.closest(".demo")) return
      lastFocus.current = document.activeElement
      show(Number((opener as HTMLElement).dataset.open))
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [show])

  useEffect(() => {
    const isOpen = open !== null
    document.body.classList.toggle("modal-open", isOpen)
    dispatchEvent(new Event("demo:toggle"))
    if (!isOpen) { (lastFocus.current as HTMLElement | null)?.focus?.(); return }
    closeRef.current?.focus()
    const v = mediaRef.current?.querySelector("video")
    v?.play().catch(() => { v.muted = true; v.play().catch(() => {}) })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") show(open + 1)
      if (e.key === "ArrowLeft") show(open - 1)
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [open, close, show])

  const p = open !== null ? projects[open] : null

  return (
    <div className={`demo${p ? " on" : ""}`} aria-hidden={!p}>
      <div className="demo-back" onClick={close} />
      <div className="demo-box" role="dialog" aria-modal="true" aria-label={p ? `${p.title} demo` : "Project demo"}>
        {p && (
          <>
            <div className="demo-media" ref={mediaRef}>
              <div key={p.id}>
                <ProjectFrame p={p} full>
                  {p.live && !live && <button className="run" onClick={() => setLive(true)}>▸ Run live demo</button>}
                  {p.live && live && (
                    <iframe src={p.url} title={`${p.title} live demo`} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                  )}
                </ProjectFrame>
              </div>
            </div>
            <aside className="demo-side" key={`side-${p.id}`}>
              <div className="k">{pad(open! + 1)} / {pad(projects.length)} · {p.domain}</div>
              <h3>{p.title}</h3>
              <div className="role">{p.role}</div>
              <p className="lead">{p.line}</p>
              <p className="more">{p.desc}</p>
              <Tags items={p.tags} />
              <ProjectActions p={p} />
              <div className="demo-nav">
                <button onClick={() => show(open! - 1)}>← Prev</button>
                <button onClick={() => show(open! + 1)}>Next →</button>
              </div>
            </aside>
          </>
        )}
        <button ref={closeRef} className="demo-x" onClick={close} aria-label="Close">✕</button>
      </div>
    </div>
  )
}
