'use client';

import dynamic from 'next/dynamic';

import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core';

import '@/styles/globals.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export const COLOR_SCHEME_KEY = 'react-api-demo-color-scheme';

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
        <MantineProvider
          theme={theme}
          colorSchemeManager={colorSchemeManager}
          withGlobalClasses
        >
          <InnerLayout>{children}</InnerLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
