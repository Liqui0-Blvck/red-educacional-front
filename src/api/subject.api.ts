// src/api/subject.api.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Subject } from '../types/academic/subject';
import axios from '../config/axios.config';

//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/academic/subjects/`;

export const useSubjects = () => {
  return useQuery<Subject[]>({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data } = await axios.get(BASE_URL);
      return data;
    },
  });
};

export const useSubject = (subjectId: string) => {
  return useQuery<Subject>({
    queryKey: ['subject', subjectId],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/${subjectId}`);
      return data;
    },
    enabled: !!subjectId,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSubject: Partial<Subject>) =>
      axios.post(BASE_URL, newSubject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subject: Subject) =>
      axios.put(`${BASE_URL}/${subject.id}`, subject),
    onSuccess: (_, updatedSubject) => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      queryClient.invalidateQueries({
        queryKey: ['subject', updatedSubject.id],
      });
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};
