import React from 'react';

import { HomeIcon, TasksIcon } from '../assets/icons';
import SidebarButton from './SidebarButton';

export default function SideBar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Mananger
        </h1>
        <p>
          Um simples{' '}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton to="/">
          <HomeIcon />
          Início
        </SidebarButton>

        <SidebarButton to="/tasks">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
}
