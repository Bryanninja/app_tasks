import React from 'react';

import { HomeIcon } from '../assets/icons';
import DashboarCards from '../components/DashboarCards';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import { useGetTasks } from '../hooks/data/use-get-tasks';

export default function home() {
  const { data: tasks } = useGetTasks();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="w-full space-y-6 px-8 py-16">
          <Header subtitle="Dashboard" title="Dashboard" />
          <DashboarCards />
          <div className="grid grid-cols-[1.5fr,1fr] gap-9">
            <div className="space-y-6 rounded-[10px] bg-brand-white p-6">
              <div className="">
                <h3 className="text-xl font-semibold text-brand-dark-blue">
                  Tarefas
                </h3>
                <span className="text-sm text-brand-dark-gray">
                  Resumo das tarefas disponíveis
                </span>
              </div>
              <div className="space-y-3">
                {tasks?.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 rounded-[10px] bg-brand-white p-6">
              <p className="text-brand-dark-gray">
                Mas quando você orar, vá para seu quarto, feche a porta e ore a
                seu Pai, que está no secreto. Então seu Pai, que vê no secreto,
                o recompensará. Mateus 6:6
              </p>

              <HomeIcon className="text-brand-dark-gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
