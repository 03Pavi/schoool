import { ITeacherRepository } from '../repository/teacher.repository.interface';
import { Teacher } from '../types/teacher.type';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class TeacherService {
  constructor(private readonly repo: ITeacherRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Teacher not found');
    return item;
  }

  async create(payload: CreateTeacherDto) {
    const data = { ...payload } as unknown as Teacher;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateTeacherDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}