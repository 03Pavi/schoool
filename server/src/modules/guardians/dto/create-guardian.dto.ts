import { z } from 'zod';
export const CreateGuardianSchema = z.object({});
export type CreateGuardianDto = z.infer<typeof CreateGuardianSchema>;