import { Button } from '@mantine/core';

import { useAuth } from '@/hooks/useAuth';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={() => logout()}>Log Out</Button>;
};
