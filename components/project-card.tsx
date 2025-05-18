import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  role?: string
  period?: string
  location?: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export default function ProjectCard({
  title,
  role,
  period,
  location,
  description,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border h-full flex flex-col">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-semibold gradient-text">{title}</h3>
          {period && (
            <Badge variant="outline" className="mt-1 md:mt-0 w-fit bg-zinc-800/50">
              {period}
            </Badge>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-zinc-400 mb-4">
          {role && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{role}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <p className="text-zinc-300 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {githubUrl && (
          <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>
        )}

        {liveUrl && (
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}
