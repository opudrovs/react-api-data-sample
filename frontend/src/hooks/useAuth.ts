'use client';

import { useEffect, useRef, useState } from 'react';

export const useAuth = () => {
  const tokenRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      tokenRef.current = window.localStorage.getItem('token');
      setToken(tokenRef.current);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (typeof window === 'undefined') {
      return;
    }

    tokenRef.current = data.token;
    window.localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  const logout = (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    tokenRef.current = null;
    window.localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  };

  return { token, login, logout };
};
