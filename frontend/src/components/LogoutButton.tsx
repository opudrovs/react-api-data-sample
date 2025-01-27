import { Button } from '@mantine/core';

import { useAuth } from '@/hooks/useAuth';

/**
 * Logout button that triggers authentication logout.
 */
export const LogoutButton = () => {
  const { logout } = useAuth(); // No issue now

  return <Button onClick={logout}>Log Out</Button>;
};
