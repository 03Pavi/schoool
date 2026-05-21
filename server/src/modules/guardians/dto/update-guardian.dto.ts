import { z } from 'zod';
import { CreateGuardianSchema } from './create-guardian.dto';
export const UpdateGuardianSchema = CreateGuardianSchema.partial();
export type UpdateGuardianDto = z.infer<typeof UpdateGuardianSchema>;