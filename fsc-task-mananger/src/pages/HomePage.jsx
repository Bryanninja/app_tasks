import React from 'react';

import {
  GlassWaterIcon,
  LoadingIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useGetTasks } from '../hooks/data/use-get-tasks';

export default function home() {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (tasks) => tasks.status == 'in_Progress'
  ).length;
  const completedTasks = tasks?.filter(
    (tasks) => tasks.status == 'completed'
  ).length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="w-full space-y-6 px-8 py-16">
          <Header subtitle="Dashboard" title="Dashboard" />
          <div className="grid grid-cols-4 gap-9">
            <DashboardCard
              icon={<Tasks2Icon />}
              mainText={tasks?.length}
              secondaryText="Tarefas disponíveis"
            />
            <DashboardCard
              icon={<TasksIcon />}
              mainText={completedTasks}
              secondaryText="Tarefas concluídas"
            />
            <DashboardCard
              icon={<LoadingIcon />}
              mainText={inProgressTasks}
              secondaryText="Tarefas em andamento"
            />
            <DashboardCard
              icon={<GlassWaterIcon />}
              mainText="5"
              secondaryText="Água"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
