import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EthnicityRecord, HealthRecord, MigrationRecord, Student, StudentList, VulnerabilityRecord } from "../types/administrative/Student";
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
    mutationFn: (student: Student) => axios.put(`${BASE_URL}students/${student.id}/`, student),
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

// 

export const useUpdateHealthInfo = () => {
  const queryClient = useQueryClient()

  return useMutation<
    HealthRecord,                                       // TData
    Error,                                              // TError
    { studentId: string; healthInfo: HealthRecord }    // TVariables
  >({
    // ① aquí va la función que recibe tus variables
    mutationFn: ({ studentId, healthInfo }) =>
      axios
        .patch<HealthRecord>(
          `${BASE_URL}students/${studentId}/health/`,
          healthInfo
        )
        .then(res => res.data),

    // ② en onSuccess invalidas caché
    onSuccess: (_data, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] })
      queryClient.invalidateQueries({ queryKey: ['student', studentId, 'health'] })
    },
  })
}


export const useUpdateEthnicityInfo = () => {
  const queryClient = useQueryClient()

  return useMutation<
    EthnicityRecord,
    Error,
    { studentId: string; ethnicityInfo: EthnicityRecord }
  >({
    mutationFn: ({ studentId, ethnicityInfo }) =>
      axios
        .patch<EthnicityRecord>(
          `${BASE_URL}students/${studentId}/ethnicity/`,
          ethnicityInfo
        )
        .then(res => res.data),
    onSuccess: (_data, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] })
      queryClient.invalidateQueries({ queryKey: ['student', studentId, 'ethnicity'] })
    }
  })
}

export const useUpdateMigrationInfo = () => {
  const queryClient = useQueryClient()

  return useMutation<
    MigrationRecord,
    Error,
    { studentId: string; migrationInfo: MigrationRecord }
  >({
    mutationFn: ({ studentId, migrationInfo }) =>
      axios
        .patch<MigrationRecord>(
          `${BASE_URL}students/${studentId}/migration/`,
          migrationInfo
        )
        .then(res => res.data),
    onSuccess: (_data, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] })
      queryClient.invalidateQueries({ queryKey: ['student', studentId, 'migration'] })
    }
  })
}
export const useUpdateVulnerabilityInfo = () => {
  const queryClient = useQueryClient()

  return useMutation<
    VulnerabilityRecord,
    Error,
    { studentId: string; vulnerabilityInfo: VulnerabilityRecord }
  >({
    mutationFn: ({ studentId, vulnerabilityInfo }) =>
      axios
        .patch<VulnerabilityRecord>(
          `${BASE_URL}students/${studentId}/vulnerability/`,
          vulnerabilityInfo
        )
        .then(res => res.data),
    onSuccess: (_data, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] })
      queryClient.invalidateQueries({ queryKey: ['student', studentId, 'vulnerability'] })
    }
  })
}