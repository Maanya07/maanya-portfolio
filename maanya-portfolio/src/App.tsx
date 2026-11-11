import { useRef, useState } from 'react'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { ProfileCard } from './components/ProfileCard'
import { Experience } from './components/Experience'
import { Inventory } from './components/Inventory'
import { Panel } from './components/Panel'
import { VendingMachine } from './components/VendingMachine'
import { Kit } from './components/Kit'
import { Brick } from './components/bricks/Brick'
import './App.css'

const firstReady = projects.find((p) => p.status === 'ready') ?? projects[0]

function App() {
  const [selectedId, setSelectedId] = useState(firstReady.id)
  const [pressed, setPressed] = useState(false)
  const kitRef = useRef<HTMLDivElement>(null)
  const project = projects.find((p) => p.id === selectedId) ?? firstReady

  function select(id: string) {
    setSelectedId(id)
    setPressed(true)
    // On narrow screens the kit sits below the machine, so bring it into view after the drop.
    if (window.matchMedia('(max-width: 900px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.setTimeout(
        () => kitRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }),
        reduce ? 0 : 650,
      )
    }
  }

  function selectFromInventory(id: string) {
    setSelectedId(id)
    setPressed(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    kitRef.current?.focus({ preventScroll: true })
    kitRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <a className="brand" href="#top">
            <svg viewBox="0 -6 40 30" aria-hidden="true">
              <Brick x={0} y={0} w={2} h={3} c="red" />
            </svg>
            <span>{profile.name}</span>
          </a>
          <nav aria-label="Sections">
            <ul className="topnav">
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li>
                <a href={profile.links.resume} target="_blank" rel="noreferrer">Résumé</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top" className="page">
        <ProfileCard />
        <Experience />

        <Panel id="projects" label="Projects" meta={<span>Press a slot to dispense a kit</span>}>
          <div className="projects">
            <VendingMachine projects={projects} selectedId={selectedId} onSelect={select} />
            <div ref={kitRef} className="projects__kit" tabIndex={-1} role="region" aria-label="Selected project kit">
              <Kit key={project.id} project={project} animate={pressed} />
            </div>
          </div>
        </Panel>

        <Inventory onOpenProject={selectFromInventory} />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__name">{profile.name}</p>
          <p className="footer__extras">
            <span>Accessories:</span> {profile.interests.join(' · ')}
          </p>
          <ul className="footer__links">
            <li><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={`mailto:${profile.links.email}`}>Email</a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default App
