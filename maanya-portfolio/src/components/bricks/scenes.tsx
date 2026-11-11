import type { ReactNode } from 'react'
import { BrickScene, type BrickSpec } from './Brick'
import { PALETTE as C, P, SEAM, U } from './palette'

/**
 * Every illustration on the site, built from Brick parts.
 * Project scenes are 12 studs x 18 plates; role icons are 4 x 10.
 */
export type SceneKey =
  | 'assistant'
  | 'voice'
  | 'register'
  | 'hoop'
  | 'gameTable'
  | 'satellite'
  | 'chalkboard'
  | 'dashboard'
  | 'interview'
  | 'calendar'

interface SceneDef {
  cols: number
  rows: number
  bricks: BrickSpec[]
  backdrop?: ReactNode
  decor?: ReactNode
}

const u = (n: number) => n * U
const p = (n: number) => n * P

const sky = (cols: number, rows: number, color = '#E4ECF7') => (
  <rect x={0} y={-6} width={u(cols)} height={p(rows) + 6} fill={color} />
)

const SCENES: Record<SceneKey, SceneDef> = {
  /* Jag AI: desk computer showing an email + summary, desk calendar */
  assistant: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'lightGray' },
      { x: 1, y: 13, w: 1, h: 4, c: 'brown' },
      { x: 10, y: 13, w: 1, h: 4, c: 'brown' },
      { x: 7, y: 13, w: 3, h: 3, c: 'tan' },
      { x: 0.5, y: 12, w: 11, h: 1, c: 'brown' },
      { x: 1, y: 11, w: 3, h: 1, c: 'darkGray', studs: false },
      { x: 4.5, y: 10, w: 2, h: 2, c: 'darkGray' },
      { x: 2.5, y: 3, w: 6, h: 7, c: 'black' },
      { x: 9, y: 8, w: 2, h: 4, c: 'white' },
      { x: 9, y: 7, w: 2, h: 1, c: 'red', studs: false },
    ],
    decor: (
      <g>
        <rect x={u(2.5) + 5} y={p(3) + 5} width={u(6) - 10} height={p(7) - 11} rx={2} fill="#CFE0F2" />
        <path d={`M${u(2.5) + 8} ${p(3) + 5} l14 0 l-10 ${p(7) - 11} l-4 0 z`} fill={C.white.light} opacity={0.35} />
        <rect x={68} y={34} width={30} height={20} rx={1.5} fill={C.white.light} stroke={C.blue.base} strokeWidth={1.6} />
        <polyline points="68,34 83,46 98,34" fill="none" stroke={C.blue.base} strokeWidth={1.6} />
        <rect x={106} y={35} width={50} height={3.5} rx={1.5} fill={C.blue.dark} />
        <rect x={106} y={42} width={40} height={3.5} rx={1.5} fill={C.blue.base} opacity={0.7} />
        <rect x={106} y={49} width={46} height={3.5} rx={1.5} fill={C.blue.base} opacity={0.7} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={24 + i * 11} y={90} width={8} height={2.5} rx={1} fill={C.lightGray.base} />
        ))}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c2) => (
            <rect
              key={`${r}-${c2}`}
              x={186 + c2 * 10}
              y={70 + r * 7}
              width={6}
              height={4}
              fill={r === 1 && c2 === 1 ? C.red.base : C.darkGray.light}
            />
          )),
        )}
      </g>
    ),
  },

  /* Jarvis: studio microphone on a stand, sound waves, a short spoken reply */
  voice: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'tan' },
      { x: 4, y: 16, w: 4, h: 1, c: 'black' },
      { x: 5.5, y: 10, w: 1, h: 6, c: 'lightGray', studs: false },
      { x: 4.5, y: 9, w: 3, h: 1, c: 'darkGray', studs: false },
      { x: 4.5, y: 3, w: 3, h: 6, c: 'black', studs: false, round: true },
    ],
    decor: (
      <g>
        {[30, 36, 42, 48, 54, 60].map((y) => (
          <rect key={y} x={98} y={y} width={44} height={2.2} rx={1.1} fill={C.black.light} />
        ))}
        <rect x={96} y={44} width={48} height={4} fill={C.lightGray.base} opacity={0.9} />
        <circle cx={106} cy={32} r={4} fill={C.white.light} opacity={0.18} />
        {[
          ['M78 32 Q68 48 78 64', C.red.base],
          ['M64 24 Q48 48 64 72', C.red.light],
          ['M162 32 Q172 48 162 64', C.blue.base],
          ['M176 24 Q192 48 176 72', C.blue.light],
        ].map(([d, stroke]) => (
          <path key={d} d={d} fill="none" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
        ))}
        <rect x={168} y={-2} width={58} height={24} rx={6} fill={C.white.light} stroke={SEAM} strokeWidth={1} />
        <path d="M180 22 L176 30 L188 22 Z" fill={C.white.light} stroke={SEAM} strokeWidth={1} strokeLinejoin="round" />
        <rect x={180} y={21} width={9} height={2} fill={C.white.light} />
        {[184, 197, 210].map((cx) => (
          <circle key={cx} cx={cx} cy={10} r={2.6} fill={C.darkGray.base} />
        ))}
      </g>
    ),
  },

  /* Personal Finance Tracker: cash register printing a receipt, coin stack */
  register: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'lightGray' },
      { x: 0.5, y: 14, w: 11, h: 3, c: 'white' },
      { x: 2, y: 11, w: 7, h: 3, c: 'darkGray' },
      { x: 2, y: 8, w: 7, h: 3, c: 'blue' },
      { x: 2, y: 7, w: 4, h: 1, c: 'white', studs: false },
      { x: 7, y: 6, w: 1, h: 2, c: 'darkGray', studs: false },
      { x: 6, y: 3, w: 3, h: 3, c: 'black' },
      { x: 10, y: 13, w: 1, h: 1, c: 'yellow', round: true },
      { x: 10, y: 12, w: 1, h: 1, c: 'yellow', round: true },
      { x: 10, y: 11, w: 1, h: 1, c: 'yellow', round: true },
      { x: 10, y: 10, w: 1, h: 1, c: 'yellow', round: true },
    ],
    decor: (
      <g>
        <path d="M50 57 L50 28 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 L74 57 Z" fill={C.white.light} stroke={SEAM} strokeWidth={1} />
        {[33, 39, 45].map((y) => (
          <rect key={y} x={54} y={y} width={16} height={2} fill={C.lightGray.dark} />
        ))}
        <rect x={u(6) + 4} y={p(3) + 4} width={u(3) - 8} height={p(3) - 8} rx={1.5} fill="#BFE0B4" />
        <text x={u(7.5)} y={p(3) + 16} textAnchor="middle" fontSize={11} fontWeight={800} fill="#2F5A2C" fontFamily="Archivo, sans-serif">$</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={44 + i * 18} y={57.5} width={12} height={4} rx={1} fill={i === 3 ? C.red.base : C.blue.base} />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={52 + i * 14} y={72} width={9} height={4} rx={1} fill={C.white.light} opacity={0.85} />
        ))}
        <rect x={u(5.5) - 12} y={p(12) + 6} width={24} height={4} rx={2} fill={C.lightGray.light} />
      </g>
    ),
  },

  /* NBA Stat Models: hoop with net, ball, rising stat bars */
  hoop: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'tan' },
      { x: 0.5, y: 13, w: 1, h: 4, c: 'blue' },
      { x: 1.5, y: 10, w: 1, h: 7, c: 'red' },
      { x: 2.5, y: 7, w: 1, h: 10, c: 'yellow' },
      { x: 8, y: 7, w: 1, h: 10, c: 'darkGray', studs: false },
      { x: 5, y: 1, w: 6, h: 6, c: 'white' },
    ],
    decor: (
      <g>
        <rect x={142} y={26} width={36} height={22} fill="none" stroke={C.red.base} strokeWidth={2.5} />
        <path d="M144 59 L148 76 M152 59 L154 76 M160 59 L160 76 M168 59 L166 76 M176 59 L172 76 M147 66 L173 66 M149 72 L171 72" stroke={C.white.light} strokeWidth={1.4} />
        <path d="M144 59 L148 76 L172 76 L176 59" fill="none" stroke={C.lightGray.dark} strokeWidth={0.8} />
        <rect x={140} y={56} width={40} height={4} rx={2} fill={C.orange.base} stroke={SEAM} strokeWidth={0.8} />
        <circle cx={112} cy={119} r={17} fill={C.orange.base} stroke={SEAM} strokeWidth={1} />
        <path d="M112 102 V136 M95 119 H129 M100 107 Q108 119 100 131 M124 107 Q116 119 124 131" fill="none" stroke="#6A3A1C" strokeWidth={1.3} />
        <circle cx={106} cy={112} r={4} fill={C.white.light} opacity={0.3} />
        <path d="M6 100 L26 76 L46 52" fill="none" stroke={C.darkGray.base} strokeWidth={1.4} strokeDasharray="3 3" />
      </g>
    ),
  },

  /* GameNite: tiny game table with dice, a pawn, and a hand of cards */
  gameTable: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18, '#FBF0CF'),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'red' },
      { x: 2, y: 11, w: 1, h: 6, c: 'brown' },
      { x: 9, y: 11, w: 1, h: 6, c: 'brown' },
      { x: 1, y: 10, w: 10, h: 1, c: 'brown' },
      { x: 2, y: 9, w: 8, h: 1, c: 'green', studs: false },
      { x: 3, y: 6.5, w: 1, h: 2.5, c: 'white', studs: false },
      { x: 4.3, y: 6.5, w: 1, h: 2.5, c: 'red', studs: false },
      { x: 6.4, y: 6.8, w: 1, h: 2.2, c: 'blue', studs: false, round: true },
    ],
    decor: (
      <g>
        <line x1={120} y1={-6} x2={120} y2={10} stroke={C.darkGray.base} strokeWidth={1.5} />
        <path d="M104 22 L110 10 H130 L136 22 Z" fill={C.yellow.base} stroke={SEAM} strokeWidth={1} />
        <path d="M100 22 L80 70 H160 L140 22 Z" fill={C.yellow.light} opacity={0.25} />
        {[[66, 58], [74, 66], [66, 66], [74, 58]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.6} fill={C.black.base} />
        ))}
        <circle cx={96} cy={62} r={1.6} fill={C.white.light} />
        <circle cx={92} cy={58} r={1.6} fill={C.white.light} />
        <circle cx={100} cy={66} r={1.6} fill={C.white.light} />
        <circle cx={138} cy={50} r={6} fill={C.blue.base} stroke={SEAM} strokeWidth={1} />
        <circle cx={136} cy={48} r={1.8} fill={C.white.light} opacity={0.4} />
        {[-18, 0, 18].map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 176 72)`}>
            <rect x={169} y={50} width={14} height={20} rx={1.5} fill={C.white.light} stroke={SEAM} strokeWidth={1} />
            <circle cx={176} cy={58} r={2.6} fill={i === 1 ? C.red.base : C.black.base} />
          </g>
        ))}
      </g>
    ),
  },

  /* Solar Storm Classifier: satellite on a display stand, sun throwing flares */
  satellite: {
    cols: 12,
    rows: 18,
    backdrop: sky(12, 18, '#2B3A5C'),
    bricks: [
      { x: 0, y: 17, w: 12, h: 1, c: 'black' },
      { x: 4, y: 16, w: 4, h: 1, c: 'darkGray' },
      { x: 5.5, y: 12, w: 1, h: 4, c: 'lightGray', studs: false },
      { x: 5, y: 7, w: 2, h: 5, c: 'white' },
      { x: 1.5, y: 8, w: 3, h: 3, c: 'blue', studs: false },
      { x: 7.5, y: 8, w: 3, h: 3, c: 'blue', studs: false },
    ],
    decor: (
      <g>
        {[[200, 14], [222, 40], [186, 30], [232, 92], [208, 116], [20, 110], [44, 128]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.3} fill={C.white.light} opacity={0.8} />
        ))}
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          return (
            <line key={i} x1={32 + Math.cos(a) * 20} y1={22 + Math.sin(a) * 20} x2={32 + Math.cos(a) * 27} y2={22 + Math.sin(a) * 27} stroke={C.yellow.base} strokeWidth={2.4} strokeLinecap="round" />
          )
        })}
        <circle cx={32} cy={22} r={16} fill={C.orange.base} />
        <circle cx={30} cy={20} r={12} fill={C.yellow.base} />
        <path d="M54 14 Q96 2 112 34 M56 28 Q88 30 102 48" fill="none" stroke={C.orange.base} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
        {[1.5, 7.5].map((x) => (
          <g key={x}>
            <line x1={u(x) + 20} y1={p(8) + 2} x2={u(x) + 20} y2={p(11) - 2} stroke={C.blue.dark} strokeWidth={1} />
            <line x1={u(x) + 40} y1={p(8) + 2} x2={u(x) + 40} y2={p(11) - 2} stroke={C.blue.dark} strokeWidth={1} />
            <line x1={u(x) + 2} y1={p(9.5)} x2={u(x) + 58} y2={p(9.5)} stroke={C.blue.dark} strokeWidth={1} />
          </g>
        ))}
        <rect x={90} y={p(9.5) - 2} width={10} height={4} fill={C.lightGray.base} />
        <rect x={140} y={p(9.5) - 2} width={10} height={4} fill={C.lightGray.base} />
        <path d="M108 50 Q100 32 118 26 Q122 42 108 50 Z" fill={C.lightGray.light} stroke={SEAM} strokeWidth={1} />
        <line x1={112} y1={40} x2={104} y2={30} stroke={C.lightGray.dark} strokeWidth={1.2} />
        <circle cx={128} cy={70} r={3} fill={C.red.base} />
      </g>
    ),
  },

  /* Peer tutoring: chalkboard with an integral */
  chalkboard: {
    cols: 4,
    rows: 10,
    bricks: [
      { x: 0, y: 9, w: 4, h: 1, c: 'darkGray' },
      { x: 1.5, y: 8, w: 1, h: 1, c: 'brown', studs: false },
      { x: 0, y: 1, w: 4, h: 7, c: 'green', studs: false },
      { x: 0, y: 0, w: 4, h: 1, c: 'brown' },
    ],
    decor: (
      <g fontFamily="Georgia, serif" fill={C.white.light}>
        <text x={22} y={46} fontSize={30} fontStyle="italic" opacity={0.92}>∫</text>
        <text x={36} y={40} fontSize={12} fontStyle="italic" opacity={0.9}>dx</text>
        <rect x={50} y={52} width={14} height={2.5} rx={1} fill={C.yellow.base} />
      </g>
    ),
  },

  /* Data analytics: monitor with a dashboard */
  dashboard: {
    cols: 4,
    rows: 10,
    bricks: [
      { x: 0.5, y: 9, w: 3, h: 1, c: 'lightGray' },
      { x: 1.5, y: 7, w: 1, h: 2, c: 'darkGray', studs: false },
      { x: 0, y: 1, w: 4, h: 6, c: 'black' },
    ],
    decor: (
      <g>
        <rect x={5} y={13} width={70} height={38} rx={1.5} fill="#F4F7FB" />
        <rect x={12} y={34} width={9} height={13} fill={C.blue.base} />
        <rect x={25} y={26} width={9} height={21} fill={C.red.base} />
        <rect x={38} y={20} width={9} height={27} fill={C.yellow.base} />
        <circle cx={62} cy={30} r={8} fill={C.blue.light} />
        <path d="M62 30 L62 22 A8 8 0 0 1 69 34 Z" fill={C.yellow.base} />
      </g>
    ),
  },

  /* Consulting research: two speech bubbles */
  interview: {
    cols: 4,
    rows: 10,
    bricks: [
      { x: 0, y: 1, w: 3, h: 4, c: 'white' },
      { x: 1, y: 5.5, w: 3, h: 4, c: 'blue', studs: false },
    ],
    decor: (
      <g>
        <path d="M10 40 L6 48 L18 40 Z" fill={C.white.base} stroke={SEAM} strokeWidth={1} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={18 + i * 12} cy={24} r={3} fill={C.darkGray.base} />
        ))}
        <path d="M68 76 L74 84 L62 76 Z" fill={C.blue.base} stroke={SEAM} strokeWidth={1} />
        <rect x={28} y={56} width={36} height={3} rx={1.5} fill={C.white.light} />
        <rect x={28} y={63} width={26} height={3} rx={1.5} fill={C.white.light} opacity={0.7} />
      </g>
    ),
  },

  /* Event operations: calendar with a check */
  calendar: {
    cols: 4,
    rows: 10,
    bricks: [
      { x: 0, y: 4, w: 4, h: 6, c: 'white', studs: false },
      { x: 0, y: 2, w: 4, h: 2, c: 'red' },
    ],
    decor: (
      <g>
        {[18, 62].map((x) => (
          <rect key={x} x={x - 2} y={6} width={4} height={14} rx={2} fill={C.darkGray.base} />
        ))}
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c2) => (
            <rect key={`${r}-${c2}`} x={10 + c2 * 16} y={40 + r * 11} width={10} height={6} fill={C.lightGray.light} />
          )),
        )}
        <path d="M44 56 L52 64 L68 44" fill="none" stroke={C.blue.base} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
}

interface SceneArtProps {
  scene: SceneKey
  label: string
  className?: string
}

export function SceneArt({ scene, label, className }: SceneArtProps) {
  const s = SCENES[scene]
  return (
    <BrickScene cols={s.cols} rows={s.rows} bricks={s.bricks} label={label} backdrop={s.backdrop} className={className}>
      {s.decor}
    </BrickScene>
  )
}
