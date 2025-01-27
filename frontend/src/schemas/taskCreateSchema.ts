import { z } from 'zod';
export const taskCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['Pending', 'Completed', 'In Progress']),
  priority: z.enum(['High', 'Medium', 'Low']),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  readOnly: z.boolean().optional(),
});
