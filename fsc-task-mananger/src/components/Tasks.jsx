import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  LoadingIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import Header from './Header';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

function Tasks() {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time == 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time == 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time == 'evening');

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

      {/* Lista de Tarefas*/}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Manhã" />
          {morningTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Tarde" />
          {afternoonTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Noite" />
          {eveningTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da noite.
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tasks;
