import apiClient from './api';

export interface GoalResponse {
  id: string;
  title: string;
  description: string;
  target_minutes: number;
  current_minutes: number;
  deadline: string;
}

export const goalService = {
  getGoals: async (): Promise<GoalResponse[]> => {
    return apiClient.get('/goals');
  },

  createGoal: async (
    title: string,
    description: string,
    targetMinutes: number,
    deadline: string
  ): Promise<GoalResponse> => {
    return apiClient.post('/goals', {
      title,
      description,
      target_minutes: targetMinutes,
      deadline,
    });
  },

  updateGoal: async (id: string, data: Partial<GoalResponse>): Promise<GoalResponse> => {
    return apiClient.put(`/goals/${id}`, data);
  },

  deleteGoal: async (id: string): Promise<void> => {
    return apiClient.delete(`/goals/${id}`);
  },
};
