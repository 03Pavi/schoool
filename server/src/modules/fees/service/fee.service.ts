import { IFeeRepository } from '../repository/fee.repository.interface';
import { Fee } from '../types/fee.type';
import { CreateFeeDto } from '../dto/create-fee.dto';
import { UpdateFeeDto } from '../dto/update-fee.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class FeeService {
  constructor(private readonly repo: IFeeRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Fee not found');
    return item;
  }

  async create(payload: CreateFeeDto) {
    const data = { ...payload } as unknown as Fee;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateFeeDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}