import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

export default function ExperienceCard({ title, company, location, period, description }: ExperienceCardProps) {
  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border relative overflow-hidden">
      <div className="experience-line"></div>

      <div className="pl-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-semibold gradient-text">{title}</h3>
          <Badge variant="outline" className="mt-1 md:mt-0 w-fit bg-zinc-800/50">
            {period}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-zinc-400 mb-4">
          <div className="flex items-center gap-1">
            <span className="font-medium">{company}</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>

        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-zinc-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
