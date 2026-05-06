export type Level = 'zero' | 'basic' | 'intermediate'
export type TimePerDay = 15 | 30 | 60 | 120

export interface Topic {
  id: string
  title: string
  durationMin: number
}

export interface Week {
  id: string
  label: string
  topics: Topic[]
}

export interface Roadmap {
  subject: string
  level: Level
  timePerDay: TimePerDay
  totalWeeks: number
  weeks: Week[]
}

const ENGLISH_ZERO_1H: Roadmap = {
  subject: 'inglés',
  level: 'zero',
  timePerDay: 60,
  totalWeeks: 16,
  weeks: [
    {
      id: 'w1',
      label: 'semana 1–2',
      topics: [
        { id: 't1', title: 'alfabeto y pronunciación', durationMin: 60 },
        { id: 't2', title: 'saludos y presentaciones', durationMin: 60 },
      ],
    },
    {
      id: 'w2',
      label: 'semana 3–4',
      topics: [
        { id: 't3', title: 'vocabulario básico (100 palabras)', durationMin: 60 },
        { id: 't4', title: 'presente simple', durationMin: 60 },
        { id: 't5', title: 'números y fechas', durationMin: 60 },
      ],
    },
    {
      id: 'w3',
      label: 'semana 5–6',
      topics: [
        { id: 't6', title: 'plurales y artículos', durationMin: 60 },
        { id: 't7', title: 'preguntas básicas', durationMin: 60 },
      ],
    },
    {
      id: 'w4',
      label: 'semana 7–8',
      topics: [
        { id: 't8', title: 'verbos irregulares comunes', durationMin: 60 },
        { id: 't9', title: 'presente continuo', durationMin: 60 },
      ],
    },
    {
      id: 'w5',
      label: 'semana 9–10',
      topics: [
        { id: 't10', title: 'pasado simple', durationMin: 60 },
        { id: 't11', title: 'expresiones de tiempo', durationMin: 60 },
      ],
    },
    {
      id: 'w6',
      label: 'semana 11–12',
      topics: [
        { id: 't12', title: 'futuro con "will" y "going to"', durationMin: 60 },
        { id: 't13', title: 'vocabulario: trabajo y rutinas', durationMin: 60 },
      ],
    },
    {
      id: 'w7',
      label: 'semana 13–14',
      topics: [
        { id: 't14', title: 'conversación básica', durationMin: 60 },
        { id: 't15', title: 'comprensión de textos simples', durationMin: 60 },
      ],
    },
    {
      id: 'w8',
      label: 'semana 15–16',
      topics: [
        { id: 't16', title: 'repaso general', durationMin: 60 },
        { id: 't17', title: 'evaluación final', durationMin: 60 },
      ],
    },
  ],
}

const PYTHON_ZERO_1H: Roadmap = {
  subject: 'programación',
  level: 'zero',
  timePerDay: 60,
  totalWeeks: 20,
  weeks: [
    {
      id: 'w1',
      label: 'semana 1–2',
      topics: [
        { id: 't1', title: 'variables y tipos de datos', durationMin: 60 },
        { id: 't2', title: 'operaciones básicas', durationMin: 60 },
        { id: 't3', title: 'input y output', durationMin: 60 },
      ],
    },
    {
      id: 'w2',
      label: 'semana 3–4',
      topics: [
        { id: 't4', title: 'condicionales if/else', durationMin: 60 },
        { id: 't5', title: 'bucles for y while', durationMin: 60 },
      ],
    },
    {
      id: 'w3',
      label: 'semana 5–6',
      topics: [
        { id: 't6', title: 'funciones', durationMin: 60 },
        { id: 't7', title: 'listas y diccionarios', durationMin: 60 },
      ],
    },
    {
      id: 'w4',
      label: 'semana 7–8',
      topics: [
        { id: 't8', title: 'manejo de errores', durationMin: 60 },
        { id: 't9', title: 'archivos y lectura de datos', durationMin: 60 },
      ],
    },
    {
      id: 'w5',
      label: 'semana 9–10',
      topics: [
        { id: 't10', title: 'programación orientada a objetos', durationMin: 60 },
        { id: 't11', title: 'módulos y librerías', durationMin: 60 },
      ],
    },
  ],
}

const MATH_ZERO_1H: Roadmap = {
  subject: 'matemáticas',
  level: 'zero',
  timePerDay: 60,
  totalWeeks: 18,
  weeks: [
    {
      id: 'w1',
      label: 'semana 1–2',
      topics: [
        { id: 't1', title: 'números naturales y enteros', durationMin: 60 },
        { id: 't2', title: 'operaciones básicas', durationMin: 60 },
      ],
    },
    {
      id: 'w2',
      label: 'semana 3–4',
      topics: [
        { id: 't3', title: 'fracciones y decimales', durationMin: 60 },
        { id: 't4', title: 'porcentajes', durationMin: 60 },
      ],
    },
    {
      id: 'w3',
      label: 'semana 5–6',
      topics: [
        { id: 't5', title: 'álgebra básica', durationMin: 60 },
        { id: 't6', title: 'ecuaciones simples', durationMin: 60 },
      ],
    },
  ],
}

export const ROADMAPS: Record<string, Roadmap> = {
  'inglés-zero-60': ENGLISH_ZERO_1H,
  'programación-zero-60': PYTHON_ZERO_1H,
  'matemáticas-zero-60': MATH_ZERO_1H,
}

export function getRoadmap(
  subject: string,
  level: Level,
  timePerDay: TimePerDay
): Roadmap | null {
  const key = `${subject}-${level}-${timePerDay}`
  return ROADMAPS[key] ?? null
}

export const FREE_SUBJECTS = ['inglés', 'programación', 'matemáticas', 'diseño']
export const PRO_SUBJECT_LABEL = 'otro...'
