"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianService = void 0;
class GuardianService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async list(options) {
        return this.repo.findAll(options);
    }
    async get(id) {
        const item = await this.repo.findById(id);
        if (!item)
            throw new Error('Guardian not found');
        return item;
    }
    async create(payload) {
        const data = { ...payload };
        return this.repo.create(data);
    }
    async update(id, payload) {
        return this.repo.update(id, payload);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { success: true, message: 'Deleted successfully' };
    }
}
exports.GuardianService = GuardianService;
