/**
 * Authentication Schema
 *
 * This module defines validation rules for authentication-related forms using Zod.
 */

import { z } from 'zod';

// Ensures that login credentials meet the required format
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
