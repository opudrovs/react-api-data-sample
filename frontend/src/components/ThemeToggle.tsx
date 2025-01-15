import { Button, useMantineColorScheme } from '@mantine/core';
export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Button onClick={() => toggleColorScheme()}>
      Toggle {colorScheme === 'dark' ? 'Light' : 'Dark'} Mode
    </Button>
  );
};
