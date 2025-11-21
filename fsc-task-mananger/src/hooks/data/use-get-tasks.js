import { useQuery } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(), // Nota: Mudei 'tasks' para ['tasks'] (array é o padrão)
    queryFn: async () => {
      const { data: tasks } = await api.get(`/tasks`);
      return tasks;
    },
  });
};
