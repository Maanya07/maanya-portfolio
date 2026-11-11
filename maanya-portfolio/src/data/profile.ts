// Personal details, experience, and skills. Source of truth: résumé (October 2026).
//
// MISSING / TO CONFIRM
// - minifig: hair/torso/leg colors are placeholders, not based on how you look.
// - Phone number is intentionally left off the site (it is still inside the résumé PDF).

import type { BrickColor } from '../components/bricks/palette'
import type { PieceKey } from '../components/station/pieces'

export interface Role {
  company: string
  title: string
  location: string
  dates: string
  /** The minifigure part this role adds in the Experience station (art lives in components/station/pieces.tsx) */
  piece: PieceKey
  /** Visible name of that part */
  pieceName: string
  points: string[]
}

export const profile = {
  name: 'Maanya Jagannathan',
  handle: 'Maanya07',
  intro:
    'I study computer science at Northeastern and minor in economics. I like building tools I’d use myself, like a tracker that helps me see where my money goes or an assistant that finds answers buried in documents. Here’s a look at what I’ve built so far.',
  education: {
    school: 'Northeastern University',
    degree: 'B.S. in Computer Science',
    minor: 'Economics',
    graduation: 'May 2028',
    location: 'Boston, MA',
  },
  links: {
    resume: '/Maanya-Jagannathan-Resume.pdf',
    github: 'https://github.com/Maanya07',
    githubLabel: 'github.com/Maanya07',
    linkedin: 'https://www.linkedin.com/in/maanya-jagannathan',
    linkedinLabel: 'in/maanya-jagannathan',
    email: 'jagannathan.maa@northeastern.edu',
  },
  // MISSING: placeholder colors. Pick ones that feel like you.
  minifig: { hair: 'darkBrown', torso: 'red', legs: 'blue' } satisfies Record<string, BrickColor>,
  interests: ['Chess', 'Piano', 'Reading', 'Pilates'],
}

export const experience: Role[] = [
  {
    company: 'Northeastern Peer Tutoring',
    title: 'Peer Tutor and AI Initiative Developer',
    location: 'Boston, MA',
    dates: 'Mar 2026 – Present',
    piece: 'notebook',
    pieceName: 'Calculus notebook',
    points: [
      'Created a tutor resource assistant in Claude Projects, organizing materials and policies from 10+ documents into an interactive interface for new tutors.',
      'Updated tutor training content across 3 topics, modernizing outdated guidance and adding standards on ethical AI use.',
      'Tutor 20+ students in Calculus I and II, creating personalized explanations and visual study materials to strengthen their understanding of technical concepts.',
    ],
  },
  {
    company: 'Tata Insights and Quants (iQ)',
    title: 'Data Analytics Intern',
    location: 'Bengaluru, India',
    dates: 'May 2025 – Aug 2025',
    piece: 'chart',
    pieceName: 'Chart tile',
    points: [
      'Engineered an ESG perception chatbot using Ollama that synthesized compliance data from 400+ external sources, automating quarterly reporting workflows.',
      'Designed and built a Power BI dashboard to track seed placement, sales trends, and regional performance across 16 states and 100+ districts, enabling data-driven harvest decisions for FY25-26.',
      'Conducted intern benchmark analysis comparing benefits with peer companies; synthesized results and presented 5 recommendations to the Head of HR for future talent engagement strategies.',
    ],
  },
  {
    company: 'Sattva Consulting',
    title: 'Knowledge Institute Intern',
    location: 'Bengaluru, India',
    dates: 'May 2024 – Jun 2024',
    piece: 'headset',
    pieceName: 'Interview headset',
    points: [
      'Interviewed 15+ incubators, CSR teams, and founders to identify execution challenges, gaining first-hand exposure to client consulting and stakeholder management.',
      'Co-authored monthly knowledge publications encompassing CSR trends, incubator challenges, and social enterprise practices to inform client strategy.',
      'Reorganized a central project database of 300+ initiatives, improving accessibility and reducing retrieval time by 50%.',
    ],
  },
  {
    company: 'Hitachi Philippines',
    title: 'Digital Operations Intern',
    location: 'Manila, Philippines',
    dates: 'May 2023',
    piece: 'lanyard',
    pieceName: 'Event lanyard',
    points: [
      'Automated event coordination workflows for 200+ attendee company events reducing manual scheduling and communication overhead for recurring processes.',
      'Designed digital recruitment materials and managed applicant tracking systems for hiring across 5+ countries.',
    ],
  },
]

export interface PartGroup {
  title: string
  color: BrickColor
  items: string[]
}

export const inventory: PartGroup[] = [
  { title: 'Languages', color: 'red', items: ['Java', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'] },
  {
    title: 'Frameworks & Libraries',
    color: 'blue',
    items: ['Spring Boot', 'Flask', 'React', 'React Native', 'Pandas', 'NumPy', 'scikit-learn'],
  },
  {
    title: 'Tools & Databases',
    color: 'yellow',
    items: ['PostgreSQL', 'OAuth2', 'REST APIs', 'JUnit', 'Git', 'Ollama', 'Power BI', 'Microsoft Graph API', 'Pinecone', 'AWS'],
  },
  {
    title: 'Coursework',
    color: 'white',
    items: ['Algorithms', 'Machine Learning', 'Linear Algebra', 'Object-Oriented Design', 'Computer Systems', 'Data Science'],
  },
  {
    title: 'Campus',
    color: 'darkGray',
    items: ['Kaleidoscope Council', 'Disrupt (FinTech club): Quant Team', 'Women in Tech'],
  },
  {
    title: 'Training',
    color: 'lightGray',
    items: ['AWS Academy Cloud Foundations', 'AWS Academy Cloud Architecting'],
  },
]
