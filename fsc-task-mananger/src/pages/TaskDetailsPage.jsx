import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeft,
  ChevronRight,
  LoadingIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import SideBar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const [deleteIsloading, setDeleteIsLoading] = useState();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

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
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salvar a tarefa.');
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success('Tarefa editada com sucesso.');
  };

  const handleClickDeleteTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      return toast.error(
        'Error ao deletar a tarefa. Por favor, tente novamente.'
      );
    }
    handleBackClick();
    toast.success('Tarefa deletada com sucesso.');
  };

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
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                Minhas tarefas
              </Link>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </h1>
          </div>

          <Button
            onClick={handleClickDeleteTask}
            color="danger"
            className="h-fit self-end"
            disabled={deleteIsloading}
          >
            {deleteIsloading ? (
              <LoadingIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="rounded-xl bg-brand-white p-6">
            <div className="space-y-6">
              <div>
                <Input
                  id="title"
                  label="Nome"
                  placeholder="Digite..."
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                  errorMessage={errors?.title?.message}
                />
              </div>

              <div>
                <TimeSelect
                  {...register('time', {
                    required: 'O horário é obrigatoria',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O horário não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                  errorMessage={errors?.time?.message}
                />
              </div>

              <div>
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Digite..."
                  {...register('description', {
                    required: 'A descrição é obrigatoria',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O descrição não pode ser vazia.';
                      }
                      return true;
                    },
                  })}
                  errorMessage={errors?.description?.message}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && <LoadingIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
