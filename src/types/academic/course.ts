export interface Course {
  id: string;
  grade: string;
  shift: string;
  count_of_students: number;
  head_teacher: {
    name: string
  }
  // agrega más campos según tu backend
}
