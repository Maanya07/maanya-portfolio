import { useId } from 'react'
import { PALETTE, SEAM, type BrickColor } from './bricks/palette'

interface MinifigProps {
  hair: BrickColor
  torso: BrickColor
  legs: BrickColor
  label: string
  className?: string
}

const INK = '#222833'

/** Placeholder minifigure portrait: slight head tilt and a little wave. Colors come from src/data/profile.ts. */
export function Minifig({ hair, torso, legs, label, className }: MinifigProps) {
  const id = useId()
  const skin = PALETTE.yellow
  const H = PALETTE[hair]
  const T = PALETTE[torso]
  const L = PALETTE[legs]
  const grad = (name: string, c: { light: string; base: string; dark: string }) => (
    <linearGradient id={`${id}-${name}`} x1="0" x2="1" y1="0" y2="0.3">
      {/* matte: mostly flat color, a thin lit edge, a soft shaded edge */}
      <stop offset="0" stopColor={c.light} />
      <stop offset="0.14" stopColor={c.base} />
      <stop offset="0.8" stopColor={c.base} />
      <stop offset="1" stopColor={c.dark} />
    </linearGradient>
  )
  const f = (name: string) => `url(#${id}-${name})`

  return (
    <svg className={className} viewBox="-8 -4 140 188" role="img" aria-label={label}>
      <defs>
        {grad('skin', skin)}
        {grad('hair', H)}
        {grad('torso', T)}
        {grad('legs', L)}
      </defs>

      {/* legs + hips */}
      <rect x={30} y={124} width={28} height={54} rx={3} fill={f('legs')} stroke={SEAM} />
      <rect x={62} y={124} width={28} height={54} rx={3} fill={f('legs')} stroke={SEAM} />
      <rect x={31} y={168} width={26} height={2} fill={L.dark} opacity={0.7} />
      <rect x={63} y={168} width={26} height={2} fill={L.dark} opacity={0.7} />
      <rect x={30} y={114} width={60} height={12} rx={3} fill={f('legs')} stroke={SEAM} />
      <rect x={56} y={117} width={8} height={9} fill={L.dark} opacity={0.8} />

      {/* resting arm (her right, viewer's left) */}
      <path d="M42 59 L33 62 L22 101 L32 105 L42 74 Z" fill={T.dark} stroke={SEAM} strokeLinejoin="round" />
      <circle cx={26} cy={111} r={7.5} fill={f('skin')} stroke={SEAM} />
      <circle cx={26} cy={113} r={3} fill={skin.dark} />

      {/* torso with a printed collar and a </> badge */}
      <path d="M42 58 H78 L90 116 H30 Z" fill={f('torso')} stroke={SEAM} strokeLinejoin="round" />
      <path d="M52 58 L60 73 L68 58 Z" fill={PALETTE.white.base} />
      <path d="M52 58 L60 73 L68 58" fill="none" stroke={T.dark} strokeWidth={1.4} />
      <rect x={63} y={84} width={18} height={11} rx={2} fill={PALETTE.yellow.base} stroke={SEAM} strokeWidth={0.8} />
      <text x={72} y={92.2} fontSize={7} fontWeight={800} textAnchor="middle" fill={INK} fontFamily="Archivo, sans-serif">{'</>'}</text>

      {/* waving arm (her left, viewer's right), pivoting at the shoulder */}
      <g transform="rotate(-118 82 62)">
        <g className="minifig__wave">
          <path d="M78 59 L87 62 L98 101 L88 105 L78 74 Z" fill={T.base} stroke={SEAM} strokeLinejoin="round" />
          <circle cx={94} cy={111} r={7.5} fill={f('skin')} stroke={SEAM} />
          <circle cx={94} cy={109} r={3} fill={skin.dark} />
        </g>
      </g>

      {/* neck */}
      <rect x={50} y={52} width={20} height={7} fill={skin.dark} />

      {/* head + hair, tilted slightly */}
      <g transform="rotate(-6 60 54)">
        <rect x={36} y={12} width={48} height={42} rx={12} fill={f('skin')} stroke={SEAM} />
        {/* soft eyes with big highlights */}
        <ellipse cx={50.5} cy={33} rx={3.2} ry={3.9} fill={INK} />
        <ellipse cx={69.5} cy={33} rx={3.2} ry={3.9} fill={INK} />
        <circle cx={51.7} cy={31.4} r={1.3} fill="#fff" />
        <circle cx={70.7} cy={31.4} r={1.3} fill="#fff" />
        <circle cx={49.6} cy={34.6} r={0.6} fill="#fff" opacity={0.8} />
        <circle cx={68.6} cy={34.6} r={0.6} fill="#fff" opacity={0.8} />
        {/* rosy cheeks + small smile */}
        <ellipse cx={44.5} cy={41.5} rx={4} ry={2.4} fill="#E39A86" opacity={0.55} />
        <ellipse cx={75.5} cy={41.5} rx={4} ry={2.4} fill="#E39A86" opacity={0.55} />
        <path d="M54.5 42.5 Q60 47 65.5 42.5" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />

        {/* rounded bob */}
        <path
          d="M30 36 C28 15 42 3 60 3 C78 3 92 15 90 36 C90 44 90.5 50 88.5 55 C86.5 59 81 59 80 54.5 L79 31 C70 30 60.5 25 55 18.5 C51 26 45 30 41 31 L40 54.5 C39 59 33.5 59 31.5 55 C29.5 50 30 44 30 36 Z"
          fill={f('hair')}
          stroke={SEAM}
          strokeLinejoin="round"
        />
        <path d="M43 11 C49 7.5 55 6.5 61 6.5" fill="none" stroke={H.light} strokeWidth={2.2} strokeLinecap="round" opacity={0.7} />
      </g>
    </svg>
  )
}
