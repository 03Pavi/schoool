import { z } from 'zod';
import { CreateTeacherSchema } from './create-teacher.dto';
export const UpdateTeacherSchema = CreateTeacherSchema.partial();
export type UpdateTeacherDto = z.infer<typeof UpdateTeacherSchema>;