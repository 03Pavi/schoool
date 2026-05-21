"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentFirebaseRepository = void 0;
const firebase_1 = require("@/config/firebase");
const uuid_1 = require("uuid");
const COLLECTION = 'students';
// Fallback in-memory DB if firebase is not configured
const memoryDb = new Map();
class StudentFirebaseRepository {
    async create(data) {
        const id = (0, uuid_1.v4)();
        const timestamp = new Date().toISOString();
        const payload = {
            ...data,
            id,
            createdAt: timestamp,
            updatedAt: timestamp,
            isArchived: false,
        };
        if (firebase_1.db) {
            await firebase_1.db.collection(COLLECTION).doc(id).set(payload);
        }
        else {
            memoryDb.set(id, payload);
        }
        return payload;
    }
    async findById(id) {
        if (firebase_1.db) {
            const doc = await firebase_1.db.collection(COLLECTION).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            if (data.isArchived)
                return null;
            return data;
        }
        else {
            const doc = memoryDb.get(id);
            return (doc && !doc.isArchived) ? doc : null;
        }
    }
    async findAll(options = {}) {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;
        if (firebase_1.db) {
            let query = firebase_1.db.collection(COLLECTION).where('isArchived', '==', false);
            if (options.search) {
                query = query.where('name', '>=', options.search).where('name', '<=', `${options.search}\uf8ff`);
            }
            const snapshot = await query
                .orderBy('createdAt', 'desc')
                .offset((page - 1) * limit)
                .limit(limit)
                .get();
            const items = snapshot.docs.map((doc) => doc.data());
            const totalSnap = await firebase_1.db.collection(COLLECTION).where('isArchived', '==', false).count().get();
            const total = totalSnap.data().count;
            return { items, total, page, limit };
        }
        else {
            let items = Array.from(memoryDb.values()).filter(s => !s.isArchived);
            if (options.search) {
                items = items.filter(s => s.name.toLowerCase().includes(options.search.toLowerCase()));
            }
            items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            const total = items.length;
            items = items.slice((page - 1) * limit, page * limit);
            return { items, total, page, limit };
        }
    }
    async update(id, data) {
        const timestamp = new Date().toISOString();
        if (firebase_1.db) {
            const docRef = firebase_1.db.collection(COLLECTION).doc(id);
            const existing = await docRef.get();
            if (!existing.exists || existing.data()?.isArchived) {
                throw new Error('Student not found');
            }
            const updated = { ...existing.data(), ...data, updatedAt: timestamp };
            await docRef.set(updated);
            return updated;
        }
        else {
            const existing = memoryDb.get(id);
            if (!existing || existing.isArchived)
                throw new Error('Student not found');
            const updated = { ...existing, ...data, updatedAt: timestamp };
            memoryDb.set(id, updated);
            return updated;
        }
    }
    async delete(id) {
        if (firebase_1.db) {
            const docRef = firebase_1.db.collection(COLLECTION).doc(id);
            const existing = await docRef.get();
            if (!existing.exists || existing.data()?.isArchived) {
                throw new Error('Student not found');
            }
            await docRef.update({ isArchived: true, deletedAt: new Date().toISOString() });
        }
        else {
            const existing = memoryDb.get(id);
            if (!existing || existing.isArchived)
                throw new Error('Student not found');
            memoryDb.set(id, { ...existing, isArchived: true });
        }
    }
}
exports.StudentFirebaseRepository = StudentFirebaseRepository;
