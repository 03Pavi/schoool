import { z } from 'zod';
import { CreateSubjectSchema } from './create-subject.dto';
export const UpdateSubjectSchema = CreateSubjectSchema.partial();
export type UpdateSubjectDto = z.infer<typeof UpdateSubjectSchema>;