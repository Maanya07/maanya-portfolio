/**
 * Marks content that isn't written yet.
 * In `npm run dev` it shows exactly what's missing; in the built site it shows a quiet "coming soon".
 */
export function Missing({ note, fallback = 'Details coming soon.' }: { note: string; fallback?: string }) {
  if (import.meta.env.DEV) {
    return <p className="missing missing--dev">Missing: {note}</p>
  }
  return <p className="missing">{fallback}</p>
}
