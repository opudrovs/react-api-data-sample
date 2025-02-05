/**
 * Loads environment variables from the .env file
 */

import dotenv from 'dotenv';

dotenv.config();

export const isDev = process.env.NODE_ENV === 'development';
