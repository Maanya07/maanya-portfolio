// Every kit in the vending machine.
// Sources: résumé (October 2026), plus the local repos ~/Jag-AI and ~/jarvis_local where noted.
//
// To add a project: copy an entry, give it a new `id` and `slot`, fill in the fields.
// Anything unconfirmed is marked with `missing` (shown as a note in `npm run dev`,
// "Details coming soon" in the built site). Nothing here is invented.
//
// MISSING / TO CONFIRM  (search this file for "MISSING")
// - Jarvis is private. Finance Tracker, NBA Stat Models, GameNite, and Solar Storm still need shareable source links.
// - "The Idea" (why you built it) for every project, and outcomes for Jag AI, Jarvis, Finance Tracker.
// - Jarvis: not on the résumé. Details come from brain.py; dates are from commit history (confirm).
// - GameNite and Solar Storm Classifier: not on the résumé and no repo found: no summary, dates, or stack yet.

import type { BrickColor } from '../components/bricks/palette'
import type { SceneKey } from '../components/bricks/scenes'

export interface BookletPage {
  title: string
  paragraphs: string[]
  /** What still needs writing on this page. */
  missing?: string
}

export interface ProjectLink {
  label: string
  /** '' = not available yet */
  url: string
}

export interface Project {
  id: string
  /** Code on the machine, e.g. 'A1' */
  slot: string
  name: string
  /** Shorter name for the machine slot, if `name` is long */
  shortName?: string
  subtitle?: string
  /** 'draft' = shown as "In the workshop" with no write-up */
  status: 'ready' | 'draft'
  period: string | null
  location: string | null
  /** Visible as soon as the kit opens */
  summary: string | null
  tech: string[]
  scene: SceneKey
  sceneLabel: string
  boxColor: BrickColor
  links: ProjectLink[]
  /** The Idea, What I Built, The Result */
  booklet: BookletPage[]
  missing?: string
}

