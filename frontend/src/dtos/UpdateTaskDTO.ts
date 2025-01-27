/**
 * Data Transfer Object for updating an existing task.
 * Provides flexibility for partial updates on task properties.
 */
export type UpdateTaskDTO = {
  title?: string;
  description?: string | null;
  status?: string;
  priority?: string;
  dueDate?: string;
  readOnly: boolean;
};
