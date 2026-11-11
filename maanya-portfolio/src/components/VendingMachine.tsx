import { useState, type CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { PALETTE } from './bricks/palette'
import './VendingMachine.css'

interface VendingMachineProps {
  projects: Project[]
  selectedId: string
  onSelect: (id: string) => void
}

const boxVars = (p: Project) => {
  const c = PALETTE[p.boxColor]
  return { '--box': c.base, '--box-dark': c.dark, '--box-ink': c.ink } as CSSProperties
}

export function VendingMachine({ projects, selectedId, onSelect }: VendingMachineProps) {
  // Bumped on every press so the drop replays, even for the same slot. 0 = page just loaded.
  const [drops, setDrops] = useState(0)
  const selected = projects.find((p) => p.id === selectedId)

  function press(id: string) {
    setDrops((n) => n + 1)
    onSelect(id)
  }

  return (
    <div className="vm">
      <div className="vm__roof studs">
        <span className="vm__marquee">Kit-O-Matic</span>
        <span className="vm__sub">Press a slot · get a kit</span>
      </div>

      <div className="vm__frame">
        <div className="vm__window">
          <ul className="vm__slots" aria-label="Project slots">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="vm-slot"
                  aria-pressed={p.id === selectedId}
                  onClick={() => press(p.id)}
                  style={boxVars(p)}
                >
                  <span className="vm-slot__key">{p.slot}</span>
                  <span className="vm-slot__box" aria-hidden="true" />
                  <span className="vm-slot__text">
                    <span className="vm-slot__name">{p.shortName ?? p.name}</span>
                    {p.status === 'draft' && <span className="vm-slot__status">In the workshop</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="vm__panel" aria-hidden="true">
          <div className="vm__display">{selected?.slot ?? '--'}</div>
          <div className="vm__coin">
            <span />
          </div>
          <div className="vm__grille" />
        </div>

        <div className="vm__chute">
          <p className="visually-hidden" aria-live="polite">
            {drops > 0 && selected ? `${selected.name} kit dispensed.` : ''}
          </p>
          {selected && (
            <span
              key={drops}
              className={`vm__kitbox${drops > 0 ? ' is-dropping' : ''}`}
              style={boxVars(selected)}
              aria-hidden="true"
            >
              {selected.slot}
            </span>
          )}
        </div>
      </div>

      <div className="vm__base" aria-hidden="true" />
    </div>
  )
}
