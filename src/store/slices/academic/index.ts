import { combineReducers } from '@reduxjs/toolkit'
import course, { CourseState } from './courseSlice'
import subject, { SubjectState } from './subjectSlice'

const reducer = combineReducers({
  course,
  subject
})

export type AuthState = {
  course: CourseState
  subject: SubjectState
}


export default reducer