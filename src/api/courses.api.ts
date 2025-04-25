// services/api/courses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../config/axios.config';
import { Course } from '../types/academic/course';

//@ts-ignore
const BASE_URL = `${import.meta.env.VITE_URL_DEV}/api/organizations/courses/`;


export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get(BASE_URL);
      return data;
    },
  });
};

export const useCourse = (courseId: string) => {
  return useQuery<Course>({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/${courseId}`);
      return data;
    },
    enabled: !!courseId, // Solo corre si hay ID
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCourse: Partial<Course>) => axios.post(BASE_URL, newCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => axios.put(`${BASE_URL}/${course.id}`, course),
    onSuccess: (_, updatedCourse) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', updatedCourse.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
