// All portfolio content lives here. Edit a project, or add one to the
// `projects` array, and the vending machine + kit update automatically.

export type BrickColor =
  | 'red'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'orange'
  | 'white'
  | 'gray'
  | 'dark'

/** One brick in the illustration. Grid is 10 studs wide x 6 rows tall; y=0 is the top row. */
export interface Brick {
  x: number
  y: number
  /** width in studs */
  w: number
  color: BrickColor
}

export interface BookletPage {
  title: string
  paragraphs: string[]
  /** Shown as a dashed placeholder box (e.g. until you have a screenshot). */
  placeholder?: string
  /** Optional image path (e.g. '/screens/gamenite.png' in /public). Replaces the placeholder. */
  image?: string
}

export interface ProjectLink {
  label: string
  /** Leave empty ('') to show "coming soon" instead of a link. */
  url: string
}

export interface Project {
  /** Stable id, used as a React key. */
  id: string
  /** Slot code shown on the machine, e.g. 'A1'. */
  slot: string
  name: string
  /** One-line hook shown under the name. */
  tagline: string
  /** Short summary, visible as soon as the kit opens. */
  summary: string
  tech: string[]
  /** Color of the little box that drops into the tray. */
  boxColor: string
  bricks: Brick[]
  links: ProjectLink[]
  /** Exactly the booklet pages, in order: The Idea, What I Built, The Result. */
  booklet: BookletPage[]
}

export const projects: Project[] = [
  {
    id: 'gamenite',
    slot: 'A1',
    name: 'GameNite',
    tagline: 'Game night, planned in one place.',
    // TODO: replace with your real summary
    summary:
      'A web app that helps friends pick a date, choose games, and get everyone to show up for game night. [Placeholder summary]',
    tech: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    boxColor: '#2f6db5',
    bricks: [
      { x: 0, y: 5, w: 10, color: 'gray' },
      { x: 0, y: 4, w: 3, color: 'dark' },
      { x: 7, y: 4, w: 3, color: 'dark' },
      { x: 0, y: 3, w: 10, color: 'dark' },
      { x: 0, y: 2, w: 2, color: 'dark' },
      { x: 2, y: 2, w: 2, color: 'red' },
      { x: 4, y: 2, w: 2, color: 'dark' },
      { x: 6, y: 2, w: 1, color: 'yellow' },
      { x: 7, y: 2, w: 1, color: 'blue' },
      { x: 8, y: 2, w: 2, color: 'dark' },
      { x: 1, y: 1, w: 8, color: 'dark' },
    ],
    links: [
      { label: 'Live demo', url: '' },
      { label: 'Source code', url: '' },
    ],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: [
          '[Placeholder] What problem were you solving? Who was it for?',
          '[Placeholder] What made you want to build it?',
        ],
      },
      {
        title: 'What I Built',
        paragraphs: [
          '[Placeholder] The main features, and the part you are proudest of.',
          '[Placeholder] One interesting technical decision or challenge.',
        ],
        placeholder: 'Screenshot coming soon',
      },
      {
        title: 'The Result',
        paragraphs: [
          '[Placeholder] Users, numbers, feedback, or what you learned.',
        ],
      },
    ],
  },
  {
    id: 'solar-storm',
    slot: 'A2',
    name: 'Solar Storm Classifier',
    tagline: 'Sorting space weather before it hits.',
    // TODO: replace with your real summary
    summary:
      'A machine learning model that classifies solar storm events from space-weather data. [Placeholder summary]',
    tech: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    boxColor: '#e07b24',
    bricks: [
      { x: 0, y: 5, w: 10, color: 'dark' },
      { x: 1, y: 3, w: 3, color: 'yellow' },
      { x: 6, y: 3, w: 3, color: 'blue' },
      { x: 0, y: 2, w: 5, color: 'orange' },
      { x: 7, y: 2, w: 1, color: 'white' },
      { x: 0, y: 1, w: 5, color: 'yellow' },
      { x: 5, y: 1, w: 2, color: 'red' },
      { x: 1, y: 0, w: 3, color: 'orange' },
      { x: 7, y: 0, w: 1, color: 'red' },
    ],
    links: [
      { label: 'Notebook', url: '' },
      { label: 'Source code', url: '' },
    ],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: [
          '[Placeholder] Why classify solar storms? What data did you start with?',
        ],
      },
      {
        title: 'What I Built',
        paragraphs: [
          '[Placeholder] Data prep, model choice, and how you evaluated it.',
        ],
        placeholder: 'Chart or screenshot coming soon',
      },
      {
        title: 'The Result',
        paragraphs: [
          '[Placeholder] Accuracy or other metrics, and what you would try next.',
        ],
      },
    ],
  },
  {
    id: 'finance-tracker',
    slot: 'A3',
    name: 'Personal Finance Tracker',
    tagline: 'See where the money goes.',
    // TODO: replace with your real summary
    summary:
      'An app for logging spending, setting budgets, and seeing trends over time. [Placeholder summary]',
    tech: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    boxColor: '#3f8f4f',
    bricks: [
      { x: 0, y: 5, w: 10, color: 'white' },
      { x: 1, y: 4, w: 2, color: 'green' },
      { x: 4, y: 4, w: 2, color: 'green' },
      { x: 7, y: 4, w: 2, color: 'green' },
      { x: 1, y: 3, w: 2, color: 'green' },
      { x: 4, y: 3, w: 2, color: 'green' },
      { x: 7, y: 3, w: 2, color: 'green' },
      { x: 4, y: 2, w: 2, color: 'green' },
      { x: 7, y: 2, w: 2, color: 'green' },
      { x: 1, y: 2, w: 2, color: 'yellow' },
      { x: 7, y: 1, w: 2, color: 'green' },
      { x: 7, y: 0, w: 2, color: 'yellow' },
    ],
    links: [
      { label: 'Live demo', url: '' },
      { label: 'Source code', url: '' },
    ],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: [
          '[Placeholder] What frustrated you about tracking money before?',
        ],
      },
      {
        title: 'What I Built',
        paragraphs: [
          '[Placeholder] Key features: categories, budgets, charts, and so on.',
        ],
        placeholder: 'Screenshot coming soon',
      },
      {
        title: 'The Result',
        paragraphs: [
          '[Placeholder] How you or others use it, and what you learned.',
        ],
      },
    ],
  },
]
