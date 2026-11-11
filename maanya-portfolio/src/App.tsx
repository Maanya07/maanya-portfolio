import { useState } from 'react'
import { projects } from './data/projects'
import { VendingMachine } from './components/VendingMachine'
import { Booklet } from './components/Booklet'
import { BrickArt } from './components/BrickArt'
import './App.css'

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const project = projects.find((p) => p.id === selectedId) ?? null

  return (
    <main className="page">
      <header className="intro">
        <h1>Project Kits</h1>
        <p>Press a slot to get a kit, with the finished build and its instruction booklet.</p>
      </header>

      <div className="stage">
        <VendingMachine projects={projects} selectedId={selectedId} onSelect={setSelectedId} />

        {project ? (
          <article className="kit" key={project.id}>
            <div className="kit__box">
              <span className="kit__slot">{project.slot}</span>
              <BrickArt bricks={project.bricks} label={`Brick model of ${project.name}`} />
            </div>

            <div className="kit__summary">
              <h2>{project.name}</h2>
              <p className="kit__tagline">{project.tagline}</p>
              <p>{project.summary}</p>
              <ul className="kit__tech" aria-label="Built with">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ul className="kit__links">
                {project.links.map((l) => (
                  <li key={l.label}>
                    {l.url ? (
                      <a href={l.url} target="_blank" rel="noreferrer">
                        {l.label} ↗
                      </a>
                    ) : (
                      <span className="kit__soon">{l.label} · coming soon</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <Booklet title={project.name} pages={project.booklet} />
          </article>
        ) : (
          <div className="kit kit--empty">
            <p>Your kit will appear here.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
