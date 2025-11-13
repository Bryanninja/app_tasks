import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  LoadingIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time == 'morning');
  const afternoonTasks = tasks.filter((task) => task.time == 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time == 'evening');

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
    toast.success('Tarefa deletada com sucesso!');
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) {
        return task;
      }

      if (task.status == 'not_started') {
        toast.success('Tarefa iniciada com sucesso!');
        return { ...task, status: 'in_progress' };
      }

      if (task.status == 'in_progress') {
        toast.success('Tarefa concluída com sucesso!');
        return { ...task, status: 'done' };
      }

      if (task.status == 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return { ...task, status: 'not_started' };
      }

      return task;
    });
    setTasks(newTasks);
  };

  const onTaskSubmitSuccess = (task) => {
    setTasks([...tasks, task]);
    toast.success('Tarefa adiconada com sucesso!');
  };

  const onTaskSubmitErro = () => {
    toast.error('Erro ao adiconar a tarefa. Por favor, tente Novamente.');
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold text-brand-dark-blue">
            Minhas tarefas
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefas
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            onSubmitSuccess={onTaskSubmitSuccess}
            onSubmitError={onTaskSubmitErro}
          />
        </div>
      </div>

      {/* Lista de Tarefas*/}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Manhã" />
          {morningTasks.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da manhã.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Tarde" />
          {afternoonTasks.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da tarde.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Noite" />
          {eveningTasks.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o perído da noite.
            </p>
          )}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tasks;
