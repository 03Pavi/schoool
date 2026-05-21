import { z } from 'zod';
import { CreateSectionSchema } from './create-section.dto';
export const UpdateSectionSchema = CreateSectionSchema.partial();
export type UpdateSectionDto = z.infer<typeof UpdateSectionSchema>;