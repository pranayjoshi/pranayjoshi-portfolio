import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, Users, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PublicationCardProps {
  title: string
  authors: string[]
  venue: string
  date: string
  doi: string
  url: string
  abstract?: string
  keywords?: string[]
}

export default function PublicationCard({
  title,
  authors,
  venue,
  date,
  doi,
  url,
  abstract,
  keywords,
}: PublicationCardProps) {
  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border overflow-hidden">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold gradient-text">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span>{date}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <FileText className="h-6 w-6 text-purple-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-purple-400 mt-1" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-zinc-300">Authors</h4>
              <p className="text-sm text-zinc-400">{authors.join(", ")}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-purple-400 mt-1" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-zinc-300">Published In</h4>
              <p className="text-sm text-zinc-400">{venue}</p>
            </div>
          </div>

          {abstract && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Abstract</h4>
              <div className="relative">
                <div className="terminal-content max-h-32 overflow-y-auto">
                  <p className="text-zinc-400 text-sm">{abstract}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent"></div>
              </div>
            </div>
          )}

          {keywords && keywords.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-4">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Publication
              </Link>
            </Button>
            <div className="flex items-center text-xs text-zinc-400">
              <span className="font-mono">DOI: {doi}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
