'use client';

import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { fetchApi } from '@/utils/fetchApi';
import { logError } from '@/utils/logger';

/**
 * Hook that automatically logs out the user when their session expires.
 *
 * - Periodically checks session validity with the backend.
 * - Logs out the user if the session is invalid or expired.
 */
export const useAutoLogout = (): void => {
  const { logout } = useAuth();

  useEffect(() => {
    const checkSessionValidity = async () => {
      try {
        await fetchApi('/api/auth/status');
      } catch (error) {
        logError('Session expired, logging out.', error);
        logout(); // Log out if session has expired or API fails
      }
    };

    // Run session check every 1 minute
    const interval = setInterval(checkSessionValidity, 60 * 1000);
    return () => clearInterval(interval);
  }, [logout]);
};
