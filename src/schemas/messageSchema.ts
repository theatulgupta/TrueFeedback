import { z } from 'zod';

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long.')
    .max(300, 'Content cannot exceed 300 characters long.'),
});
