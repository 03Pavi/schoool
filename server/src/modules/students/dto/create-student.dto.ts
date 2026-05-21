import { z } from 'zod';

export const CreateStudentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  roll_number: z.string(),
  class_section: z.string(),
  enrollment_date: z.string(),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;