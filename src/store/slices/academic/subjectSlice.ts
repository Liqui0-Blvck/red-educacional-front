// store/slices/subjectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../../../types/academic/subject';

export interface SubjectState {
  selectedSubject: Subject | null;
}

const initialState: SubjectState = {
  selectedSubject: null,
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSelectedSubject(state, action: PayloadAction<Subject>) {
      state.selectedSubject = action.payload;
    },
    clearSelectedSubject(state) {
      state.selectedSubject = null;
    },
  },
});

export const { setSelectedSubject, clearSelectedSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
