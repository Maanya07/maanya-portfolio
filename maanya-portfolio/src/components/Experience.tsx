import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { experience, profile } from '../data/profile'
import { Brick } from './bricks/Brick'
import { Minifig, type MinifigSlot } from './Minifig'
import { Panel } from './Panel'
import { PIECES, type PieceKey } from './station/pieces'
import './station/Station.css'

/** A part drawn by itself, for its tray compartment. */
function PieceIcon({ piece }: { piece: PieceKey }) {
  const p = PIECES[piece]
  return (
    <svg className="part__icon" viewBox={p.trayBox} aria-hidden="true">
      {p.art}
    </svg>
  )
}

/**
 * Experience as a minifigure station: every role is an accessory in the tray.
 * Two separate actions per role:
 *   - selecting the role shows its details (it never changes the figure)
 *   - its Add / Remove button attaches or removes only that role's accessory
 * The figure starts plain. The tray lists every role, organization, and date, so nothing is hidden behind the build.
 */
export function Experience() {
  const [selected, setSelected] = useState(0)
  const [attached, setAttached] = useState<ReadonlySet<number>>(() => new Set())
  // bumps on every pick so the detail card fades in; 0 = page just loaded, no animation
  const [picks, setPicks] = useState(0)
  const selectButtons = useRef<(HTMLButtonElement | null)[]>([])
  const detailId = useId()
  const role = experience[selected]

  function pick(i: number) {
    setSelected(i)
    setPicks((n) => n + 1)
  }

  function toggleAttached(i: number) {
    setAttached((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  // Arrow keys move between roles in the tray; Tab still reaches every button.
  function onKey(e: KeyboardEvent, i: number) {
    const last = experience.length - 1
    const next =
      e.key === 'ArrowDown' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    pick(next)
    selectButtons.current[next]?.focus()
  }

  // Only attached parts are drawn. Each one snaps in when it mounts (i.e. when it's added),
  // and the selected role's part, if attached, gets a soft highlight.
  const accessories: Partial<Record<MinifigSlot, ReactNode>> = {}
  experience.forEach((r, i) => {
    if (!attached.has(i)) return
    const def = PIECES[r.piece]
    accessories[def.slot] = (
      <g transform={def.place}>
        <g data-piece={r.piece} className={`piece piece--snap${i === selected ? ' piece--active' : ''}`}>
          {def.art}
        </g>
      </g>
    )
  })

  const attachedNames = experience.filter((_, i) => attached.has(i)).map((r) => r.pieceName.toLowerCase())
  const figLabel = attachedNames.length
    ? `Minifigure of ${profile.name} wearing: ${attachedNames.join(', ')}`
    : `Minifigure of ${profile.name} with no accessories`

  return (
    <Panel id="experience" label="Experience" meta={<span>Minifigure station · {experience.length} parts</span>}>
      <p className="station__intro">
        Each role comes with an accessory. Pick a role to read about it, and use Add to put its piece on the figure.
      </p>

      <div className="station">
        <div className="tray">
          <p className="tray__label" id={`${detailId}-tray`}>
            Parts tray
          </p>
          <ul className="tray__parts" aria-labelledby={`${detailId}-tray`}>
            {experience.map((r, i) => {
              const isSelected = i === selected
              const isOn = attached.has(i)
              return (
                <li key={r.company} className={`part${isSelected ? ' part--selected' : ''}`}>
                  <button
                    ref={(el) => {
                      selectButtons.current[i] = el
                    }}
                    type="button"
                    className="part__select"
                    aria-pressed={isSelected}
                    aria-controls={detailId}
                    onClick={() => pick(i)}
                    onKeyDown={(e) => onKey(e, i)}
                  >
                    <span className="part__well">
                      <PieceIcon piece={r.piece} />
                    </span>
                    <span className="part__text">
                      <span className="part__piece">
                        {r.pieceName}
                        {isSelected && <span className="part__status part__status--on">Selected</span>}
                        {isOn && <span className="part__status">On the figure</span>}
                      </span>
                      <span className="part__title">{r.title}</span>
                      <span className="part__org">{r.company}</span>
                      <span className="part__dates">{r.dates}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`part__action brick-btn brick-btn--sm ${isOn ? 'brick-btn--paper' : 'brick-btn--red'}`}
                    aria-label={`${isOn ? 'Remove' : 'Add'} ${r.pieceName.toLowerCase()} (${r.title}, ${r.company})`}
                    onClick={() => toggleAttached(i)}
                  >
                    {isOn ? 'Remove' : 'Add'}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <figure className="station__stage">
          <figcaption className="stage__head">
            <span className="stage__label">Assembly platform</span>
            <span className="stage__count" aria-live="polite">
              {attached.size} of {experience.length} attached
            </span>
          </figcaption>
          <Minifig className="stage__fig" {...profile.minifig} accessories={accessories} label={figLabel} />
          <svg className="stage__base" viewBox="0 -6 160 22" aria-hidden="true">
            <Brick x={0} y={1} w={8} h={1} c="yellow" />
            <Brick x={1} y={0} w={6} h={1} c="blue" />
          </svg>
        </figure>

        <article id={detailId} className="station__detail" aria-live="polite" aria-labelledby={`${detailId}-title`}>
          <div key={selected} className={picks > 0 ? 'detail__body detail__body--swap' : 'detail__body'}>
            <p className="detail__kicker">
              Part {String(selected + 1).padStart(2, '0')} · {role.pieceName}
            </p>
            <h3 id={`${detailId}-title`} className="detail__title">
              {role.title}
            </h3>
            <p className="detail__org">{role.company}</p>
            <dl className="detail__rows">
              <div>
                <dt>Dates</dt>
                <dd>{role.dates}</dd>
              </div>
              <div>
                <dt>Place</dt>
                <dd>{role.location}</dd>
              </div>
            </dl>
            <ul className="detail__points">
              {role.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </Panel>
  )
}
