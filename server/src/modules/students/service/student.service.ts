import { IStudentRepository } from '../repository/student.repository.interface';
import { Student } from '../types/student.type';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class StudentService {
  constructor(private readonly repo: IStudentRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const student = await this.repo.findById(id);
    if (!student) throw new Error('Student not found'); // Should map to NotFoundException
    return student;
  }

  async create(payload: CreateStudentDto) {
    const data: Student = {
      id: '',
      name: payload.name,
      email: payload.email,
      roll_number: payload.roll_number,
      class_section: payload.class_section,
      enrollment_date: payload.enrollment_date,
      createdAt: '',
      updatedAt: '',
      isArchived: false,
    };
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateStudentDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}