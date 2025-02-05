/**
 * Type definition for Theme context.
 */
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
