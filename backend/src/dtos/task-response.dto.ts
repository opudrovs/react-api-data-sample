/**
 * Data Transfer Object for task responses.
 * Used when sending task data back to the client.
 */
export type TaskResponseDTO = {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  dueDate: string;
  deletedAt?: string | null;
  readOnly: boolean;
};
