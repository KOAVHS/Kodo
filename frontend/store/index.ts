/**
 * Root Store Configuration
 * Gestiona todo el estado global de la aplicación
 */

import { useKodoStore } from './kodoStore';

export const useAppStore = () => {
  const store = useKodoStore();

  return {
    // User management
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    setUser: store.setUser,
    logout: store.logout,

    // TODO: Agregar más slices del store según sea necesario
    // - roadmaps
    // - currentRoadmap
    // - stats
    // - goals
  };
};
