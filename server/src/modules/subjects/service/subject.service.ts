import { ISubjectRepository } from '../repository/subject.repository.interface';
import { Subject } from '../types/subject.type';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { UpdateSubjectDto } from '../dto/update-subject.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class SubjectService {
  constructor(private readonly repo: ISubjectRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Subject not found');
    return item;
  }

  async create(payload: CreateSubjectDto) {
    const data = { ...payload } as unknown as Subject;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateSubjectDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}