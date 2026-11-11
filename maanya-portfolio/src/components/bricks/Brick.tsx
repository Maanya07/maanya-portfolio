import type { ReactNode } from 'react'
import { P, PALETTE, SEAM, STUD_H, STUD_W, U, type BrickColor } from './palette'

export interface BrickSpec {
  /** left edge, in studs */
  x: number
  /** top edge, in plates (0 = top of scene) */
  y: number
  /** width in studs */
  w: number
  /** height in plates: 1 = plate, 3 = brick */
  h?: number
  c: BrickColor
  /** false = smooth tile */
  studs?: boolean
  /** rounded piece (coins, cylinders) */
  round?: boolean
}

export function Brick({ x, y, w, h = 3, c, studs = true, round = false }: BrickSpec) {
  const col = PALETTE[c]
  const px = x * U
  const py = y * P
  const pw = w * U
  const ph = h * P
  const r = round ? Math.min(pw, ph) / 2.4 : 1.5
  const studCount = Math.max(1, Math.round(w))

  return (
    <g>
      {studs &&
        Array.from({ length: studCount }, (_, i) => {
          const cx = px + (pw / studCount) * (i + 0.5)
          return (
            <g key={i}>
              <rect x={cx - STUD_W / 2} y={py - STUD_H} width={STUD_W} height={STUD_H + 1} rx={1} fill={col.base} stroke={SEAM} strokeWidth={0.8} />
              <rect x={cx - STUD_W / 2 + 1} y={py - STUD_H + 0.8} width={3} height={STUD_H - 0.5} fill={col.light} />
              <rect x={cx + STUD_W / 2 - 3} y={py - STUD_H + 0.8} width={2} height={STUD_H - 0.5} fill={col.dark} opacity={0.7} />
            </g>
          )
        })}
      <rect x={px} y={py} width={pw} height={ph} rx={r} fill={col.base} />
      {/* molded edges: lit top, shaded right + bottom */}
      <rect x={px + 1.5} y={py + 0.8} width={pw - 3} height={1.6} rx={0.8} fill={col.light} />
      <rect x={px + pw - 3} y={py + 1.5} width={2} height={ph - 3} fill={col.dark} opacity={0.55} />
      <rect x={px + 1} y={py + ph - 2.4} width={pw - 2} height={1.6} rx={0.8} fill={col.dark} />
      <rect x={px + 0.5} y={py + 0.5} width={pw - 1} height={ph - 1} rx={r} fill="none" stroke={SEAM} strokeWidth={1} />
    </g>
  )
}

interface BrickSceneProps {
  cols: number
  rows: number
  bricks: BrickSpec[]
  label: string
  /** drawn behind the bricks */
  backdrop?: ReactNode
  /** drawn on top of the bricks (printed details) */
  children?: ReactNode
  className?: string
}

/** An SVG build. Lower bricks are drawn first so upper bricks sit on their studs. */
export function BrickScene({ cols, rows, bricks, label, backdrop, children, className }: BrickSceneProps) {
  const sorted = [...bricks].sort((a, b) => b.y - a.y)
  const top = -(STUD_H + 2)
  return (
    <svg
      className={className}
      viewBox={`0 ${top} ${cols * U} ${rows * P - top}`}
      role="img"
      aria-label={label}
    >
      {backdrop}
      {sorted.map((b, i) => (
        <Brick key={i} {...b} />
      ))}
      {children}
    </svg>
  )
}
