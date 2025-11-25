import React, { useState } from 'react';

import { AddIcon, TrashIcon } from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

export default function Header({ subtitle, title }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold text-brand-dark-blue">{title}</h2>
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
        />
      </div>
    </div>
  );
}
