import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { DoneIcon, InputIcon, LoadingIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';

export default function TaskItem({ task, handleCheckboxClick }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteTask', task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
  });

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(['tasks'], (currentTasks) => {
          return currentTasks.filter((oldTask) => oldTask.id != task.id);
        });
        toast.success('Tarefa deletada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao deletar a tarefa!');
      },
    });
  };

  const getStatusClasses = () => {
    if (task.status == 'done') {
      return 'bg-brand-primary text-[#002C2E]';
    }

    if (task.status == 'in_progress') {
      return 'bg-brand-process  text-[#00000080]';
    }

    if (task.status == 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue';
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status == 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status == 'done' && <DoneIcon />}
          {task.status == 'in_progress' && (
            <LoadingIcon className="animate-spin text-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoadingIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <InputIcon />
        </Link>
      </div>
    </div>
  );
}

TaskItem.PropTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};
