/**
 * Service for handling user authentication using Supabase
 * Matches POST /api/auth/login defined in openapi.yaml
 */

import { logError } from '../utils/logger.js';
import { supabaseClient } from '../utils/supabase-client.js';

/**
 * Logs in a user with the provided email and password credentials.
 * This function interacts with the Supabase authentication API to validate credentials.
 * If successful, it returns a JWT token which can be used for authenticated API requests.
 *
 * @param email - The user's email address used for login.
 * @param password - The user's password for authentication.
 * @returns A JWT token if successful, otherwise returns null.
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  // Call Supabase to sign in the user with provided credentials
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  // If there is an error or no session data, log and return null
  if (error != null || !data?.session) {
    logError('Login failed', error?.message ?? 'Unknown error');
    return null;
  }

  // Return the access token if login is successful
  return data.session.access_token;
};
