/**
 * Logging Utilities
 *
 * This module provides logging functions for handling errors and debugging information.
 * In development mode, logs are printed to the console.
 * In production, this module can be extended to integrate with logging services (e.g., Sentry, LogRocket).
 */

import { isDev } from '@/config/env';

/**
 * Logs errors in development mode, and can be replaced with a logging service later.
 */
export const logError = (
  message: string,
  error?: unknown,
  context?: Record<string, unknown>
) => {
  if (isDev) {
    console.error(
      `[Frontend Error] ${message}`,
      error,
      context ? { context } : ''
    );
  } else {
    // Placeholder for future logging service (e.g., Sentry, LogRocket)
    // Example: Sentry.captureException(error, { extra: context });
  }
};

/**
 * Logs general debug info in development.
 */
export const logInfo = (message: string) => {
  if (!isDev) {
    return;
  }

  console.log(`[Frontend Info] ${message}`);
};
