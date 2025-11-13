import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft, ChevronRight, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import InputLabel from '../components/InputLabel';
import SideBar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <div className="pr-64">
        <SideBar />
      </div>

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeft />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-brand-text-gray"
              >
                Minhas tarefas
              </span>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </h1>
          </div>

          <Button color="danger" className="h-fit self-end">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <div className="rounded-xl bg-brand-white p-6">
          <div className="space-y-6">
            <div>
              <Input
                id="title"
                label="Nome"
                placeholder="Digite..."
                value={task?.title}
              />
            </div>

            <div>
              <TimeSelect value={task?.time} />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                placeholder="Digite..."
                value={task?.description}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button color="primary" size="large">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
