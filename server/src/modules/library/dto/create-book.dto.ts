import { z } from 'zod';
export const CreateBookSchema = z.object({});
export type CreateBookDto = z.infer<typeof CreateBookSchema>;