import { useId, useState } from 'react'
import type { BookletPage } from '../data/projects'
import { Missing } from './Missing'
import './Booklet.css'

interface BookletProps {
  title: string
  pages: BookletPage[]
}

/** Paper instruction booklet. Give it a `key` per project so it opens on page 1. */
export function Booklet({ title, pages }: BookletProps) {
  const [index, setIndex] = useState(0)
  const headingId = useId()
  const page = pages[index]
  const last = pages.length - 1

  return (
    <section className="booklet" aria-label={`${title} instruction booklet`}>
      <header className="booklet__bar">
        <span className="booklet__label">Instruction booklet</span>
        <span className="booklet__title">{title}</span>
      </header>

      <div className="booklet__page" aria-live="polite" aria-labelledby={headingId}>
        <span className="booklet__step" aria-hidden="true">
          {index + 1}
        </span>
        <div>
          <h4 id={headingId} className="booklet__heading">
            <span className="visually-hidden">Step {index + 1}: </span>
            {page.title}
          </h4>
          {page.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {page.missing && <Missing note={page.missing} />}
        </div>
      </div>

      <nav className="booklet__nav" aria-label={`${title} booklet pages`}>
        <button
          type="button"
          className="brick-btn brick-btn--sm brick-btn--paper"
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
        >
          ← Prev
        </button>
        <ol className="booklet__pages">
          {pages.map((p, i) => (
            <li key={p.title}>
              <button
                type="button"
                className={`brick-btn brick-btn--sm brick-btn--square ${i === index ? 'brick-btn--blue' : 'brick-btn--paper'}`}
                aria-current={i === index ? 'step' : undefined}
                aria-label={`Page ${i + 1}: ${p.title}`}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="brick-btn brick-btn--sm brick-btn--paper"
          onClick={() => setIndex(index + 1)}
          disabled={index === last}
        >
          Next →
        </button>
      </nav>
    </section>
  )
}
