/**
 * Task Management Schemas
 *
 * This module defines validation rules for task creation and updates using Zod.
 * It ensures that task attributes conform to the expected format before submission.
 */

import { z } from 'zod';

// Validates input for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['TO_DO', 'IN_PROGRESS', 'PENDING', 'COMPLETED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

// Validates input for updating an existing task
export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['TO_DO', 'IN_PROGRESS', 'PENDING', 'COMPLETED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});
