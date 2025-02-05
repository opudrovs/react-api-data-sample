import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

/**
 * Logout button that triggers authentication logout.
 */
export const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout}>Log Out</Button>;
};
