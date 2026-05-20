import { z } from 'zod'

export const createStudentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  rollNumber: z.string().min(3, 'Roll number must be at least 3 characters'),
  classSection: z.string().min(2, 'Class is required'),
  enrollmentDate: z.string().min(8, 'Enrollment date is required'),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
