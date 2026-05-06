import { useKodoStore } from '@store/kodoStore';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout } = useKodoStore();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Implementar login
      // const { user } = await authService.login(email, password);
      // setUser(user);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      // TODO: Implementar registro
      // const { user } = await authService.register(email, password, username);
      // setUser(user);
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};
