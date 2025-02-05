/**
 * Middleware to authenticate users using Supabase session tokens stored in cookies.
 * Matches the security scheme `CookieAuth` defined in openapi.yaml.
 */

import { NextFunction, Request, Response } from 'express';

import { logError } from '../utils/logger.js';
import { supabaseClient } from '../utils/supabase-client.js';

/**
 * Middleware to verify the authenticity of a Supabase session token stored in cookies.
 * This ensures that only authenticated users can access protected routes.
 *
 * - Retrieves the authentication token (`authToken`) from HTTP cookies.
 * - Validates the token with Supabase.
 * - If the token is valid, assigns the authenticated user to `req.user`.
 * - If the token is missing, expired, or invalid, responds with a 401 Unauthorized error.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      res
        .status(401)
        .json({ message: 'Authentication required. Please log in.' });
      return;
    }

    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error || !data.user) {
      res
        .status(401)
        .json({ message: 'Invalid or expired session. Please log in again.' });
      return;
    }

    req.user = data.user;
    next();
  } catch (error) {
    logError('Unexpected authentication error', error);
    res.status(500).json({
      message:
        'An unexpected error occurred during authentication. Please try again later.',
    });
  }
};
