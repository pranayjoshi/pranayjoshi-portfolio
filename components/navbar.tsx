"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Code, Menu, X, User, Briefcase, GraduationCap, Award, BookOpen } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Projects", href: "#projects", icon: <Code className="h-4 w-4" /> },
    { name: "Publications", href: "#publications", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Skills", href: "#skills", icon: <Award className="h-4 w-4" /> },
    { name: "Contact", href: "#contact", icon: <GraduationCap className="h-4 w-4" /> },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Pranay Joshi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button className="ml-2 bg-purple-600 hover:bg-purple-700" onClick={() => {
                window.open('/resume.pdf', '_blank');
              }}>Resume</Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-zinc-950/95 z-40 transition-all duration-300 flex flex-col pt-16",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900/50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700" 
            onClick={() => {
                window.open('/resume.pdf', '_blank');
              }}>Resume</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
