import { z } from 'zod';
export const CreateClassSchema = z.object({});
export type CreateClassDto = z.infer<typeof CreateClassSchema>;