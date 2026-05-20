import { NextRequest, NextResponse } from 'next/server'
import { classes, gradesMaster, sections, subjectsMaster, teachers } from '../_data'
import { ok } from '@/shared/api/response'
import { fail } from '@/shared/api/response'
import { getRequestRole, hasPermission } from '@/shared/api/rbac'

export async function GET(request: NextRequest) {
  try {
    const role = getRequestRole(request)
    if (!role) return fail('Unauthorized', 401)
    const canView =
      hasPermission(role, 'grade:view') || hasPermission(role, 'subject:view') || hasPermission(role, 'class:view')
    if (!canView) return fail('Unauthorized', 401)

    if (role === 'teacher') {
      return ok('Academic metadata fetched', {
        grades: gradesMaster,
        classes,
        sections,
        subjects: subjectsMaster,
        teachers: teachers.slice(0, 1),
      })
    }

    if (role === 'student') {
      return ok('Academic metadata fetched', {
        grades: gradesMaster.slice(0, 1),
        classes: classes.slice(0, 1),
        sections: sections.slice(0, 1),
        subjects: subjectsMaster.slice(0, 2),
        teachers: [],
      })
    }

    return ok('Academic metadata fetched', {
      grades: gradesMaster,
      classes,
      sections,
      subjects: subjectsMaster,
      teachers,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to load academic metadata', error }, { status: 500 })
  }
}
