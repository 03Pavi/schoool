import { z } from 'zod';
import { CreateFeeSchema } from './create-fee.dto';
export const UpdateFeeSchema = CreateFeeSchema.partial();
export type UpdateFeeDto = z.infer<typeof UpdateFeeSchema>;