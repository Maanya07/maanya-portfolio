import { useState } from 'react'
import type { Project } from '../data/projects'
import './VendingMachine.css'

interface VendingMachineProps {
  projects: Project[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function VendingMachine({ projects, selectedId, onSelect }: VendingMachineProps) {
  // Bumped on every press so the drop animation replays even on the same slot.
  const [dropCount, setDropCount] = useState(0)
  const selected = projects.find((p) => p.id === selectedId) ?? null

  function press(id: string) {
    setDropCount((n) => n + 1)
    onSelect(id)
  }

  return (
    <div className="machine">
      <div className="machine__marquee">
        <span className="machine__brand">Kit-O-Matic</span>
        <span className="machine__sub">Brick-built project kits · 1¢</span>
      </div>

      <div className="machine__body">
        <div className="machine__window">
          <ul className="machine__slots" aria-label="Project kits">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="slot"
                  aria-pressed={p.id === selectedId}
                  onClick={() => press(p.id)}
                >
                  <span className="slot__box" style={{ background: p.boxColor }} aria-hidden="true">
                    <span className="slot__stud" />
                    <span className="slot__stud" />
                  </span>
                  <span className="slot__plate">
                    <span className="slot__code">{p.slot}</span>
                    <span className="slot__name">{p.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="machine__panel" aria-hidden="true">
          <div className="machine__display">{selected ? selected.slot : '--'}</div>
          <div className="machine__coin" />
        </div>
      </div>

      <div className="machine__tray">
        <div className="machine__flap" />
        <p className="visually-hidden" aria-live="polite">
          {selected ? `${selected.name} kit dispensed.` : ''}
        </p>
        {selected && (
          <span
            key={dropCount}
            className="tray-box"
            style={{ background: selected.boxColor }}
            aria-hidden="true"
          >
            {selected.slot}
          </span>
        )}
        {!selected && <span className="machine__hint">Pick a slot</span>}
      </div>
    </div>
  )
}
