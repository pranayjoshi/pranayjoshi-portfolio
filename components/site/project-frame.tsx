import type { ReactNode } from "react"
import type { Project } from "@/lib/portfolio"
import { host } from "@/lib/portfolio"

const IMG = "/projects/"

/** Screenshot (or demo clip) inside a browser, video or phone frame. */
export function ProjectFrame({ p, full = false, children }: { p: Project; full?: boolean; children?: ReactNode }) {
  const img = <img src={IMG + p.img} alt={`${p.title} screenshot`} style={p.pos ? { objectPosition: p.pos } : undefined} loading="lazy" />
  const clip = p.clip ? (
    <video
      className="clip"
      src={IMG + p.clip}
      poster={IMG + p.img}
      playsInline
      loop
      muted={!full}
      controls={full}
      preload={full ? "auto" : "none"}
      aria-label={`${p.title} demo video`}
    />
  ) : null

  if (p.kind === "video")
    return (
      <div className="frame-b is-video">
        <div className="bar"><i /><i /><i /><span className="url">Demo video · {p.title}</span>{p.clip && <span className="live">Video</span>}</div>
        <div className="view">{clip ?? img}{!full && <span className="play" aria-hidden="true" />}{children}</div>
      </div>
    )
  if (p.kind === "phone")
    return (
      <div className="frame-b is-phone">
        <div className="view"><span className="os">iOS app</span><div className="phone">{img}</div>{children}</div>
      </div>
    )
  return (
    <div className="frame-b">
      <div className="bar"><i /><i /><i /><span className="url">{host(p)}</span>{p.live && <span className="live">Live</span>}</div>
      <div className="view">{img}{children}</div>
    </div>
  )
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const

/** Open / video / site / code buttons for a project. `index` adds the Open button that launches the demo viewer. */
export function ProjectActions({ p, index }: { p: Project; index?: number }) {
  return (
    <div className="acts">
      {index !== undefined && (
        <button className="btn mark" data-open={index}>{p.live ? "Live demo" : "Open"} <span>▸</span></button>
      )}
      {p.video && <a className="btn" href={p.video} {...ext}>{p.clip ? "Post on X" : "Watch demo"} <span>↗</span></a>}
      {p.url && <a className="btn" href={p.url} {...ext}>Visit site <span>↗</span></a>}
      {p.gh && <a className="btn" href={p.gh} {...ext}>Code <span>↗</span></a>}
    </div>
  )
}

export function Tags({ items }: { items: string[] }) {
  return <div className="tags">{items.map((t) => <span key={t} className="tag">{t}</span>)}</div>
}
