import { TaskPriority, TaskStatus } from '@/types/task';

/**
 * TaskModel defines the structure of the Task entity as it exists in the database.
 * It represents the raw database model, not the transformed DTO used for API responses and requests.
 */
export type TaskModel = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt: Date;
  deletedAt: Date | null;
};
