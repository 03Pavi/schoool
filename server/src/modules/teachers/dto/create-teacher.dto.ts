import { z } from 'zod';
export const CreateTeacherSchema = z.object({});
export type CreateTeacherDto = z.infer<typeof CreateTeacherSchema>;