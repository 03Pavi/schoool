import { IBaseRepository } from '@/shared/interfaces/base-repository';
import { Student } from '../types/student.type';

export interface IStudentRepository extends IBaseRepository<Student> {
}