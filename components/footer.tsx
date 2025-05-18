import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} Pranay Joshi. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/pranayjoshi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/pranay-joshi-/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="mailto:pjoshi6@crimson.ua.edu" className="text-zinc-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
