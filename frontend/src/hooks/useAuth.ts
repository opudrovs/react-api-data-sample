'use client';

import { useEffect, useState } from 'react';

/**
 * Custom React hook for managing user authentication state.
 * Uses cookie-based authentication instead of localStorage tokens.
 *
 * - Provides login and logout functions.
 * - Checks authentication status on mount.
 * - Updates `isAuthenticated` state based on session validity.
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus(); // Automatically check authentication status on load
  }, []);

  // Login function (uses cookies)
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensures cookies are sent and received
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
    }
  };

  // Logout function (clears session cookie)
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Ensures the auth cookie is cleared
    });

    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirect after logout
  };

  // Check authentication status (calls a protected endpoint)
  const checkAuthStatus = async () => {
    const response = await fetch('/api/auth/status', {
      method: 'GET',
      credentials: 'include', // Sends cookies to check session
    });

    setIsAuthenticated(response.ok);
  };

  return { isAuthenticated, login, logout };
};
