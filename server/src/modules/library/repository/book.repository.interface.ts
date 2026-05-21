import { IBaseRepository } from '@/shared/interfaces/base-repository';
import { Book } from '../types/book.type';

export interface IBookRepository extends IBaseRepository<Book> {}