import { z } from 'zod';
import { CreateBookSchema } from './create-book.dto';
export const UpdateBookSchema = CreateBookSchema.partial();
export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;