import { z } from 'zod';
export const CreateClipboardSchema = z.object({});
export type CreateClipboardDto = z.infer<typeof CreateClipboardSchema>;