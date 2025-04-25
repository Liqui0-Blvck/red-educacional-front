import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Student, StudentList } from "../types/administrative/Student";
import axios from "../config/axios.config";

//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/students/`;

// ✅ Consultar todos los estudiantes
export const useStudents = () => {
  return useQuery<StudentList[]>({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}students/list/`)
      return data;
    },
  });
};

// ✅ Consultar un estudiante por ID
export const useStudent = (id: string) => {
  return useQuery<Student>({
    queryKey: ['student', id],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}students/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

// ✅ Crear estudiante
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newStudent: Partial<Student>) => axios.post(BASE_URL, newStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// ✅ Actualizar estudiante
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student: Student) => axios.put(`${BASE_URL}/${student.id}`, student),
    onSuccess: (_, updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', updatedStudent.id] });
    },
  });
};

// ✅ Eliminar estudiante
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};