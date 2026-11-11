/**
 * Brick colors for SVG art: the same matte set as the CSS tokens in src/index.css.
 * Each has a light (small lit edge) face, a dark (shadowed) face, and an ink color for text on it.
 */
export const PALETTE = {
  red: { base: '#B64138', light: '#C95A51', dark: '#8F3029', ink: '#FFFFFF' },
  blue: { base: '#3E6098', light: '#5577AE', dark: '#2F4A78', ink: '#FFFFFF' },
  sky: { base: '#86A5D2', light: '#A0BAE0', dark: '#6F8FC0', ink: '#222833' },
  yellow: { base: '#EBC24F', light: '#F3D477', dark: '#C9A136', ink: '#222833' },
  white: { base: '#FFFCF3', light: '#FFFFFF', dark: '#DCDCD6', ink: '#222833' },
  lightGray: { base: '#C5CCD6', light: '#D9DEE5', dark: '#A3ACB9', ink: '#222833' },
  darkGray: { base: '#5E6673', light: '#77808C', dark: '#474E59', ink: '#FFFFFF' },
  black: { base: '#2A2F38', light: '#434956', dark: '#1A1E25', ink: '#FFFFFF' },
  tan: { base: '#DFC79A', light: '#EAD7B3', dark: '#BFA474', ink: '#222833' },
  brown: { base: '#8A5236', light: '#A2694C', dark: '#683C26', ink: '#FFFFFF' },
  darkBrown: { base: '#4A3022', light: '#634434', dark: '#301E15', ink: '#FFFFFF' },
  green: { base: '#67A862', light: '#80BB7B', dark: '#4F8A4B', ink: '#222833' },
  orange: { base: '#E58A3A', light: '#EEA25F', dark: '#BE6C24', ink: '#222833' },
} as const

export type BrickColor = keyof typeof PALETTE

/** Grid: one stud = U px wide, one plate = P px tall (a brick is 3 plates). */
export const U = 20
export const P = 8
export const STUD_W = 12
export const STUD_H = 4
/** Seam between bricks: a soft cool line, not black. */
export const SEAM = 'rgba(28,40,66,.34)'
