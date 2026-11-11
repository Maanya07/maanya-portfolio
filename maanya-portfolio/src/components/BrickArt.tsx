import type { Brick, BrickColor } from '../data/projects'

const FILL: Record<BrickColor, string> = {
  red: '#c8342b',
  yellow: '#f2b632',
  blue: '#2f6db5',
  green: '#3f8f4f',
  orange: '#e07b24',
  white: '#f7f3ea',
  gray: '#9a958c',
  dark: '#3a332e',
}

const COLS = 10
const ROWS = 6
const STUD = 20 // width of one stud column
const ROW_H = 22 // height of one brick row
const STUD_H = 4

interface BrickArtProps {
  bricks: Brick[]
  label: string
}

/** Renders a simple brick build. Lower rows are drawn first so upper bricks cover their studs. */
export function BrickArt({ bricks, label }: BrickArtProps) {
  const sorted = [...bricks].sort((a, b) => b.y - a.y)
  return (
    <svg
      className="brick-art"
      viewBox={`-2 -2 ${COLS * STUD + 4} ${ROWS * ROW_H + STUD_H + 4}`}
      role="img"
      aria-label={label}
    >
      {sorted.map((b, i) => {
        const x = b.x * STUD
        const y = b.y * ROW_H + STUD_H
        const fill = FILL[b.color]
        return (
          <g key={i}>
            {Array.from({ length: b.w }, (_, s) => (
              <rect
                key={s}
                x={x + s * STUD + 5}
                y={y - STUD_H}
                width={10}
                height={STUD_H + 1}
                rx={1}
                fill={fill}
                stroke="rgba(0,0,0,.35)"
                strokeWidth={1}
              />
            ))}
            <rect
              x={x + 0.5}
              y={y}
              width={b.w * STUD - 1}
              height={ROW_H - 1}
              rx={2}
              fill={fill}
              stroke="rgba(0,0,0,.35)"
              strokeWidth={1}
            />
            <rect
              x={x + 2}
              y={y + 2}
              width={b.w * STUD - 4}
              height={3}
              rx={1}
              fill="rgba(255,255,255,.25)"
            />
          </g>
        )
      })}
    </svg>
  )
}
