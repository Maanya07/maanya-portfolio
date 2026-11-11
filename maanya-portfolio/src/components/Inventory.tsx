import { inventory } from '../data/profile'
import { Panel } from './Panel'

export function Inventory() {
  return (
    <Panel id="skills" label="Parts inventory" meta={<span>Skills · coursework · campus</span>}>
      <div className="inventory">
        {inventory.map((group) => (
          <section key={group.title} className="callout" aria-label={group.title}>
            <h3 className="callout__title">
              <span className={`swatch swatch--${group.color}`} aria-hidden="true" />
              {group.title}
            </h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Panel>
  )
}
