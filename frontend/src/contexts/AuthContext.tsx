'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

import { API_URL } from '@/constants';
import { AuthContextType } from '@/types/auth';
import { logError } from '@/utils/logger';

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

  /**
   * Checks the current authentication status by making a request to the backend.
   * - If the response is successful, the user is authenticated.
   * - If an error occurs, logs the error but does not interrupt the app flow.
   * - Ensures authentication status is checked only once on initial load.
   */
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });

      setIsAuthenticated(response.ok);
    } catch (error) {
      logError('Error checking auth status', error);
    } finally {
      setIsAuthChecked(true);
    }
  };

  /**
   * Attempts to log the user in using email and password.
   * - Sends a login request to the backend.
   * - If successful, updates authentication state and redirects to the home page.
   * - Uses `window.location.href = '/'` to force a full page reload and ensure cookies are sent.
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const success = response.ok;
      if (success) {
        setIsAuthenticated(true);
        // Redirect to home page after login
        // Force a full page reload to ensure cookies are sent
        window.location.href = '/';
      }

      return success;
    } catch (error) {
      logError('Login error', error);
      return false;
    }
  };

  /**
   * Logs the user out by sending a logout request to the backend.
   * - Clears the authentication state.
   * - Redirects the user to the login page after logout.
   */
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
