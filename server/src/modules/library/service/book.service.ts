import { IBookRepository } from '../repository/book.repository.interface';
import { Book } from '../types/book.type';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { QueryOptions } from '@/shared/interfaces/query-options';

export class BookService {
  constructor(private readonly repo: IBookRepository) {}

  async list(options?: QueryOptions) {
    return this.repo.findAll(options);
  }

  async get(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new Error('Book not found');
    return item;
  }

  async create(payload: CreateBookDto) {
    const data = { ...payload } as unknown as Book;
    return this.repo.create(data);
  }

  async update(id: string, payload: UpdateBookDto) {
    return this.repo.update(id, payload);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true, message: 'Deleted successfully' };
  }
}