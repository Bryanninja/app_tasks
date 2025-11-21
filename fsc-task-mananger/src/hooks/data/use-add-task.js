import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/queries';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await axios.post(
        'http://localhost:3000/tasks',
        task
      );
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldtasks) => {
        return [...oldtasks, createdTask];
      });
    },
  });
};
