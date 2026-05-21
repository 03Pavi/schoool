import { z } from 'zod';
export const CreateAssignmentSchema = z.object({});
export type CreateAssignmentDto = z.infer<typeof CreateAssignmentSchema>;