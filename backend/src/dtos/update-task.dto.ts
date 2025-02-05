import { TaskPriority, TaskStatus } from '@prisma/client';

/**
 * Data Transfer Object for updating an existing task.
 * Provides flexibility for partial updates on tasks.
 */
export type UpdateTaskDTO = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
};
