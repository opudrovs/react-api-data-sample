import { TaskPriority, TaskStatus } from '@prisma/client';

/**
 * TaskModel defines the structure of the Task entity as it exists in the database.
 * It represents the raw database model, not the transformed DTO used for external API responses.
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
  readOnly: boolean;
};
