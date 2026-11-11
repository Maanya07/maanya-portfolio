import { profile } from '../data/profile'
import { Brick } from './bricks/Brick'
import { Minifig } from './Minifig'
import { Panel } from './Panel'

const { education: edu, links } = profile

const rows = [
  { label: 'School', value: edu.school },
  { label: 'Degree', value: edu.degree },
  { label: 'Minor', value: edu.minor },
  { label: 'Graduation', value: edu.graduation },
  { label: 'Location', value: edu.location },
]

const linkBricks = [
  { label: 'Résumé', detail: 'PDF', href: links.resume, glyph: '▤', color: 'red', external: true },
  { label: 'GitHub', detail: links.githubLabel, href: links.github, glyph: '</>', color: 'blue', external: true },
  { label: 'LinkedIn', detail: links.linkedinLabel, href: links.linkedin, glyph: 'in', color: 'blue', external: true },
  { label: 'Email', detail: links.email, href: `mailto:${links.email}`, glyph: '@', color: 'blue', external: false },
]

export function ProfileCard() {
  return (
    <Panel
      label="Builder profile"
      tone="yellow"
      labelIsHeading={false}
      className="profile"
      meta={<span className="profile__id">ID&nbsp;·&nbsp;{profile.handle}</span>}
    >
      <div className="profile__body">
        <div className="profile__main">
          <p className="eyebrow">Portfolio · Computer Science</p>
          <h1 className="profile__name">{profile.name}</h1>
          <p className="profile__intro">{profile.intro}</p>

          <dl className="spec">
            {rows.map((r) => (
              <div key={r.label} className="spec__row">
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="portrait">
          <div className="portrait__disc">
            <Minifig
              className="portrait__fig"
              {...profile.minifig}
              label={`Brick minifigure portrait of ${profile.name}`}
            />
            <svg className="portrait__stand" viewBox="0 -6 80 15" aria-hidden="true">
              <Brick x={0} y={0} w={4} h={1} c="darkGray" />
            </svg>
          </div>
          <figcaption className="portrait__label">
            <span>Minifigure No. 01</span>
            <strong>Class of {edu.graduation.split(' ')[1]}</strong>
          </figcaption>
        </figure>
      </div>

      <ul className="linkbar" aria-label="Links">
        {linkBricks.map((l) => (
          <li key={l.label}>
            <a
              className={`brick-btn brick-btn--${l.color}`}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="brick-btn__glyph" aria-hidden="true">
                {l.glyph}
              </span>
              <span className="brick-btn__text">
                <span className="brick-btn__label">{l.label}</span>
                <span className="brick-btn__detail">{l.detail}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
