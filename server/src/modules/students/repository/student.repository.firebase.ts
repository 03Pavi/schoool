import { IStudentRepository } from './student.repository.interface';
import { Student } from '../types/student.type';
import { db } from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { QueryOptions } from '@/shared/interfaces/query-options';
import { PaginatedResult } from '@/shared/types/paginated-result';

const COLLECTION = 'students';

// Fallback in-memory DB if firebase is not configured
const memoryDb = new Map<string, Student>();

export class StudentFirebaseRepository implements IStudentRepository {
  async create(data: Student): Promise<Student> {
    const id = uuidv4();
    const timestamp = new Date().toISOString();
    const payload = {
      ...data,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
      isArchived: false,
    };
    
    if (db) {
      await db.collection(COLLECTION).doc(id).set(payload);
    } else {
      memoryDb.set(id, payload);
    }
    return payload;
  }

  async findById(id: string): Promise<Student | null> {
    if (db) {
      const doc = await db.collection(COLLECTION).doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data() as Student;
      if (data.isArchived) return null;
      return data;
    } else {
      const doc = memoryDb.get(id);
      return (doc && !doc.isArchived) ? doc : null;
    }
  }

  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<Student>> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    
    if (db) {
      let query = db.collection(COLLECTION).where('isArchived', '==', false) as any;
      if (options.search) {
        query = query.where('name', '>=', options.search).where('name', '<=', `${options.search}\uf8ff`);
      }
      const snapshot = await query
        .orderBy('createdAt', 'desc')
        .offset((page - 1) * limit)
        .limit(limit)
        .get();
      const items = snapshot.docs.map((doc: any) => doc.data() as Student);
      
      const totalSnap = await db.collection(COLLECTION).where('isArchived', '==', false).count().get();
      const total = totalSnap.data().count;
      
      return { items, total, page, limit };
    } else {
      let items = Array.from(memoryDb.values()).filter(s => !s.isArchived);
      if (options.search) {
        items = items.filter(s => s.name.toLowerCase().includes(options.search!.toLowerCase()));
      }
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const total = items.length;
      items = items.slice((page - 1) * limit, page * limit);
      return { items, total, page, limit };
    }
  }

  async update(id: string, data: Partial<Student>): Promise<Student> {
    const timestamp = new Date().toISOString();
    if (db) {
      const docRef = db.collection(COLLECTION).doc(id);
      const existing = await docRef.get();
      if (!existing.exists || existing.data()?.isArchived) {
        throw new Error('Student not found');
      }
      const updated = { ...existing.data(), ...data, updatedAt: timestamp };
      await docRef.set(updated);
      return updated as Student;
    } else {
      const existing = memoryDb.get(id);
      if (!existing || existing.isArchived) throw new Error('Student not found');
      const updated = { ...existing, ...data, updatedAt: timestamp };
      memoryDb.set(id, updated);
      return updated as Student;
    }
  }

  async delete(id: string): Promise<void> {
    if (db) {
      const docRef = db.collection(COLLECTION).doc(id);
      const existing = await docRef.get();
      if (!existing.exists || existing.data()?.isArchived) {
        throw new Error('Student not found');
      }
      await docRef.update({ isArchived: true, deletedAt: new Date().toISOString() });
    } else {
      const existing = memoryDb.get(id);
      if (!existing || existing.isArchived) throw new Error('Student not found');
      memoryDb.set(id, { ...existing, isArchived: true });
    }
  }
}