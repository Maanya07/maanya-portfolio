import { experience } from '../data/profile'
import { SceneArt } from './bricks/scenes'
import { Panel } from './Panel'

export function Experience() {
  return (
    <Panel id="experience" label="Experience" meta={<span>{experience.length} roles</span>}>
      <ol className="roles">
        {experience.map((role, i) => (
          <li key={role.company} className="role">
            <div className="role__icon">
              <SceneArt scene={role.icon} label={role.iconLabel} />
            </div>
            <div className="role__body">
              <div className="role__head">
                <h3>{role.company}</h3>
                <span className="role__step" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <dl className="role__rows">
                <div>
                  <dt>Role</dt>
                  <dd>{role.title}</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>{role.dates}</dd>
                </div>
                <div>
                  <dt>Place</dt>
                  <dd>{role.location}</dd>
                </div>
              </dl>
              <ul className="role__points">
                {role.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  )
}
