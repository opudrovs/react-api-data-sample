/**
 * Root Layout Component
 *
 * This component defines the global layout for the Next.js application.
 * - Wraps the entire app with the `Providers` component to manage global auth state and themes.
 * - Applies global styles for consistency across pages.
 * - Sets `<html>` tag attributes.
 *
 * All pages in the app are rendered inside this layout.
 */

import Providers from '@/components/Providers';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
