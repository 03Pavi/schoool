"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassFirebaseRepository = void 0;
const firebase_1 = require("@/config/firebase");
const uuid_1 = require("uuid");
const COLLECTION = 'classes';
const memoryDb = new Map();
class ClassFirebaseRepository {
    async create(data) {
        const id = (0, uuid_1.v4)();
        const payload = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isArchived: false };
        if (firebase_1.db)
            await firebase_1.db.collection(COLLECTION).doc(id).set(payload);
        else
            memoryDb.set(id, payload);
        return payload;
    }
    async findById(id) {
        if (firebase_1.db) {
            const doc = await firebase_1.db.collection(COLLECTION).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return data.isArchived ? null : data;
        }
        const doc = memoryDb.get(id);
        return (doc && !doc.isArchived) ? doc : null;
    }
    async findAll(options = {}) {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;
        let items = [];
        let total = 0;
        if (firebase_1.db) {
            const snapshot = await firebase_1.db.collection(COLLECTION).where('isArchived', '==', false).orderBy('createdAt', 'desc').offset((page - 1) * limit).limit(limit).get();
            items = snapshot.docs.map(doc => doc.data());
            const totalSnap = await firebase_1.db.collection(COLLECTION).where('isArchived', '==', false).count().get();
            total = totalSnap.data().count;
        }
        else {
            items = Array.from(memoryDb.values()).filter(s => !s.isArchived);
            total = items.length;
            items = items.slice((page - 1) * limit, page * limit);
        }
        return { items, total, page, limit };
    }
    async update(id, data) {
        if (firebase_1.db) {
            const docRef = firebase_1.db.collection(COLLECTION).doc(id);
            const existing = await docRef.get();
            if (!existing.exists || existing.data()?.isArchived)
                throw new Error('Class not found');
            const updated = { ...existing.data(), ...data, updatedAt: new Date().toISOString() };
            await docRef.set(updated);
            return updated;
        }
        const existing = memoryDb.get(id);
        if (!existing || existing.isArchived)
            throw new Error('Class not found');
        const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
        memoryDb.set(id, updated);
        return updated;
    }
    async delete(id) {
        if (firebase_1.db) {
            const docRef = firebase_1.db.collection(COLLECTION).doc(id);
            const existing = await docRef.get();
            if (!existing.exists || existing.data()?.isArchived)
                throw new Error('Class not found');
            await docRef.update({ isArchived: true, deletedAt: new Date().toISOString() });
        }
        else {
            const existing = memoryDb.get(id);
            if (!existing || existing.isArchived)
                throw new Error('Class not found');
            memoryDb.set(id, { ...existing, isArchived: true });
        }
    }
}
exports.ClassFirebaseRepository = ClassFirebaseRepository;
