import { IGradeRepository } from '../repository/grade.repository.interface';
import { Grade } from '../types/grade.type';
import { CreateGradeDto } from '../dto/create-grade.dto';
import { UpdateGradeDto } from '../dto/update-grade.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class GradeService {
  constructor(private readonly repo: IGradeRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Grade not found');
    return item;
  }

  async create(payload: CreateGradeDto) {
    const data = { ...payload } as unknown as Grade;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateGradeDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}