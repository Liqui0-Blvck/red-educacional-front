import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../config/axios.config";
import { Guardian } from "../../../types/administrative/Guardians";
import { Teacher } from "../../../types/administrative/Teacher";


//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/organizations/`;

// ✅ Consultar todos las matriculas
export const useTeachers = () => {
  return useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}teacher/`)
      return data;
    },
  });
};

// ✅ Consultar una matricula por ID
export const useTeacher = (id: string) => {
  return useQuery<Teacher>({
    queryKey: ['teacher', id],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}teacher/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

// ✅ Crear estudiante
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTeacher: Partial<Teacher>) => axios.post(BASE_URL, newTeacher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher'] });
    },
  });
};

// ✅ Actualizar estudiante
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacher: Teacher) => axios.put(`${BASE_URL}students/${teacher.id}/`, teacher),
    onSuccess: (_, updatedTeacher) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      queryClient.invalidateQueries({ queryKey: ['teacher', updatedTeacher.id] });
    },
  });
};

// ✅ Eliminar estudiante
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardian'] });
    },
  });
};