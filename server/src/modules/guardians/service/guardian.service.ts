import { IGuardianRepository } from '../repository/guardian.repository.interface';
import { Guardian } from '../types/guardian.type';
import { CreateGuardianDto } from '../dto/create-guardian.dto';
import { UpdateGuardianDto } from '../dto/update-guardian.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class GuardianService {
  constructor(private readonly repo: IGuardianRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Guardian not found');
    return item;
  }

  async create(payload: CreateGuardianDto) {
    const data = { ...payload } as unknown as Guardian;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateGuardianDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}