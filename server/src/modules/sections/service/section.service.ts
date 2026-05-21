import { ISectionRepository } from '../repository/section.repository.interface';
import { Section } from '../types/section.type';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class SectionService {
  constructor(private readonly repo: ISectionRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Section not found');
    return item;
  }

  async create(payload: CreateSectionDto) {
    const data = { ...payload } as unknown as Section;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateSectionDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}