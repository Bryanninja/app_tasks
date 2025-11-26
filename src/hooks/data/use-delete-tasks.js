import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.deleteAll(),
    mutationFn: async () => {
      // 1. Primeiro buscamos todas as tarefas para saber os IDs
      const { data: tasks } = await api.get('/tasks');

      // 2. Criamos uma promessa de delete para cada tarefa
      const deletePromises = tasks.map((task) =>
        api.delete(`/tasks/${task.id}`)
      );

      // 3. Executamos todas ao mesmo tempo
      await Promise.all(deletePromises);

      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), () => []);
    },
  });
};
