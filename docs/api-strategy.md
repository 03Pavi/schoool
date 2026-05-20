# ERP API Strategy

## Principles
- REST, resource-based routes
- Modular route groups under `src/app/api/*`
- Consistent response envelope for success/error
- Role/permission enforcement on protected routes
- Standard list-query contract (`page`, `limit`, `search`, `sort`, `order`)
- Filter-friendly endpoints instead of deep nested routes

## Route Topology
- `/api/auth`
- `/api/students`
- `/api/teachers`
- `/api/guardians`
- `/api/grades`
- `/api/classes`
- `/api/subjects`
- `/api/attendance`
- `/api/assignments`
- `/api/exams`
- `/api/roles`
- `/api/permissions`
- `/api/dashboard/*`

## Response Contract
```ts
export type ApiResponse<T> = {
  success: boolean
  message: string
  data?: T
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}
```

## List Query Contract
- `?page=1`
- `?limit=10`
- `?search=...`
- `?sort=name`
- `?order=asc|desc`

## Security Contract
All protected routes must validate:
1. Authentication (`x-user-role` + identity context)
2. Permission (`requirePermission('grade:create')`)
3. Ownership / assignment scope where applicable

## HTTP Semantics
- `GET` for reads
- `POST` for create/actions
- `PATCH` for partial updates
- `DELETE` for delete
