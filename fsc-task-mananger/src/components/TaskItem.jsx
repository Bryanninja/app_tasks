import React from 'react';

export default function TaskItem({ task }) {
  const getStatusClasses = () => {
    if (task.status == 'done') {
      return 'bg-[#00ADB5] bg-opacity-10 text-[#002C2E]';
    }

    if (task.status == 'in_progress') {
      return 'bg-[#FFAA04] bg-opacity-10 text-[#00000080]';
    }

    if (task.status == 'not_started') {
      return 'bg-[#35383E] bg-opacity-5 text-[#35383E]';
    }
  };

  return (
    <div
      className={`text-opa flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  );
}
