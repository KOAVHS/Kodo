import apiClient from './api';

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // días
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  order: number;
  title: string;
  description: string;
  resources: string[];
  completed: boolean;
}

export const roadmapService = {
  getRoadmaps: async (): Promise<Roadmap[]> => {
    return apiClient.get('/roadmaps');
  },

  getRoadmap: async (id: string): Promise<Roadmap> => {
    return apiClient.get(`/roadmaps/${id}`);
  },

  generateRoadmap: async (subject: string, level: string, duration: number): Promise<Roadmap> => {
    return apiClient.post('/roadmaps/generate', { subject, level, duration });
  },

  completeStep: async (roadmapId: string, stepId: string): Promise<RoadmapStep> => {
    return apiClient.post(`/roadmaps/${roadmapId}/steps/${stepId}/complete`);
  },
};
