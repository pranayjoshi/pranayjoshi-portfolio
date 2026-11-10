"use client"

import { useEffect } from "react"
import { SECTIONS } from "./site-nav"

/** Scroll reveals, the experience timeline fill, video play state and 1–5 section keys. */
export default function PageEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    document.querySelectorAll("[data-r]").forEach((el) => io.observe(el))

    const xp = document.querySelector<HTMLElement>(".xp")
    const fill = document.querySelector<HTMLElement>(".xp-line i")
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (!xp || !fill) return
        const b = xp.getBoundingClientRect()
        fill.style.setProperty("--p", String(Math.max(0, Math.min(1, (innerHeight * 0.6 - b.top) / b.height))))
      })
    }
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })

    const onPlay = (e: Event) => (e.target as Element).closest?.(".frame-b")?.classList.add("playing")
    const onPause = (e: Event) => (e.target as Element).closest?.(".frame-b")?.classList.remove("playing")
    document.addEventListener("play", onPlay, true)
    document.addEventListener("pause", onPause, true)

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || document.body.classList.contains("modal-open")) return
      if ((e.target as Element)?.closest?.("input, textarea")) return
      const n = Number(e.key)
      if (n >= 1 && n <= SECTIONS.length) document.getElementById(SECTIONS[n - 1][0])?.scrollIntoView({ behavior: "smooth" })
    }
    addEventListener("keydown", onKey)

    return () => {
      io.disconnect()
      removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      document.removeEventListener("play", onPlay, true)
      document.removeEventListener("pause", onPause, true)
      removeEventListener("keydown", onKey)
    }
  }, [])
  return null
}
