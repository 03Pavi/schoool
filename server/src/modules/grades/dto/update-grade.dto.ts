import { z } from 'zod';
import { CreateGradeSchema } from './create-grade.dto';
export const UpdateGradeSchema = CreateGradeSchema.partial();
export type UpdateGradeDto = z.infer<typeof UpdateGradeSchema>;