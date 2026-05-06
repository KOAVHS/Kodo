import apiClient from './api';

export interface UserStats {
  totalMinutes: number;
  streakDays: number;
  completedSteps: number;
  currentSubject: string;
}

export const statsService = {
  getStats: async (): Promise<UserStats> => {
    return apiClient.get('/stats');
  },

  getWeeklyStats: async (): Promise<Record<string, number>> => {
    return apiClient.get('/stats/weekly');
  },

  recordStudySession: async (durationMinutes: number, subject: string): Promise<void> => {
    return apiClient.post('/stats/session', { durationMinutes, subject });
  },
};
