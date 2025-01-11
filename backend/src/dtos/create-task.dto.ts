/**
 * Data Transfer Object for creating a new task.
 * Used to ensure consistent data structure in task creation requests.
 */
export type CreateTaskDTO = {
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  dueDate: string;
  readOnly: boolean;
};
