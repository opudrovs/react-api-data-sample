'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import { useState } from 'react';

import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';

import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [colorScheme] = useState('light');
  // const toggleColorScheme = () =>
  //   setColorScheme(colorScheme === 'light' ? 'dark' : 'light');

  const theme = createTheme({
    // TODO: create a theme
  });

  return (
    <MantineProvider theme={theme} withGlobalClasses>
      <div className={`min-h-screen ${colorScheme === 'dark' ? 'dark' : ''}`}>
        <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800">
          <ThemeToggle />
          <LogoutButton />
        </nav>
        <main>{children}</main>
      </div>
    </MantineProvider>
  );
}
