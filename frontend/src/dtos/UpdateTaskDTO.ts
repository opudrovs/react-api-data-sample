import { TaskPriority, TaskStatus } from '@/types/taskTypes';

/**
 * Data Transfer Object for updating an existing task.
 * Provides flexibility for partial updates on task properties.
 */
export type UpdateTaskDTO = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  readOnly: boolean;
};
