import { IClassRepository } from '../repository/class.repository.interface';
import { Class } from '../types/class.type';
import { CreateClassDto } from '../dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class ClassService {
  constructor(private readonly repo: IClassRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Class not found');
    return item;
  }

  async create(payload: CreateClassDto) {
    const data = { ...payload } as unknown as Class;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateClassDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}