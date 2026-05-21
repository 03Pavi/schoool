"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
class StudentService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async list(options) {
        return this.repo.findAll(options);
    }
    async get(id) {
        const student = await this.repo.findById(id);
        if (!student)
            throw new Error('Student not found'); // Should map to NotFoundException
        return student;
    }
    async create(payload) {
        const data = {
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
    async update(id, payload) {
        return this.repo.update(id, payload);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { success: true, message: 'Deleted successfully' };
    }
}
exports.StudentService = StudentService;
