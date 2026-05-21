import { IClipboardRepository } from '../repository/clipboard.repository.interface';
import { Clipboard } from '../types/clipboard.type';
import { CreateClipboardDto } from '../dto/create-clipboard.dto';
import { UpdateClipboardDto } from '../dto/update-clipboard.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class ClipboardService {
  constructor(private readonly repo: IClipboardRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Clipboard not found');
    return item;
  }

  async create(payload: CreateClipboardDto) {
    const data = { ...payload } as unknown as Clipboard;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateClipboardDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}