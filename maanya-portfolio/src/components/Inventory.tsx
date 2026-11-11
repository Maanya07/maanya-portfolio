import { useState } from 'react'
import { inventory } from '../data/profile'
import { projects } from '../data/projects'
import { Panel } from './Panel'
import './Inventory.css'

interface InventoryProps {
  onOpenProject: (id: string) => void
}

const relatedTags: Partial<Record<string, string[]>> = {
  sql: ['postgresql'],
}

function matchingKits(part: string) {
  const tag = part.toLowerCase()
  const tags = [tag, ...(relatedTags[tag] ?? [])]
  return projects.filter((project) => project.tech.some((tool) => tags.includes(tool.toLowerCase())))
}

export function Inventory({ onOpenProject }: InventoryProps) {
  const [selected, setSelected] = useState<{ group: string; part: string } | null>(null)

  return (
    <Panel id="skills" label="Parts inventory" meta={<span>Skills · coursework · campus</span>}>
      <p className="inventory__hint">Pick a linked part to see which project kits use it.</p>
      <div className="inventory">
        {inventory.map((group, index) => {
          const activePart = selected?.group === group.title ? selected.part : null
          const detailsId = `part-kits-${index}`

          return (
            <section key={group.title} className="callout" aria-label={group.title}>
              <h3 className="callout__title">
                <span className={`swatch swatch--${group.color}`} aria-hidden="true" />
                {group.title}
              </h3>
              <ul className="chips inventory__chips">
                {group.items.map((item) => (
                  <li key={item}>
                    {matchingKits(item).length > 0 ? (
                      <button
                        type="button"
                        className="inventory__part"
                        aria-expanded={activePart === item}
                        aria-controls={detailsId}
                        onClick={() => setSelected(activePart === item ? null : { group: group.title, part: item })}
                      >
                        {item}
                      </button>
                    ) : item}
                  </li>
                ))}
              </ul>
              <div id={detailsId} className="inventory__kits" hidden={!activePart}>
                {activePart && (
                  <>
                    <p>Project kits for <strong>{activePart}</strong></p>
                    <ul>
                      {matchingKits(activePart).map((kit) => (
                        <li key={kit.id}>
                          <button type="button" className="inventory__kit" onClick={() => onOpenProject(kit.id)}>
                            {kit.name} <span aria-hidden="true">↑</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </Panel>
  )
}
