import { useMantineColorScheme } from '@mantine/core';

import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useAutoLogout } from '@/hooks/useAutoLogout';

/**
 * Component to use Mantine hooks inside MantineProvider
 */
export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useMantineColorScheme();
  useAutoLogout();
  const { isAuthenticated, isAuthChecked } = useAuth();

  return (
    <div className={`min-h-screen ${colorScheme === 'dark' ? 'dark' : ''}`}>
      <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800">
        <ThemeToggle />
        {isAuthChecked && isAuthenticated && <LogoutButton />}
      </nav>
      <main>{children}</main>
    </div>
  );
}
