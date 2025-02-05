/**
 * Initializes and exports a single instance of the Supabase client.
 * The Supabase client provides methods for database operations, authentication,
 * and storage interactions. Using a singleton ensures consistent usage and prevents
 * multiple instances from being created across the application.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables for security
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Validate if they are correctly loaded
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Anon Key is missing in the .env file');
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
