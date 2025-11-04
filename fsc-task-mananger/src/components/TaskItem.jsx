import React from 'react';
import { DoneIcon, LoadingIcon, InputIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';

export default function TaskItem({
  task,
  handleCheckboxClick,
  handleDeleteClick,
}) {
  const getStatusClasses = () => {
    if (task.status == 'done') {
      return 'bg-[#00ADB5] text-[#002C2E]';
    }

    if (task.status == 'in_progress') {
      return 'bg-[#FFAA04]  text-[#00000080]';
    }

    if (task.status == 'not_started') {
      return 'bg-[#35383E] bg-opacity-10 text-[#35383E]';
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
            <LoadingIcon className="animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <InputIcon />
        </a>
      </div>
    </div>
  );
}
