import React, { useEffect, useRef, useState } from 'react';
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
  const [deleteIsloading, setDeleteIsLoading] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timesRef = useRef();

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

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timesRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      });
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O Horário é obrigatório',
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      });
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      setSaveIsLoading(false);
      toast.error('Não foi possivel salvar a tarefa');
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      setSaveIsLoading(false);
      return toast.error('Ocorreu um erro ao salvar a tarefa.');
    }
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
  };

  const handleClickDeleteTask = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        'Error ao deletar a tarefa. Por favor, tente novamente.'
      );
    }
    setDeleteIsLoading(false);
    handleBackClick();
    toast.success('ok');
  };

  const titleError = errors.find((error) => error.inputName == 'title');
  const timeError = errors.find((error) => error.inputName == 'time');
  const decriptionError = errors.find(
    (error) => error.inputName == 'description'
  );

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
        <div className="rounded-xl bg-brand-white p-6">
          <div className="space-y-6">
            <div>
              <Input
                id="title"
                label="Nome"
                placeholder="Digite..."
                defaultValue={task?.title}
                errorMessage={titleError?.message}
                ref={titleRef}
              />
            </div>

            <div>
              <TimeSelect
                defaultValue={task?.time}
                errorMessage={timeError?.message}
                ref={timesRef}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                placeholder="Digite..."
                defaultValue={task?.description}
                errorMessage={decriptionError?.message}
                ref={descriptionRef}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            onClick={handleSaveClick}
            color="primary"
            size="large"
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoadingIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
