import { useQuery } from '@tanstack/react-query';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'], // Nota: Mudei 'tasks' para ['tasks'] (array é o padrão)
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      return tasks;
    },
  });
};
