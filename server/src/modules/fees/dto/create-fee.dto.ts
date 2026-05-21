import { z } from 'zod';
export const CreateFeeSchema = z.object({});
export type CreateFeeDto = z.infer<typeof CreateFeeSchema>;