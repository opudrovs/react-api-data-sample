/**
 * Logs errors in development mode, and can be replaced with a logging service later.
 *
 * In the future, you can integrate Winston or another logging service:
 * Example: `winston.error(message, { error })`
 */

import { isDev } from '../config/env.js';

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
      `[Backend Error] ${message}`,
      error,
      context ? { context } : ''
    );
  } else {
    // Placeholder for future logging service like Winston åor Sentry
    // Example: logger.error(message, { error, context });
  }
};

/**
 * Logs general debug info in development.
 */
export const logInfo = (message: string) => {
  if (!isDev) {
    return;
  }

  console.log(`[Backend Info] ${message}`);
};
