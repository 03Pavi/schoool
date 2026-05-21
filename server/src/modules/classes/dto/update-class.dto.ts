import { z } from 'zod';
import { CreateClassSchema } from './create-class.dto';
export const UpdateClassSchema = CreateClassSchema.partial();
export type UpdateClassDto = z.infer<typeof UpdateClassSchema>;