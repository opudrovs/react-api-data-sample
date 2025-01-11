/**
 * Provides a singleton instance of the Prisma Client for database access.
 * Ensures a single database connection is shared across the application.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;
