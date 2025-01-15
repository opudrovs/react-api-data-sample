'use client';

import { useEffect } from 'react';

import { useAuth } from './useAuth';

export const useAutoLogout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    const tokenExpiryCheck = setInterval(() => {
      const token =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('token')
          : '';
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        }
      }
    }, 60000);
    return () => clearInterval(tokenExpiryCheck);
  }, [logout]);
};
