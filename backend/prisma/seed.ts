/**
 * Seed script to populate the database with read-only tasks for initial testing.
 * WARNING: Deletes existing tasks.
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import tasks from './tasks.js';

async function main() {
  console.log('Deleting all existing tasks...');
  await prisma.$executeRaw`TRUNCATE TABLE "Task" RESTART IDENTITY CASCADE;`;

  console.log('Seeding the database with editable and read-only tasks...');
  await prisma.task.createMany({ data: tasks });

  console.log('Seeding completed successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
