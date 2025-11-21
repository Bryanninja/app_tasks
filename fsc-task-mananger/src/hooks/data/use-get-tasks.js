import { useQuery } from '@tanstack/react-query';

import { api } from '../../lib/axios';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'], // Nota: Mudei 'tasks' para ['tasks'] (array é o padrão)
    queryFn: async () => {
      const { data: tasks } = await api.get(`/tasks`);
      return tasks;
    },
  });
};
