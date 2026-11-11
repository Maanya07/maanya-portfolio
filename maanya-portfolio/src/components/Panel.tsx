import type { ReactNode } from 'react'

interface PanelProps {
  id?: string
  /** Text on the blue header tile */
  label: string
  /** Render the label as the section's h2 (default) or as plain text */
  labelIsHeading?: boolean
  meta?: ReactNode
  children: ReactNode
  className?: string
  /** Frame color: deep blue (default) or golden yellow */
  tone?: 'blue' | 'yellow'
}

/** Layered display frame: colored outer plate, slightly lighter inner plate, paper-white board. */
export function Panel({ id, label, labelIsHeading = true, meta, children, className = '', tone = 'blue' }: PanelProps) {
  const headingId = id ? `${id}-title` : undefined
  const Label = labelIsHeading ? 'h2' : 'p'
  return (
    <section id={id} className={`panel panel--${tone} ${className}`} aria-labelledby={labelIsHeading ? headingId : undefined}>
      <div className="panel__inner">
        <header className="panel__bar">
          <Label id={headingId} className="panel__tag">
            {label}
          </Label>
          {meta && <div className="panel__meta">{meta}</div>}
        </header>
        <div className="panel__board">{children}</div>
      </div>
    </section>
  )
}
