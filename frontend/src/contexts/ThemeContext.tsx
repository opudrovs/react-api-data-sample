'use client';

import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { createContext } from 'react';

import { ThemeContextType } from '@/types/theme';

/**
 * Creates a theme context with an initial `undefined` value.
 * The `ThemeProvider` component supplies the actual theme state.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Theme provider component that manages the application's theme state
 * and makes it available throughout the application.
 *
 * - Detects and provides the user's preferred theme (light or dark).
 * - Uses Mantine's `useComputedColorScheme` to dynamically determine the theme.
 * - Ensures consistent theme state across the application.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const { setColorScheme } = useMantineColorScheme();

  /** Toggles between light and dark theme */
  const toggleTheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme: computedColorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
