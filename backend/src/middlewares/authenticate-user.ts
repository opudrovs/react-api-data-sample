/**
 * Middleware to authenticate users using Supabase JWT tokens.
 * Matches the security scheme BearerAuth defined in openapi.yaml
 */
import { NextFunction, Request, Response } from 'express';

import { supabaseClient } from '../utils/supabase-client.js';

/**
 * Middleware to verify the authenticity of a Supabase JWT token.
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization token required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = data.user;
    next();
  } catch (error) {
    console.error('Unexpected authentication error:', error);
    res.status(500).json({
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};
