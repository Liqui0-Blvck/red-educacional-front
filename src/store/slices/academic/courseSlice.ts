// store/slices/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../../types/academic/course';

export interface CourseState {
  selectedCourse: Course | null;
}

const initialState: CourseState = {
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setSelectedCourse(state, action: PayloadAction<Course>) {
      state.selectedCourse = action.payload;
    },
    clearSelectedCourse(state) {
      state.selectedCourse = null;
    },
  },
});

export const { setSelectedCourse, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
