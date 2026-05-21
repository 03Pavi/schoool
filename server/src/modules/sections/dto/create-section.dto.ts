import { z } from 'zod';
export const CreateSectionSchema = z.object({});
export type CreateSectionDto = z.infer<typeof CreateSectionSchema>;