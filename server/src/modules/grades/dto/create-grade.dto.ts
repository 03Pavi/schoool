import { z } from 'zod';
export const CreateGradeSchema = z.object({});
export type CreateGradeDto = z.infer<typeof CreateGradeSchema>;