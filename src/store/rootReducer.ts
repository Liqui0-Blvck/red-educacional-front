// rootReducer.ts
import { combineReducers, Reducer, AnyAction } from 'redux';
import auth, { AuthState } from './slices/auth';
import course, { CourseState } from './slices/academic/courseSlice'

export type RootState = {
  auth: AuthState,
  course: CourseState
};

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  auth,
  course
};

const rootReducer = (asyncReducers?: AsyncReducers) => (
  state: RootState | undefined,
  action: AnyAction
) => {
  const combinedReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
