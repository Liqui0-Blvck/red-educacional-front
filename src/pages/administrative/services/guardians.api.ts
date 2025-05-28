import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../config/axios.config";
import { Guardian } from "../../../types/administrative/Guardians";


//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/students/`;

// ✅ Consultar todos las matriculas
export const useGuardians = () => {
  return useQuery<Guardian[]>({
    queryKey: ['guardians'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}guardians/`)
      return data;
    },
  });
};

// ✅ Consultar una matricula por ID
export const useGuardian = (id: string) => {
  return useQuery<Guardian>({
    queryKey: ['guardian', id],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}guardians/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

// ✅ Crear estudiante
export const useCreateGuardians = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGuardian: Partial<Guardian>) => axios.post(BASE_URL, newGuardian),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardian'] });
    },
  });
};

// ✅ Actualizar estudiante
export const useUpdateGuardian = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (guardian: Guardian) => axios.put(`${BASE_URL}students/${guardian.id}/`, guardian),
    onSuccess: (_, updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ['guardians'] });
      queryClient.invalidateQueries({ queryKey: ['guardian', updatedStudent.id] });
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