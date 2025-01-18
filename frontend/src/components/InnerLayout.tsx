import { useMantineColorScheme } from '@mantine/core';

import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * New Component to use Mantine hooks inside MantineProvider
 */
export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className={`min-h-screen ${colorScheme === 'dark' ? 'dark' : ''}`}>
      <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800">
        <ThemeToggle />
        <LogoutButton />
      </nav>
      <main>{children}</main>
    </div>
  );
}
