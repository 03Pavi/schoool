import { IBookRepository } from './book.repository.interface';
import { Book } from '../types/book.type';
import { db } from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions } from '@/shared/interfaces/query-options';
import { PaginatedResult } from '@/shared/types/paginated-result';

const COLLECTION = 'library';
const memoryDb = new Map<string, Book>();

export class BookFirebaseRepository implements IBookRepository {
  async create(data: Book): Promise<Book> {
    const id = uuidv4();
    const payload = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isArchived: false };
    if (db) await db.collection(COLLECTION).doc(id).set(payload);
    else memoryDb.set(id, payload);
    return payload;
  }

  async findById(id: string): Promise<Book | null> {
    if (db) {
      const doc = await db.collection(COLLECTION).doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data() as Book;
      return data.isArchived ? null : data;
    }
    const doc = memoryDb.get(id);
    return (doc && !doc.isArchived) ? doc : null;
  }

  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<Book>> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    let items: Book[] = [];
    let total = 0;
    
    if (db) {
      const snapshot = await db.collection(COLLECTION).where('isArchived', '==', false).orderBy('createdAt', 'desc').offset((page - 1) * limit).limit(limit).get();
      items = snapshot.docs.map(doc => doc.data() as Book);
      const totalSnap = await db.collection(COLLECTION).where('isArchived', '==', false).count().get();
      total = totalSnap.data().count;
    } else {
      items = Array.from(memoryDb.values()).filter(s => !s.isArchived);
      total = items.length;
      items = items.slice((page - 1) * limit, page * limit);
    }
    return { items, total, page, limit };
  }

  async update(id: string, data: Partial<Book>): Promise<Book> {
    if (db) {
      const docRef = db.collection(COLLECTION).doc(id);
      const existing = await docRef.get();
      if (!existing.exists || existing.data()?.isArchived) throw new Error('Book not found');
      const updated = { ...existing.data(), ...data, updatedAt: new Date().toISOString() };
      await docRef.set(updated);
      return updated as Book;
    }
    const existing = memoryDb.get(id);
    if (!existing || existing.isArchived) throw new Error('Book not found');
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    memoryDb.set(id, updated);
    return updated as Book;
  }

  async delete(id: string): Promise<void> {
    if (db) {
      const docRef = db.collection(COLLECTION).doc(id);
      const existing = await docRef.get();
      if (!existing.exists || existing.data()?.isArchived) throw new Error('Book not found');
      await docRef.update({ isArchived: true, deletedAt: new Date().toISOString() });
    } else {
      const existing = memoryDb.get(id);
      if (!existing || existing.isArchived) throw new Error('Book not found');
      memoryDb.set(id, { ...existing, isArchived: true });
    }
  }
}