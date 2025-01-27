'use client';

import { useEffect } from 'react';

import { API_URL } from '@/constants';
import { useAuth } from '@/hooks/useAuth';

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
        const response = await fetch(API_URL + '/api/auth/status', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent
        });

        if (!response.ok) {
          logout(); // Log out if session is expired
        }
      } catch (error) {
        console.error('Error checking session status:', error);
        logout();
      }
    };

    // Run session check every 1 minute
    const interval = setInterval(checkSessionValidity, 60000);
    return () => clearInterval(interval);
  }, [logout]);
};
