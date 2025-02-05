/**
 * Manages user authentication using Supabase.
 * Matches POST /api/auth/login in openapi.yaml
 */

import { Request, Response } from 'express';

import { loginUser } from '../services/auth.service.js';
import { logError } from '../utils/logger.js';
import { supabaseClient } from '../utils/supabase-client.js';

/**
 * Handles user login and returns a JWT token if successful.
 * @param req - The Express request object containing login credentials.
 * @param res - The Express response object.
 */
export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const token = await loginUser(email, password);
    if (!token) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    logError('Unexpected login error', error);
    res.status(500).json({
      message:
        'An unexpected error occurred during the login process. Please try again later.',
    });
  }
};

/**
 * Handles user logout by clearing the authToken cookie
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const logoutHandler = (req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Handles authentication validation.
 * This is called by Next.js middleware to verify if the user is authenticated.
 *
 * @route GET /api/auth/validate
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} - 200 if authenticated, 401 if not
 */
export const validateAuthHandler = async (req: Request, res: Response) => {
  const authToken = req.cookies?.authToken;

  if (!authToken) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }

  // Validate token with Supabase
  const { data, error } = await supabaseClient.auth.getUser(authToken);

  if (error || !data.user) {
    res.status(401).json({ message: 'Invalid or expired session.' });
    return;
  }

  res.status(200).json({ message: 'Authenticated' });
};
