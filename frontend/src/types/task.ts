import { z } from 'zod';

import { createTaskSchema, updateTaskSchema } from '@/schemas/task';

/**
 * Enum types for TaskModel fields.
 */
export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Types for Task form data.
 */
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
