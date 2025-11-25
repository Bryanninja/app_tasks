import React from 'react';

import {
  GlassWaterIcon,
  LoadingIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import DashboardCard from './DashboardCard';

export default function DashboarCards() {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (tasks) => tasks.status == 'in_progress'
  ).length;
  const notStartedTasks = tasks?.filter(
    (tasks) => tasks.status == 'not_started'
  ).length;
  const completedTasks = tasks?.filter(
    (tasks) => tasks.status == 'done'
  ).length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<LoadingIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoadingIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<LoadingIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  );
}
