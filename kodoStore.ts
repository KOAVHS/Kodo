import { create } from 'zustand'
import type { Roadmap, Level, TimePerDay } from '../constants/roadmaps'

interface OnboardingState {
  subject: string | null
  level: Level | null
  timePerDay: TimePerDay | null
}

interface UserState {
  token: string | null
  plan: 'free' | 'pro'
  name: string
  avatarUrl: string | null
}

interface RoadmapProgress {
  completedTopics: string[]  // topic ids completados
  currentWeekId: string | null
  currentTopicId: string | null
}

interface KodoStore {
  // auth
  user: UserState
  setUser: (user: Partial<UserState>) => void
  setToken: (token: string) => void
  logout: () => void

  // onboarding
  onboarding: OnboardingState
  setOnboarding: (data: Partial<OnboardingState>) => void
  resetOnboarding: () => void

  // roadmap activo
  activeRoadmap: Roadmap | null
  setActiveRoadmap: (roadmap: Roadmap) => void

  // progreso
  progress: RoadmapProgress
  completeTopic: (topicId: string) => void
  setCurrentTopic: (weekId: string, topicId: string) => void
}

const defaultOnboarding: OnboardingState = {
  subject: null,
  level: null,
  timePerDay: null,
}

const defaultUser: UserState = {
  token: null,
  plan: 'free',
  name: '',
  avatarUrl: null,
}

const defaultProgress: RoadmapProgress = {
  completedTopics: [],
  currentWeekId: null,
  currentTopicId: null,
}

export const useKodoStore = create<KodoStore>((set) => ({
  user: defaultUser,
  setUser: (data) =>
    set((state) => ({ user: { ...state.user, ...data } })),
  setToken: (token) =>
    set((state) => ({ user: { ...state.user, token } })),
  logout: () =>
    set({ user: defaultUser, activeRoadmap: null, progress: defaultProgress }),

  onboarding: defaultOnboarding,
  setOnboarding: (data) =>
    set((state) => ({ onboarding: { ...state.onboarding, ...data } })),
  resetOnboarding: () => set({ onboarding: defaultOnboarding }),

  activeRoadmap: null,
  setActiveRoadmap: (roadmap) => set({ activeRoadmap: roadmap }),

  progress: defaultProgress,
  completeTopic: (topicId) =>
    set((state) => ({
      progress: {
        ...state.progress,
        completedTopics: [...state.progress.completedTopics, topicId],
      },
    })),
  setCurrentTopic: (weekId, topicId) =>
    set((state) => ({
      progress: {
        ...state.progress,
        currentWeekId: weekId,
        currentTopicId: topicId,
      },
    })),
}))
