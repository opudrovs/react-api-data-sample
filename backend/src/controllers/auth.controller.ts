/**
 * Manages user authentication using Supabase.
 * Matches POST /api/auth/login in openapi.yaml
 */
import { Request, Response } from 'express';

import { logInUser } from '../services/auth.service.js';

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

    const token = await logInUser(email, password);
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
    console.error('Unexpected login error:', error);
    res.status(500).json({
      message:
        'An unexpected error occurred during the login process. Please try again later.',
    });
  }
};

/**
 * Handles user logout by clearing the authToken cookie
 */
export const logoutHandler = (req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
