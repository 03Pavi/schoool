import { z } from 'zod';
import { CreateStudentSchema } from './create-student.dto';

export const UpdateStudentSchema = CreateStudentSchema.partial();
export type UpdateStudentDto = z.infer<typeof UpdateStudentSchema>;