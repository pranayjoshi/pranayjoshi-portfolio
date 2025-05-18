"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 z-10 pt-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Software Developer
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            Hi, I'm <span className="gradient-text">Pranay Joshi</span>
          </h1>

          <p className="text-xl text-zinc-300">
            Building innovative
            solutions at the intersection of AI, web technologies, and human-computer interaction.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button 
              variant="outline" 
              className="border-zinc-700 hover:bg-zinc-800"
              onClick={() => {
                window.open('/resume.pdf', '_blank');
              }}
            >
              Download Resume
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-4 pt-6">
            <Link
              href="https://github.com/pranayjoshi/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/pranay-joshi-/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:pjoshi6@crimson.ua.edu"
              className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-12">
            <div className="terminal-header">
              <div className="terminal-header-dot bg-red-500"></div>
              <div className="terminal-header-dot bg-yellow-500"></div>
              <div className="terminal-header-dot bg-green-500"></div>
              <span className="text-xs text-zinc-400 ml-2">pranay@portfolio:~</span>
            </div>
            <div className="terminal-content">
              <p className="text-green-400">
                $ <span className="text-zinc-300">./welcome.sh</span>
              </p>
              <p className="text-zinc-300 mt-2">
              Hello, World! Welcome to my portfolio—dive in to explore my professional journey, technical expertise, publications, and projects.
              </p>
              {/* <p className="text-zinc-300 mt-1"></p> */}
              <p className="text-green-400 mt-2">
                $ <span className="text-zinc-300 animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
