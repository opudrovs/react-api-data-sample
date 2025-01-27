'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

import { API_URL } from '@/constants';

/**
 * Type definition for authentication context.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Creates an authentication context with an initial `undefined` value.
 * The `AuthProvider` component supplies the actual authentication state and functions.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Authentication provider component that manages user authentication state
 * and makes authentication-related functions available throughout the application.
 * - Works together with Next.js middleware to enforce authentication on protected routes.
 * - Manages login and logout functionality.
 * - Ensures authentication state is respected across client-side navigation.
 * - Handles automatic logout when the session expires.
 * - Provides a consistent authentication state for components and pages.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });

      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsAuthChecked(true);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      router.push('/'); // Redirect to home after login
    }
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    setIsAuthenticated(false);
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthChecked, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
