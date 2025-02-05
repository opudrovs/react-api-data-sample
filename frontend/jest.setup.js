import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// Prevent hydration warnings in Jest (related to Next.js SSR)
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((message) => {
    if (message.includes('Warning: useLayoutEffect')) return;
    console.error(message);
  });
});

// Mock Next.js router globally
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

/**
 * Custom render function to wrap tested components with required providers.
 */
global.renderWithProviders = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AuthProvider>
        <MantineProvider withGlobalClasses>
          <ThemeProvider>{children}</ThemeProvider>
        </MantineProvider>
      </AuthProvider>
    ),
    ...options,
  });

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

global.mockPush = mockPush; // Expose mockPush globally for tests
