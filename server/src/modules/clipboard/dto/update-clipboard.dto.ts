import { z } from 'zod';
import { CreateClipboardSchema } from './create-clipboard.dto';
export const UpdateClipboardSchema = CreateClipboardSchema.partial();
export type UpdateClipboardDto = z.infer<typeof UpdateClipboardSchema>;