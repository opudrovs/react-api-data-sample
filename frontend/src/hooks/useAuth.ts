'use client';

import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types/auth';

/**
 * Hook to access authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
