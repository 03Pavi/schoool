import { IAssignmentRepository } from '../repository/assignment.repository.interface';
import { Assignment } from '../types/assignment.type';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/update-assignment.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class AssignmentService {
  constructor(private readonly repo: IAssignmentRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Assignment not found');
    return item;
  }

  async create(payload: CreateAssignmentDto) {
    const data = { ...payload } as unknown as Assignment;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateAssignmentDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}