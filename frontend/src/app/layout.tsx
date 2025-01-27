'use client';

import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core';
import dynamic from 'next/dynamic';

import { COLOR_SCHEME_KEY } from '@/constants';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/styles/globals.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: COLOR_SCHEME_KEY,
});

const InnerLayout = dynamic(() => import('@/components/InnerLayout'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MantineProvider
            theme={theme}
            colorSchemeManager={colorSchemeManager}
            withGlobalClasses
          >
            <InnerLayout>{children}</InnerLayout>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
