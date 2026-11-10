"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { createRobotScene } from "./scene"

/** Fixed full-screen robot cell behind the page, with a small joint readout. */
export default function RobotScene() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const q0 = useRef<HTMLElement>(null), q1 = useRef<HTMLElement>(null), q2 = useRef<HTMLElement>(null)
  const grip = useRef<HTMLElement>(null), state = useRef<HTMLElement>(null)
  const api = useRef<ReturnType<typeof createRobotScene> | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // next-themes has already put the theme class on <html> before hydration
    const dark = !document.documentElement.classList.contains("light")
    let scene: ReturnType<typeof createRobotScene> | null = null
    try {
      scene = createRobotScene(canvas.current!, { q: [q0.current, q1.current, q2.current], grip: grip.current, state: state.current }, dark)
    } catch {
      document.documentElement.classList.add("no-webgl") // the page still works without the scene
    }
    api.current = scene
    return () => { scene?.dispose(); api.current = null }
  }, [])

  useEffect(() => {
    if (resolvedTheme) api.current?.setDark(resolvedTheme !== "light")
  }, [resolvedTheme])

  return (
    <>
      <canvas id="scene" ref={canvas} aria-hidden="true" />
      <div className="hud hud-tr" aria-hidden="true">
        arm <b ref={state}>homing</b><br />
        q0 <b ref={q0}>0.0°</b><br />q1 <b ref={q1}>0.0°</b><br />q2 <b ref={q2}>0.0°</b><br />
        grip <b ref={grip}>open</b>
      </div>
      <div className="hud hud-bl" aria-hidden="true">The arm follows your cursor · click to grip</div>
    </>
  )
}
