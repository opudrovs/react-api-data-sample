'use client';

import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

import { InnerLayout } from '@/components/InnerLayout';
import { COLOR_SCHEME_KEY } from '@/constants';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
  fontSizes: {
    // Increase default font sizes by 2px for readability
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '24px',
  },
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: COLOR_SCHEME_KEY,
});

/**
 * Providers Component
 *
 * This component wraps the entire application with essential providers.
 * - Ensures proper context management and UI theming.
 * - Handles authentication and theme persistence across the app.
 * - Checks for hydration to prevent SSR-related issues.
 *
 * Features:
 * - `AuthProvider`: Manages user authentication state.
 * - `MantineProvider`: Provides Mantine UI theme and styling utilities.
 * - `ThemeProvider`: Manages dark/light mode selection.
 * - `Notifications`: Displays in-app notifications.
 * - `InnerLayout`: Ensures a consistent layout across all app pages.
 * - Uses `useState` and `useEffect` to prevent UI mismatches between server and client rendering.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent rendering before hydration
  if (!isHydrated) return null;

  return (
    <AuthProvider>
      <MantineProvider
        theme={theme}
        colorSchemeManager={colorSchemeManager}
        withGlobalClasses
        defaultColorScheme="dark"
      >
        <Notifications position="bottom-right" zIndex={1000} />
        <ThemeProvider>
          <InnerLayout>{children}</InnerLayout>
        </ThemeProvider>
      </MantineProvider>
    </AuthProvider>
  );
}
