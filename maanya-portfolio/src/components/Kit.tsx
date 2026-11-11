import type { CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { PALETTE } from './bricks/palette'
import { SceneArt } from './bricks/scenes'
import { Booklet } from './Booklet'
import { Missing } from './Missing'
import './Kit.css'

interface KitProps {
  project: Project
  /** play the reveal animation (only after a slot is pressed) */
  animate: boolean
}

export function Kit({ project, animate }: KitProps) {
  const c = PALETTE[project.boxColor]
  const boxStyle = { '--box': c.base, '--box-dark': c.dark, '--box-ink': c.ink } as CSSProperties
  const headingId = `kit-${project.id}`
  const ready = project.status === 'ready'

  return (
    <article className={`kit${animate ? ' kit--animate' : ''}`} aria-labelledby={headingId}>
      <div className="kit__top">
        <figure className="boxart" style={boxStyle}>
          <div className="boxart__band">
            <span className="boxart__code">{project.slot}</span>
            <span className="boxart__name">{project.name}</span>
          </div>
          <div className="boxart__stage">
            <SceneArt scene={project.scene} label={project.sceneLabel} />
          </div>
          <figcaption className="boxart__foot">
            <span>{project.period ?? 'In the workshop'}</span>
            <span>{ready ? `${project.tech.length} parts` : 'Kit in progress'}</span>
          </figcaption>
        </figure>

        <div className="kit__info">
          <p className="kit__kicker">Kit {project.slot}{project.location ? ` · ${project.location}` : ''}</p>
          <h3 id={headingId} className="kit__name">{project.name}</h3>
          {project.subtitle && <p className="kit__subtitle">{project.subtitle}</p>}

          {project.summary ? (
            <p className="kit__summary">{project.summary}</p>
          ) : (
            <Missing note={project.missing ?? 'Summary'} fallback="This kit is still on the workbench. Details coming soon." />
          )}

          {project.tech.length > 0 && (
            <div className="callout callout--tight">
              <p className="callout__title">Parts used</p>
              <ul className="chips">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {project.links.length > 0 && (
            <ul className="kit__links">
              {project.links.map((l) => (
                <li key={l.label}>
                  {l.url ? (
                    <a className="brick-btn brick-btn--sm brick-btn--blue" href={l.url} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ) : (
                    <span className="kit__soon">{l.label}: link coming soon</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {ready && project.booklet.length > 0 && (
        <Booklet key={project.id} title={project.name} pages={project.booklet} />
      )}
    </article>
  )
}
