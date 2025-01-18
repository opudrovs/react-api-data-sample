'use client';

import { useEffect } from 'react';

import { useAuth } from './useAuth';

/**
 * Custom React hook that automatically logs out the user when their session expires.
 *
 * - Periodically checks session validity with the backend.
 * - Logs out the user if the session is invalid or expired.
 */
export const useAutoLogout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const checkSessionValidity = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent
        });

        if (!response.ok) {
          logout(); // Log out if session is no longer valid
        }
      } catch (error) {
        console.error('Error checking session status:', error);
        logout(); // Log out in case of any error (e.g. server is down)
      }
    };

    // Run the check every minute
    const sessionCheckInterval = setInterval(checkSessionValidity, 60000);

    // Run the check once when the hook mounts
    checkSessionValidity();

    return () => clearInterval(sessionCheckInterval);
  }, [logout]);
};
