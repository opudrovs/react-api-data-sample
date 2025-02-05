/**
 * Defines constants used throughout the application
 */

// The base URL for API requests, defaulting to localhost if not provided
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// The localStorage key for saving the user's color scheme preference
export const COLOR_SCHEME_KEY = 'react-api-demo-color-scheme';
