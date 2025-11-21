import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'], // Nota: Mudei 'tasks' para ['tasks'] (array é o padrão)
    queryFn: async () => {
      const { data: tasks } = await axios.get(`http://localhost:3000/tasks`);
      return tasks;
    },
  });
};
