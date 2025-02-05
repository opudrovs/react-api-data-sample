import { ActionIcon } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import { useTheme } from '@/hooks/useTheme';

/**
 * Theme Toggle Component
 *
 * This component provides an icon button to toggle between light and dark themes
 * applying changes to both Mantine UI and Tailwind CSS.
 */
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ActionIcon
      onClick={toggleTheme}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      role="button"
      aria-pressed={theme === 'dark'}
    >
      {theme == 'dark' ? (
        <IconSun style={{ width: 18, height: 18 }} />
      ) : (
        <IconMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
};
