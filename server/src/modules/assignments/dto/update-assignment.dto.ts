import { z } from 'zod';
import { CreateAssignmentSchema } from './create-assignment.dto';
export const UpdateAssignmentSchema = CreateAssignmentSchema.partial();
export type UpdateAssignmentDto = z.infer<typeof UpdateAssignmentSchema>;