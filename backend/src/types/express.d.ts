/**
 * Extends the standard Express types to include additional properties
 * for handling authenticated user data from Supabase.
 */
import { User } from '@supabase/supabase-js';

declare global {
  namespace Express {
    /**
     * Extends the Express Request object to include the `user` property.
     * The `user` can be either a valid Supabase `User` object, null, or undefined.
     */
    interface Request {
      user?: User | null; // Allows both null and undefined.
    }
  }
}
