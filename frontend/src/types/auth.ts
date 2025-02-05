/**
 * Type definition for Authentication context.
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
