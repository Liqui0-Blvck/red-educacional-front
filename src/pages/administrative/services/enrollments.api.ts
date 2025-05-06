import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../config/axios.config";
import { Enrollment, EnrollmentList } from "../../../types/administrative/Enrollment";


//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/students/`;

// ✅ Consultar todos las matriculas
export const useEnrollments = () => {
  return useQuery<EnrollmentList[]>({
    queryKey: ['enrollment'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}enrollment/`)
      return data;
    },
  });
};

// ✅ Consultar una matricula por ID
export const useEnrollment = (id: string) => {
  return useQuery<Enrollment>({
    queryKey: ['enrollment', id],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}enrollment/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

// ✅ Crear estudiante
export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEnrollment: Partial<Enrollment>) => axios.post(BASE_URL, newEnrollment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
    },
  });
};

// ✅ Actualizar estudiante
export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (enrollment: Enrollment) => axios.put(`${BASE_URL}students/${enrollment.id}/`, enrollment),
    onSuccess: (_, updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollment', updatedStudent.id] });
    },
  });
};

// ✅ Eliminar estudiante
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
    },
  });
};