export const projects: Project[] = [
  {
    id: 'jag-ai',
    slot: 'A1',
    name: 'Jag AI',
    subtitle: 'RAG-based personal assistant',
    status: 'ready',
    period: 'Jan 2026 – Present',
    location: 'Boston, MA',
    summary:
      'A RAG-based personal assistant that integrates Microsoft 365 data to generate daily email and calendar summaries and support natural-language document search.',
    // Résumé stack, plus Pinecone, Sentence Transformers, Gemini, and MSAL confirmed in ~/Jag-AI/backend/app.py
    tech: ['React', 'Flask', 'Python', 'Microsoft Graph API', 'MSAL', 'Pinecone', 'Sentence Transformers', 'Gemini 2.5 Flash'],
    scene: 'assistant',
    sceneLabel: 'Brick desk computer showing an email and its summary, next to a desk calendar',
    boxColor: 'blue',
    links: [{ label: 'GitHub repository', url: 'https://github.com/Maanya07/jag-ai' }],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: [
          'Turn Microsoft 365 data into daily email and calendar summaries, and make documents searchable in natural language.',
        ],
        missing: 'Why you built it and who it is for.',
      },
      {
        title: 'What I Built',
        paragraphs: [
          'Built a RAG-based personal assistant integrating Microsoft 365 data to generate daily email and calendar summaries and support natural-language document search.',
          'Implemented OAuth2 authentication and token-refresh logic through Microsoft Graph API to maintain secure, persistent access to personal data.',
          // From the repo (backend/app.py)
          'Under the hood, a Flask backend signs in with Microsoft through MSAL, pulls recent Outlook messages from Graph, embeds them with the all-MiniLM-L6-v2 sentence-transformer, and stores the vectors in Pinecone. Questions are answered by Gemini 2.5 Flash, using the closest matches as context.',
        ],
      },
      {
        title: 'The Result',
        paragraphs: ['In active development since January 2026.'],
        missing: 'Outcome, usage, or what you learned; a screenshot.',
      },
    ],
  },
  {
    id: 'jarvis',
    slot: 'A2',
    name: 'Jarvis',
    subtitle: 'Local voice assistant',
    status: 'ready',
    // From git commit dates in ~/jarvis_local (Mar 12–13, 2026). MISSING: confirm.
    period: 'Mar 2026',
    location: null,
    summary:
      'A voice assistant that runs on the laptop: it listens through the microphone, transcribes speech with Whisper, replies with Llama 3 through Ollama, and answers out loud.',
    // All confirmed in ~/jarvis_local/brain.py
    tech: ['Python', 'Whisper', 'Ollama', 'Llama 3', 'SpeechRecognition'],
    scene: 'voice',
    sceneLabel: 'Brick studio microphone on a stand, with sound waves and a speech bubble',
    boxColor: 'sky',
    links: [], // The Jarvis repo is private.
    booklet: [
      {
        title: 'The Idea',
        paragraphs: ['A hands-free assistant with a dry, Jarvis-style personality that keeps its answers to one short sentence.'],
        missing: 'Why you built it.',
      },
      {
        title: 'What I Built',
        paragraphs: [
          'A listen, transcribe, think, speak loop in Python: SpeechRecognition captures audio from the microphone, a local Whisper base model transcribes it, Llama 3 through Ollama writes the reply, and the macOS say command speaks it.',
          'A system prompt sets the persona and the length limit. Listening times out after 5 seconds of silence and caps each phrase at 10 seconds, so background noise does not freeze it. Saying “quit” or “shut down” powers it off.',
        ],
      },
      {
        title: 'The Result',
        paragraphs: [],
        missing: 'Outcome, a demo clip, or what you learned.',
      },
    ],
  },
  {
    id: 'finance-tracker',
    slot: 'A3',
    name: 'Personal Finance Tracker',
    shortName: 'Finance Tracker',
    subtitle: 'Spring Boot REST API',
    status: 'ready',
    period: 'Dec 2025 – Feb 2026',
    location: 'Manila, Philippines',
    summary:
      'A Java Spring Boot application exposing RESTful APIs for financial transactions, backed by a normalized PostgreSQL schema.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    scene: 'register',
    sceneLabel: 'Brick cash register printing a receipt, beside a stack of coins',
    boxColor: 'yellow',
    links: [{ label: 'Source code', url: '' }], // MISSING: repo URL (no local repo found)
    booklet: [
      {
        title: 'The Idea',
        paragraphs: ['A backend for recording and managing financial transactions through a REST API.'],
        missing: 'Why you built it.',
      },
      {
        title: 'What I Built',
        paragraphs: [
          'Developed a Java Spring Boot application exposing RESTful APIs, supporting full CRUD operations with Spring Data JPA.',
          'Designed a normalized PostgreSQL schema with indexed queries and validation rules; separated application logic using a Controller-Service-Repository architecture.',
        ],
      },
      {
        title: 'The Result',
        paragraphs: ['Handles 300+ financial transactions with full CRUD support.'],
        missing: 'What you learned; a screenshot or API example.',
      },
    ],
  },
  {
    id: 'nba-stats',
    slot: 'B1',
    name: 'NBA Stat Models',
    subtitle: 'Playmaking Analytics',
    status: 'ready',
    period: 'Nov 2025 – Dec 2025',
    location: 'Boston, MA',
    summary:
      'An analysis of 54 years of NBA season data, using assist-to-turnover metrics to evaluate generational changes in playmaking efficiency.',
    tech: ['Python', 'Pandas', 'scikit-learn'],
    scene: 'hoop',
    sceneLabel: 'Brick basketball hoop and ball beside a rising bar chart',
    boxColor: 'red',
    links: [{ label: 'Notebook', url: '' }], // MISSING: repo or notebook URL (no local repo found)
    booklet: [
      {
        title: 'The Idea',
        paragraphs: ['Evaluate how playmaking efficiency has changed across generations of NBA play.'],
        missing: 'What sparked the question.',
      },
      {
        title: 'What I Built',
        paragraphs: [
          'Cleaned and normalized 54 years of NBA season data and engineered assist-to-turnover metrics.',
          'Modeled nonlinear league-wide trends using polynomial regression.',
        ],
      },
      {
        title: 'The Result',
        paragraphs: ['The polynomial regression model achieved an R-squared value of 0.54.'],
        missing: 'Key findings about the trend; a chart.',
      },
    ],
  },
  {
    id: 'gamenite',
    slot: 'B2',
    name: 'GameNite',
    status: 'draft',
    period: null,
    location: null,
    summary: null,
    tech: [],
    scene: 'gameTable',
    sceneLabel: 'Brick game table with dice, a pawn, and a hand of cards',
    boxColor: 'green',
    links: [],
    booklet: [],
    missing: 'Not on the résumé: summary, dates, tech stack, links, and booklet pages.',
  },
  {
    id: 'solar-storm',
    slot: 'B3',
    name: 'Solar Storm Classifier',
    shortName: 'Solar Storm',
    status: 'draft',
    period: null,
    location: null,
    summary: null,
    tech: [],
    scene: 'satellite',
    sceneLabel: 'Brick satellite on a stand, with the sun sending out flares',
    boxColor: 'orange',
    links: [],
    booklet: [],
    missing: 'Not on the résumé: summary, dates, tech stack, links, and booklet pages.',
  },
  {
    id: 'prismlocal',
    slot: 'C1',
    name: 'PrismLocal',
    subtitle: 'On-device memory assistant',
    status: 'ready',
    period: 'Nov 2026',
    location: null,
    summary:
      'A HACK1984 team project that turns screenshots and voice notes into useful next steps. A local model interprets each capture, and the app shows what information was sent to web search.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Ollama', 'Tavily', 'Exa'],
    scene: 'assistant',
    sceneLabel: 'Brick workstation representing the PrismLocal capture and search interface',
    boxColor: 'sky',
    links: [{ label: 'Team repository', url: 'https://github.com/yashkava05/prismlocal-hack1984' }],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: ['Turn the things people save for later into next steps they can act on, while keeping the original captures on the device.'],
      },
      {
        title: 'How It Works',
        paragraphs: ['Our team built a workflow that interprets captures locally, creates short web search queries from public details, and returns useful links or actions. A privacy receipt shows what was sent out.'],
      },
      {
        title: 'The Result',
        paragraphs: ['The hackathon prototype supports screenshot and voice input, action cards, and a mode that keeps processing entirely offline.'],
      },
    ],
  },
  {
    id: 'java-chess',
    slot: 'C2',
    name: 'Java Chess',
    subtitle: 'Desktop chess prototype',
    status: 'ready',
    period: 'Feb 2026',
    location: null,
    summary: 'A desktop chess prototype with a clickable board and an object-oriented model for piece movement.',
    tech: ['Java', 'Swing', 'Object-Oriented Design'],
    scene: 'gameTable',
    sceneLabel: 'Brick tabletop with game pieces',
    boxColor: 'green',
    links: [{ label: 'Source code', url: 'https://github.com/Maanya07/chess' }],
    booklet: [
      {
        title: 'The Idea',
        paragraphs: ['Practice object-oriented design by turning piece movement rules into an interactive chess board.'],
      },
      {
        title: 'What I Built',
        paragraphs: ['Separated the board and piece rules from the Swing interface. The prototype supports click-to-move interaction and includes move validation for knights and rooks.'],
      },
      {
        title: 'The Result',
        paragraphs: ['A playable interface for exploring piece movement. Full chess rules and an AI opponent are outside the current prototype.'],
      },
    ],
  },
]
