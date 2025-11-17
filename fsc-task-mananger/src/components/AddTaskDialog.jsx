import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoadingIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

export default function AddTaskDialog({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  });

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    };
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return onSubmitError();
    }

    onSubmitSuccess(task);
    handleClose();
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
  };

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.08)] backdrop-blur"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow">
          <h2 className="text-xl font-semibold text-brand-dark-blue">
            Nova Tarefa
          </h2>
          <p className="m-1 mb-4 text-sm text-brand-text-gray">
            Insira as informações abaixo
          </p>

          <form
            onSubmit={handleSubmit(handleSaveClick)}
            className="flex w-[336px] flex-col space-y-4"
          >
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              disabled={isSubmitting}
              errorMessage={errors?.title?.message}
              {...register('title', {
                required: 'O título é obrigatório.',
                validate: (value) => {
                  if (!value.trim()) {
                    return 'O título não pode ser vazio.';
                  }
                  return true;
                },
              })}
            />

            <TimeSelect
              disabled={isSubmitting}
              errorMessage={errors?.time?.message}
              {...register('time', {
                required: true,
              })}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              disabled={isSubmitting}
              errorMessage={errors?.description?.message}
              {...register('description', {
                required: 'A descrição é obrigatória.',
                validate: (value) => {
                  if (!value.trim()) {
                    return 'A descrição não pode ser vazia.';
                  }
                  return true;
                },
              })}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                color="secondary"
                size="large"
                className="w-full"
                type="button"
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <LoadingIcon className="animate-spin" />}
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
}

AddTaskDialog.propsTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
