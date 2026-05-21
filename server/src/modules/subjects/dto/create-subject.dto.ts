import { z } from 'zod';
export const CreateSubjectSchema = z.object({});
export type CreateSubjectDto = z.infer<typeof CreateSubjectSchema>;