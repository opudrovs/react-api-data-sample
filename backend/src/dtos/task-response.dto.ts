import { TaskPriority, TaskStatus } from '@prisma/client';

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
  deletedAt?: string | null;
  readOnly: boolean;
};
