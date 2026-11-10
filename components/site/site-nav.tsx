"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { me } from "@/lib/portfolio"

export const SECTIONS: [string, string][] = [["home", "Home"], ["work", "Work"], ["experience", "Experience"], ["about", "About"], ["talk", "Contact"]]

export default function SiteNav() {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const links = useRef<(HTMLAnchorElement | null)[]>([])
  const pill = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const secs = SECTIONS.map(([id]) => document.getElementById(id))
    let raf = 0
    const update = () => {
      raf = 0
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
      if (bar.current) bar.current.style.transform = `scaleX(${scrollY / max})`
      let cur = 0
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= innerHeight * 0.45) cur = i })
      setActive(cur)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", onScroll)
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const a = links.current[active]
    if (a && pill.current) { pill.current.style.width = `${a.offsetWidth}px`; pill.current.style.transform = `translateX(${a.offsetLeft}px)` }
  }, [active, mounted])

  const dark = resolvedTheme !== "light"

  return (
    <>
      <div className="progress" ref={bar} />
      <header className="nav">
        <nav className="links" aria-label="Sections">
          <span className="pill" ref={pill} />
          {SECTIONS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} ref={(el) => { links.current[i] = el }} className={i === active ? "on" : undefined} aria-current={i === active ? "true" : undefined}>{label}</a>
          ))}
        </nav>
        <a className="cv" href={me.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        <button
          className="theme-btn"
          onClick={() => setTheme(dark ? "light" : "dark")}
          aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} mode` : "Switch theme"}
        >
          {mounted ? (dark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />) : <span style={{ width: 16 }} />}
        </button>
      </header>
    </>
  )
}
