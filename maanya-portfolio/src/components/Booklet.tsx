import { useId, useState } from 'react'
import type { BookletPage } from '../data/projects'
import './Booklet.css'

interface BookletProps {
  title: string
  pages: BookletPage[]
}

/** Paper instruction booklet. Give it a `key` per project so it resets to page 1. */
export function Booklet({ title, pages }: BookletProps) {
  const [index, setIndex] = useState(0)
  const headingId = useId()
  const page = pages[index]
  const last = pages.length - 1

  return (
    <section className="booklet" aria-labelledby={headingId}>
      <header className="booklet__cover">
        <span className="booklet__label">Instructions</span>
        <span className="booklet__title">{title}</span>
      </header>

      <div className="booklet__page" aria-live="polite">
        <h3 id={headingId} className="booklet__heading">
          <span className="booklet__step">{index + 1}</span>
          {page.title}
        </h3>
        {page.paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        {page.image ? (
          <img className="booklet__image" src={page.image} alt={`${title}: ${page.title}`} />
        ) : (
          page.placeholder && <div className="booklet__placeholder">{page.placeholder}</div>
        )}
      </div>

      <nav className="booklet__nav" aria-label={`${title} booklet pages`}>
        <button
          type="button"
          className="booklet__btn"
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
                className="booklet__num"
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
          className="booklet__btn"
          onClick={() => setIndex(index + 1)}
          disabled={index === last}
        >
          Next →
        </button>
      </nav>
    </section>
  )
}
