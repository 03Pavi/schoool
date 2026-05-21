import { baseApi as api } from "./base-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuth: build.mutation<PostAuthApiResponse, PostAuthApiArg>({
      query: (queryArg) => ({
        url: `/auth`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getStudents: build.query<GetStudentsApiResponse, GetStudentsApiArg>({
      query: (queryArg) => ({
        url: `/students`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    postStudents: build.mutation<PostStudentsApiResponse, PostStudentsApiArg>({
      query: (queryArg) => ({
        url: `/students`,
        method: "POST",
        body: queryArg.createStudentPayload,
      }),
    }),
    getStudentsById: build.query<
      GetStudentsByIdApiResponse,
      GetStudentsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/students/${queryArg.id}` }),
    }),
    patchStudentsById: build.mutation<
      PatchStudentsByIdApiResponse,
      PatchStudentsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/students/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.createStudentPayload,
      }),
    }),
    deleteStudentsById: build.mutation<
      DeleteStudentsByIdApiResponse,
      DeleteStudentsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/students/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getTeachers: build.query<GetTeachersApiResponse, GetTeachersApiArg>({
      query: (queryArg) => ({
        url: `/teachers`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    postTeachers: build.mutation<PostTeachersApiResponse, PostTeachersApiArg>({
      query: (queryArg) => ({
        url: `/teachers`,
        method: "POST",
        body: queryArg.teacherInput,
      }),
    }),
    getTeachersById: build.query<
      GetTeachersByIdApiResponse,
      GetTeachersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/teachers/${queryArg.id}` }),
    }),
    patchTeachersById: build.mutation<
      PatchTeachersByIdApiResponse,
      PatchTeachersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/teachers/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.teacherInput,
      }),
    }),
    deleteTeachersById: build.mutation<
      DeleteTeachersByIdApiResponse,
      DeleteTeachersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/teachers/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getGuardians: build.query<GetGuardiansApiResponse, GetGuardiansApiArg>({
      query: (queryArg) => ({
        url: `/guardians`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    postGuardians: build.mutation<
      PostGuardiansApiResponse,
      PostGuardiansApiArg
    >({
      query: (queryArg) => ({
        url: `/guardians`,
        method: "POST",
        body: queryArg.guardianInput,
      }),
    }),
    getGuardiansById: build.query<
      GetGuardiansByIdApiResponse,
      GetGuardiansByIdApiArg
    >({
      query: (queryArg) => ({ url: `/guardians/${queryArg.id}` }),
    }),
    patchGuardiansById: build.mutation<
      PatchGuardiansByIdApiResponse,
      PatchGuardiansByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/guardians/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.guardianInput,
      }),
    }),
    deleteGuardiansById: build.mutation<
      DeleteGuardiansByIdApiResponse,
      DeleteGuardiansByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/guardians/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getAcademicsMetadata: build.query<
      GetAcademicsMetadataApiResponse,
      GetAcademicsMetadataApiArg
    >({
      query: () => ({ url: `/academics/metadata` }),
    }),
    getGrades: build.query<GetGradesApiResponse, GetGradesApiArg>({
      query: () => ({ url: `/grades` }),
    }),
    postGrades: build.mutation<PostGradesApiResponse, PostGradesApiArg>({
      query: (queryArg) => ({
        url: `/grades`,
        method: "POST",
        body: queryArg.gradePayload,
      }),
    }),
    patchGrades: build.mutation<PatchGradesApiResponse, PatchGradesApiArg>({
      query: (queryArg) => ({
        url: `/grades`,
        method: "PATCH",
        body: queryArg.gradePayload,
        params: {
          id: queryArg.id,
        },
      }),
    }),
    deleteGrades: build.mutation<DeleteGradesApiResponse, DeleteGradesApiArg>({
      query: (queryArg) => ({
        url: `/grades`,
        method: "DELETE",
        params: {
          id: queryArg.id,
        },
      }),
    }),
    getClasses: build.query<GetClassesApiResponse, GetClassesApiArg>({
      query: () => ({ url: `/classes` }),
    }),
    postClasses: build.mutation<PostClassesApiResponse, PostClassesApiArg>({
      query: (queryArg) => ({
        url: `/classes`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    patchClasses: build.mutation<PatchClassesApiResponse, PatchClassesApiArg>({
      query: (queryArg) => ({
        url: `/classes`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteClasses: build.mutation<
      DeleteClassesApiResponse,
      DeleteClassesApiArg
    >({
      query: () => ({ url: `/classes`, method: "DELETE" }),
    }),
    getClassesByClassIdSections: build.query<
      GetClassesByClassIdSectionsApiResponse,
      GetClassesByClassIdSectionsApiArg
    >({
      query: (queryArg) => ({ url: `/classes/${queryArg.classId}/sections` }),
    }),
    postClassesByClassIdSections: build.mutation<
      PostClassesByClassIdSectionsApiResponse,
      PostClassesByClassIdSectionsApiArg
    >({
      query: (queryArg) => ({
        url: `/classes/${queryArg.classId}/sections`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    patchClassesByClassIdSectionsAndSectionId: build.mutation<
      PatchClassesByClassIdSectionsAndSectionIdApiResponse,
      PatchClassesByClassIdSectionsAndSectionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/classes/${queryArg.classId}/sections/${queryArg.sectionId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteClassesByClassIdSectionsAndSectionId: build.mutation<
      DeleteClassesByClassIdSectionsAndSectionIdApiResponse,
      DeleteClassesByClassIdSectionsAndSectionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/classes/${queryArg.classId}/sections/${queryArg.sectionId}`,
        method: "DELETE",
      }),
    }),
    getSubjects: build.query<GetSubjectsApiResponse, GetSubjectsApiArg>({
      query: (queryArg) => ({
        url: `/subjects`,
        params: {
          search: queryArg.search,
        },
      }),
    }),
    postSubjects: build.mutation<PostSubjectsApiResponse, PostSubjectsApiArg>({
      query: (queryArg) => ({
        url: `/subjects`,
        method: "POST",
        body: queryArg.subjectInput,
      }),
    }),
    deleteSubjectsById: build.mutation<
      DeleteSubjectsByIdApiResponse,
      DeleteSubjectsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/subjects/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getFees: build.query<GetFeesApiResponse, GetFeesApiArg>({
      query: (queryArg) => ({
        url: `/fees`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    postFees: build.mutation<PostFeesApiResponse, PostFeesApiArg>({
      query: (queryArg) => ({
        url: `/fees`,
        method: "POST",
        body: queryArg.feeInput,
      }),
    }),
    getFeesById: build.query<GetFeesByIdApiResponse, GetFeesByIdApiArg>({
      query: (queryArg) => ({ url: `/fees/${queryArg.id}` }),
    }),
    patchFeesById: build.mutation<
      PatchFeesByIdApiResponse,
      PatchFeesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/fees/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteFeesById: build.mutation<
      DeleteFeesByIdApiResponse,
      DeleteFeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/fees/${queryArg.id}`, method: "DELETE" }),
    }),
    getLibrary: build.query<GetLibraryApiResponse, GetLibraryApiArg>({
      query: (queryArg) => ({
        url: `/library`,
        params: {
          search: queryArg.search,
        },
      }),
    }),
    postLibrary: build.mutation<PostLibraryApiResponse, PostLibraryApiArg>({
      query: (queryArg) => ({
        url: `/library`,
        method: "POST",
        body: queryArg.bookInput,
      }),
    }),
    getLibraryById: build.query<
      GetLibraryByIdApiResponse,
      GetLibraryByIdApiArg
    >({
      query: (queryArg) => ({ url: `/library/${queryArg.id}` }),
    }),
    patchLibraryById: build.mutation<
      PatchLibraryByIdApiResponse,
      PatchLibraryByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/library/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteLibraryById: build.mutation<
      DeleteLibraryByIdApiResponse,
      DeleteLibraryByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/library/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getAssignments: build.query<
      GetAssignmentsApiResponse,
      GetAssignmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/assignments`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    postAssignments: build.mutation<
      PostAssignmentsApiResponse,
      PostAssignmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/assignments`,
        method: "POST",
        body: queryArg.assignmentInput,
      }),
    }),
    patchAssignments: build.mutation<
      PatchAssignmentsApiResponse,
      PatchAssignmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/assignments`,
        method: "PATCH",
        body: queryArg.body,
        params: {
          id: queryArg.id,
        },
      }),
    }),
    deleteAssignments: build.mutation<
      DeleteAssignmentsApiResponse,
      DeleteAssignmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/assignments`,
        method: "DELETE",
        params: {
          id: queryArg.id,
        },
      }),
    }),
    getClipboard: build.query<GetClipboardApiResponse, GetClipboardApiArg>({
      query: (queryArg) => ({
        url: `/clipboard`,
        params: {
          id: queryArg.id,
        },
      }),
    }),
    postClipboard: build.mutation<
      PostClipboardApiResponse,
      PostClipboardApiArg
    >({
      query: (queryArg) => ({
        url: `/clipboard`,
        method: "POST",
        body: queryArg.clipboardInput,
      }),
    }),
    getClipboardById: build.query<
      GetClipboardByIdApiResponse,
      GetClipboardByIdApiArg
    >({
      query: (queryArg) => ({ url: `/clipboard/${queryArg.id}` }),
    }),
    putClipboardById: build.mutation<
      PutClipboardByIdApiResponse,
      PutClipboardByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/clipboard/${queryArg.id}`,
        method: "PUT",
        body: queryArg.clipboardInput,
      }),
    }),
    deleteClipboardById: build.mutation<
      DeleteClipboardByIdApiResponse,
      DeleteClipboardByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/clipboard/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type PostAuthApiResponse =
  /** status 200 Successful authentication */ AuthResponseEnvelope;
export type PostAuthApiArg = {
  body: {
    email: string;
    password: string;
  };
};
export type GetStudentsApiResponse =
  /** status 200 List of students retrieved successfully */ StudentsListResponseEnvelope;
export type GetStudentsApiArg = {
  /** Current pagination page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
  /** Query filter match search term */
  search?: string;
  /** Column property field to sort by */
  sort?: string;
  /** Sort ordering direction */
  order?: "asc" | "desc";
};
export type PostStudentsApiResponse =
  /** status 201 Student created successfully */ StudentResponseEnvelope;
export type PostStudentsApiArg = {
  createStudentPayload: CreateStudentPayload;
};
export type GetStudentsByIdApiResponse =
  /** status 200 Details of the student retrieved successfully */ StudentResponseEnvelope;
export type GetStudentsByIdApiArg = {
  /** Unique student ID */
  id: string;
};
export type PatchStudentsByIdApiResponse =
  /** status 200 Student updated successfully */ StudentResponseEnvelope;
export type PatchStudentsByIdApiArg = {
  /** Unique student ID */
  id: string;
  createStudentPayload: CreateStudentPayload;
};
export type DeleteStudentsByIdApiResponse =
  /** status 200 Student deleted successfully */ MessageResponseEnvelope;
export type DeleteStudentsByIdApiArg = {
  /** Unique student ID */
  id: string;
};
export type GetTeachersApiResponse =
  /** status 200 List of teachers retrieved successfully */ TeachersListResponseEnvelope;
export type GetTeachersApiArg = {
  /** Current pagination page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
  /** Query filter match search term */
  search?: string;
};
export type PostTeachersApiResponse =
  /** status 201 Teacher created successfully */ TeacherResponseEnvelope;
export type PostTeachersApiArg = {
  teacherInput: TeacherInput;
};
export type GetTeachersByIdApiResponse =
  /** status 200 Details retrieved */ TeacherResponseEnvelope;
export type GetTeachersByIdApiArg = {
  id: string;
};
export type PatchTeachersByIdApiResponse =
  /** status 200 Updated successfully */ TeacherResponseEnvelope;
export type PatchTeachersByIdApiArg = {
  id: string;
  teacherInput: TeacherInput;
};
export type DeleteTeachersByIdApiResponse =
  /** status 200 Archived successfully */ MessageResponseEnvelope;
export type DeleteTeachersByIdApiArg = {
  id: string;
};
export type GetGuardiansApiResponse =
  /** status 200 List fetched */ GuardiansListResponseEnvelope;
export type GetGuardiansApiArg = {
  /** Current pagination page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
  /** Query filter match search term */
  search?: string;
};
export type PostGuardiansApiResponse =
  /** status 201 Guardian created successfully */ GuardianResponseEnvelope;
export type PostGuardiansApiArg = {
  guardianInput: GuardianInput;
};
export type GetGuardiansByIdApiResponse =
  /** status 200 Details retrieved */ GuardianResponseEnvelope;
export type GetGuardiansByIdApiArg = {
  id: string;
};
export type PatchGuardiansByIdApiResponse =
  /** status 200 Updated successfully */ GuardianResponseEnvelope;
export type PatchGuardiansByIdApiArg = {
  id: string;
  guardianInput: GuardianInput;
};
export type DeleteGuardiansByIdApiResponse =
  /** status 200 Deleted successfully */ MessageResponseEnvelope;
export type DeleteGuardiansByIdApiArg = {
  id: string;
};
export type GetAcademicsMetadataApiResponse =
  /** status 200 Metadata options retrieved successfully */ AcademicMetadataResponseEnvelope;
export type GetAcademicsMetadataApiArg = void;
export type GetGradesApiResponse =
  /** status 200 Grades fetched successfully */ GradesResponseEnvelope;
export type GetGradesApiArg = void;
export type PostGradesApiResponse =
  /** status 201 Grade created successfully */ GradeResponseEnvelope;
export type PostGradesApiArg = {
  gradePayload: GradePayload;
};
export type PatchGradesApiResponse =
  /** status 200 Grade updated successfully */ GradeResponseEnvelope;
export type PatchGradesApiArg = {
  id: string;
  gradePayload: GradePayload;
};
export type DeleteGradesApiResponse =
  /** status 200 Grade deleted successfully */ MessageResponseEnvelope;
export type DeleteGradesApiArg = {
  id: string;
};
export type GetClassesApiResponse =
  /** status 200 Classes list fetched successfully */ ClassesResponseEnvelope;
export type GetClassesApiArg = void;
export type PostClassesApiResponse =
  /** status 201 Class created successfully */ ClassResponseEnvelope;
export type PostClassesApiArg = {
  body: {
    name: string;
  };
};
export type PatchClassesApiResponse =
  /** status 200 Class updated successfully */ ClassResponseEnvelope;
export type PatchClassesApiArg = {
  body: {
    id: string;
    name: string;
  };
};
export type DeleteClassesApiResponse =
  /** status 200 Class deleted successfully */ MessageResponseEnvelope;
export type DeleteClassesApiArg = void;
export type GetClassesByClassIdSectionsApiResponse =
  /** status 200 Sections list fetched successfully */ SectionsResponseEnvelope;
export type GetClassesByClassIdSectionsApiArg = {
  /** ID of the class this section belongs to */
  classId: string;
};
export type PostClassesByClassIdSectionsApiResponse =
  /** status 201 Section created successfully */ SectionResponseEnvelope;
export type PostClassesByClassIdSectionsApiArg = {
  /** ID of the class this section belongs to */
  classId: string;
  body: {
    name: string;
  };
};
export type PatchClassesByClassIdSectionsAndSectionIdApiResponse =
  /** status 200 Section updated successfully */ SectionResponseEnvelope;
export type PatchClassesByClassIdSectionsAndSectionIdApiArg = {
  /** ID of the class this section belongs to */
  classId: string;
  /** ID of the section to manage */
  sectionId: string;
  body: {
    name: string;
  };
};
export type DeleteClassesByClassIdSectionsAndSectionIdApiResponse =
  /** status 200 Section deleted successfully */ MessageResponseEnvelope;
export type DeleteClassesByClassIdSectionsAndSectionIdApiArg = {
  /** ID of the class this section belongs to */
  classId: string;
  /** ID of the section to manage */
  sectionId: string;
};
export type GetSubjectsApiResponse =
  /** status 200 List fetched */ SubjectsListResponseEnvelope;
export type GetSubjectsApiArg = {
  /** Query filter match search term */
  search?: string;
};
export type PostSubjectsApiResponse =
  /** status 201 Subject created successfully */ SubjectResponseEnvelope;
export type PostSubjectsApiArg = {
  subjectInput: SubjectInput;
};
export type DeleteSubjectsByIdApiResponse =
  /** status 200 Deleted successfully */ MessageResponseEnvelope;
export type DeleteSubjectsByIdApiArg = {
  id: string;
};
export type GetFeesApiResponse =
  /** status 200 List of billing receipts retrieved */ FeesListResponseEnvelope;
export type GetFeesApiArg = {
  /** Current pagination page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
};
export type PostFeesApiResponse =
  /** status 201 Invoice created */ FeeResponseEnvelope;
export type PostFeesApiArg = {
  feeInput: FeeInput;
};
export type GetFeesByIdApiResponse =
  /** status 200 Details retrieved */ FeeResponseEnvelope;
export type GetFeesByIdApiArg = {
  id: string;
};
export type PatchFeesByIdApiResponse =
  /** status 200 Updated successfully */ FeeResponseEnvelope;
export type PatchFeesByIdApiArg = {
  id: string;
  body: {
    status?: "Paid" | "Unpaid" | "Pending";
  };
};
export type DeleteFeesByIdApiResponse =
  /** status 200 Voided successfully */ MessageResponseEnvelope;
export type DeleteFeesByIdApiArg = {
  id: string;
};
export type GetLibraryApiResponse =
  /** status 200 Catalog list retrieved */ BooksListResponseEnvelope;
export type GetLibraryApiArg = {
  /** Query filter match search term */
  search?: string;
};
export type PostLibraryApiResponse =
  /** status 201 Book added successfully */ BookResponseEnvelope;
export type PostLibraryApiArg = {
  bookInput: BookInput;
};
export type GetLibraryByIdApiResponse =
  /** status 200 Book details retrieved */ BookResponseEnvelope;
export type GetLibraryByIdApiArg = {
  id: string;
};
export type PatchLibraryByIdApiResponse =
  /** status 200 Updated successfully */ BookResponseEnvelope;
export type PatchLibraryByIdApiArg = {
  id: string;
  body: {
    status?: "Available" | "Borrowed";
  };
};
export type DeleteLibraryByIdApiResponse =
  /** status 200 Removed successfully */ MessageResponseEnvelope;
export type DeleteLibraryByIdApiArg = {
  id: string;
};
export type GetAssignmentsApiResponse =
  /** status 200 List fetched */ AssignmentsListResponseEnvelope;
export type GetAssignmentsApiArg = {
  /** Current pagination page index */
  page?: number;
  /** Number of records to return per page */
  limit?: number;
};
export type PostAssignmentsApiResponse =
  /** status 201 Created successfully */ AssignmentResponseEnvelope;
export type PostAssignmentsApiArg = {
  assignmentInput: AssignmentInput;
};
export type PatchAssignmentsApiResponse =
  /** status 200 Updated successfully */ AssignmentResponseEnvelope;
export type PatchAssignmentsApiArg = {
  id: string;
  body: {
    title?: string;
    status?: string;
  };
};
export type DeleteAssignmentsApiResponse =
  /** status 200 Deleted successfully */ MessageResponseEnvelope;
export type DeleteAssignmentsApiArg = {
  id: string;
};
export type GetClipboardApiResponse =
  /** status 200 Clipboard list or single item fetched */ ClipboardListResponseEnvelope;
export type GetClipboardApiArg = {
  id?: string;
};
export type PostClipboardApiResponse =
  /** status 201 Created successfully */ ClipboardResponseEnvelope;
export type PostClipboardApiArg = {
  clipboardInput: ClipboardInput;
};
export type GetClipboardByIdApiResponse =
  /** status 200 Clipboard details retrieved */ ClipboardResponseEnvelope;
export type GetClipboardByIdApiArg = {
  id: string;
};
export type PutClipboardByIdApiResponse =
  /** status 200 Updated successfully */ ClipboardResponseEnvelope;
export type PutClipboardByIdApiArg = {
  id: string;
  clipboardInput: ClipboardInput;
};
export type DeleteClipboardByIdApiResponse =
  /** status 200 Deleted successfully */ MessageResponseEnvelope;
export type DeleteClipboardByIdApiArg = {
  id: string;
};
export type AuthResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  };
};
export type ErrorEnvelope = {
  success?: boolean;
  message?: string;
};
export type Student = {
  id?: string;
  name?: string;
  email?: string;
  roll_number?: string;
  class_section?: string;
  enrollment_date?: string;
};
export type StudentsListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Student[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};
export type StudentResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Student;
};
export type CreateStudentPayload = {
  name: string;
  email: string;
  roll_number: string;
  class_section: string;
  enrollment_date: string;
};
export type MessageResponseEnvelope = {
  success?: boolean;
  message?: string;
};
export type TeacherInput = {
  name: string;
  email: string;
  teacher_id: string;
  phone?: string;
  qualifications?: string;
  department: string;
  joining_date?: string;
  assigned_classes?: string[];
  assigned_sections?: string[];
  assigned_subjects?: string[];
  status?: "Active" | "Archived";
};
export type Teacher = TeacherInput & {
  id?: string;
};
export type TeachersListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Teacher[];
};
export type TeacherResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Teacher;
};
export type GuardianInput = {
  name: string;
  email: string;
  phone: string;
  relation: string;
  student_id?: string;
};
export type Guardian = GuardianInput & {
  id?: string;
};
export type GuardiansListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Guardian[];
};
export type GuardianResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Guardian;
};
export type AcademicOption = {
  id?: string;
  name?: string;
};
export type AcademicMetadata = {
  grades?: AcademicOption[];
  classes?: AcademicOption[];
  sections?: AcademicOption[];
  subjects?: AcademicOption[];
  teachers?: AcademicOption[];
};
export type AcademicMetadataResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: AcademicMetadata;
};
export type GradeRow = {
  id?: string;
  name?: string;
  status?: "ACTIVE" | "INACTIVE";
  classes?: AcademicOption[];
  sections?: AcademicOption[];
  subjects?: AcademicOption[];
};
export type GradesResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: GradeRow[];
};
export type GradeResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: GradeRow;
};
export type GradePayload = {
  name: string;
  status?: "ACTIVE" | "INACTIVE";
  class_ids?: string[];
  section_ids?: string[];
  subject_ids?: string[];
};
export type ClassesResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: AcademicOption[];
};
export type ClassResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: AcademicOption;
};
export type SectionsResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: AcademicOption[];
};
export type SectionResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: AcademicOption;
};
export type SubjectInput = {
  name: string;
  code: string;
  department?: string;
};
export type Subject = SubjectInput & {
  id?: string;
};
export type SubjectsListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Subject[];
};
export type SubjectResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Subject;
};
export type FeeInput = {
  invoice_no: string;
  student: string;
  amount: string;
  due_date: string;
  status?: "Paid" | "Unpaid" | "Pending";
};
export type Fee = FeeInput & {
  id?: string;
};
export type FeesListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Fee[];
};
export type FeeResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Fee;
};
export type BookInput = {
  book_id: string;
  title: string;
  author: string;
  category: string;
  status?: "Available" | "Borrowed";
};
export type Book = BookInput & {
  id?: string;
};
export type BooksListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Book[];
};
export type BookResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Book;
};
export type AssignmentInput = {
  hw_code: string;
  title: string;
  class: string;
  due_date: string;
  status?: "Assigned" | "Graded" | "Pending";
};
export type Assignment = AssignmentInput & {
  id?: string;
};
export type AssignmentsListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Assignment[];
};
export type AssignmentResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: Assignment;
};
export type ClipboardInput = {
  title: string;
  content: string;
};
export type ClipboardItem = ClipboardInput & {
  id?: string;
  created_at?: string;
};
export type ClipboardListResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: ClipboardItem[];
};
export type ClipboardResponseEnvelope = {
  success?: boolean;
  message?: string;
  data?: ClipboardItem;
};
export const {
  usePostAuthMutation,
  useGetStudentsQuery,
  usePostStudentsMutation,
  useGetStudentsByIdQuery,
  usePatchStudentsByIdMutation,
  useDeleteStudentsByIdMutation,
  useGetTeachersQuery,
  usePostTeachersMutation,
  useGetTeachersByIdQuery,
  usePatchTeachersByIdMutation,
  useDeleteTeachersByIdMutation,
  useGetGuardiansQuery,
  usePostGuardiansMutation,
  useGetGuardiansByIdQuery,
  usePatchGuardiansByIdMutation,
  useDeleteGuardiansByIdMutation,
  useGetAcademicsMetadataQuery,
  useGetGradesQuery,
  usePostGradesMutation,
  usePatchGradesMutation,
  useDeleteGradesMutation,
  useGetClassesQuery,
  usePostClassesMutation,
  usePatchClassesMutation,
  useDeleteClassesMutation,
  useGetClassesByClassIdSectionsQuery,
  usePostClassesByClassIdSectionsMutation,
  usePatchClassesByClassIdSectionsAndSectionIdMutation,
  useDeleteClassesByClassIdSectionsAndSectionIdMutation,
  useGetSubjectsQuery,
  usePostSubjectsMutation,
  useDeleteSubjectsByIdMutation,
  useGetFeesQuery,
  usePostFeesMutation,
  useGetFeesByIdQuery,
  usePatchFeesByIdMutation,
  useDeleteFeesByIdMutation,
  useGetLibraryQuery,
  usePostLibraryMutation,
  useGetLibraryByIdQuery,
  usePatchLibraryByIdMutation,
  useDeleteLibraryByIdMutation,
  useGetAssignmentsQuery,
  usePostAssignmentsMutation,
  usePatchAssignmentsMutation,
  useDeleteAssignmentsMutation,
  useGetClipboardQuery,
  usePostClipboardMutation,
  useGetClipboardByIdQuery,
  usePutClipboardByIdMutation,
  useDeleteClipboardByIdMutation,
} = injectedRtkApi;
