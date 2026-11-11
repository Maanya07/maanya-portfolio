import type { ReactNode } from 'react'
import { PALETTE as C, SEAM } from '../bricks/palette'
import type { MinifigSlot } from '../Minifig'

/**
 * Minifigure parts for the Experience station. Each role in src/data/profile.ts names one.
 * Every part is drawn once around its own origin, then placed either on the figure
 * (`slot` + `place`, in Minifig coordinates) or in its tray compartment (`trayBox`).
 */
export type PieceKey = 'notebook' | 'chart' | 'headset' | 'lanyard'

interface PieceDef {
  slot: MinifigSlot
  /** SVG transform that puts the part on the figure */
  place: string
  /** viewBox for the tray icon */
  trayBox: string
  art: ReactNode
}

export const PIECES: Record<PieceKey, PieceDef> = {
  /* Tutoring: a calculus notebook tucked under her resting arm */
  notebook: {
    slot: 'held',
    place: 'translate(15 104) rotate(-10)',
    trayBox: '-17 -19 34 38',
    art: (
      <g>
        <rect x={-11} y={-14} width={22} height={28} rx={2} fill={C.blue.base} stroke={SEAM} />
        <rect x={-11} y={-14} width={4.5} height={28} rx={1.5} fill={C.blue.dark} />
        <rect x={8.5} y={-12} width={2.5} height={24} fill={C.white.base} />
        <text x={2} y={6} fontSize={17} fontStyle="italic" fontFamily="Georgia, serif" textAnchor="middle" fill={C.yellow.base}>
          ∫
        </text>
      </g>
    ),
  },

  /* Data analytics: a printed bar-chart tile held up in her waving hand */
  chart: {
    slot: 'raised',
    // sits just above the raised hand; the rotate cancels the arm's -118° so the tile stays upright
    place: 'translate(113.8 112.9) rotate(118)',
    trayBox: '-16 -16 32 32',
    art: (
      <g>
        <rect x={-12} y={-12} width={24} height={24} rx={2.5} fill={C.white.base} stroke={SEAM} />
        <rect x={-12} y={-12} width={24} height={4} rx={2} fill={C.white.dark} opacity={0.6} />
        <rect x={-8} y={0} width={4.5} height={8} fill={C.blue.base} />
        <rect x={-2.2} y={-4} width={4.5} height={12} fill={C.red.base} />
        <rect x={3.6} y={-7} width={4.5} height={15} fill={C.yellow.base} />
        <rect x={-9} y={8} width={18} height={1.2} fill={C.darkGray.base} />
      </g>
    ),
  },

  /* Consulting research: an interview headset with a mic */
  headset: {
    slot: 'head',
    place: 'translate(60 24)',
    trayBox: '-38 -27 76 58',
    art: (
      <g>
        <path d="M-30 6 C-30 -32 30 -32 30 6" fill="none" stroke={C.darkGray.base} strokeWidth={4} strokeLinecap="round" />
        <path d="M-30 6 C-30 -32 30 -32 30 6" fill="none" stroke={C.darkGray.light} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <rect x={-35} y={1} width={10} height={16} rx={4} fill={C.red.base} stroke={SEAM} />
        <rect x={25} y={1} width={10} height={16} rx={4} fill={C.red.base} stroke={SEAM} />
        <path d="M29 15 Q24 27 8 24" fill="none" stroke={C.darkGray.base} strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={6} cy={24} r={3} fill={C.red.base} stroke={SEAM} />
      </g>
    ),
  },

  /* Event operations: a staff lanyard with a badge */
  lanyard: {
    slot: 'torso',
    place: 'translate(52 92)',
    trayBox: '-20 -37 40 58',
    art: (
      <g>
        <path d="M-6 -34 L-2 -8 M16 -34 L2 -8" fill="none" stroke={C.blue.base} strokeWidth={3} strokeLinecap="round" />
        <rect x={-2.5} y={-10} width={5} height={4} rx={1} fill={C.lightGray.dark} />
        <rect x={-8} y={-7} width={16} height={19} rx={2} fill={C.white.base} stroke={SEAM} />
        <rect x={-8} y={-7} width={16} height={5} rx={2} fill={C.red.base} />
        <rect x={-5} y={2} width={10} height={1.8} rx={0.9} fill={C.darkGray.base} />
        <rect x={-5} y={6} width={7} height={1.8} rx={0.9} fill={C.lightGray.dark} />
      </g>
    ),
  },
}
