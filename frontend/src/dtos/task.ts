/**
 * Task DTOs (Data Transfer Objects)
 *
 * This module defines DTOs for task-related API requests and responses.
 * DTOs help enforce a consistent structure when exchanging data between
 * the frontend and backend.
 */

import { z } from 'zod';

import { createTaskSchema, updateTaskSchema } from '@/schemas/task';
import { TaskPriority, TaskStatus } from '@/types/task';

/**
 * Data Transfer Object for task responses.
 * Used when sending task data back to the client.
 */
export type TaskResponseDTO = {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

/**
 * Data Transfer Object for creating a new task.
 * Derived from `createTaskSchema` to ensure validation consistency.
 */
export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

/**
 * Data Transfer Object for updating an existing task.
 * Derived from `updateTaskSchema` to ensure validation consistency.
 */
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
