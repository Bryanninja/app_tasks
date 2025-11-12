import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoadingIcon } from '../assets/icons';
import Button from './Button';
import Input from './input';
import TimeSelect from './TimeSelect';

export default function AddTaskDialog({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) {
  const [errors, setErrors] = useState([]);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const nodeRef = useRef(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timesRef = useRef();

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

    const task = { id: v4(), title, time, description, status: 'not_started' };
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      setSaveIsLoading(false);
      return onSubmitError();
    }

    onSubmitSuccess(task);
    setSaveIsLoading(false);
    handleClose();
  };

  const titleError = errors.find((error) => error.inputName == 'title');
  const timeError = errors.find((error) => error.inputName == 'time');
  const decriptionError = errors.find(
    (error) => error.inputName == 'description'
  );

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

          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={saveIsLoading}
            />

            <TimeSelect
              errorMessage={timeError?.message}
              ref={timesRef}
              disabled={saveIsLoading}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={decriptionError?.message}
              ref={descriptionRef}
              disabled={saveIsLoading}
            />

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  handleClose();
                  setErrors([]);
                }}
                color="secondary"
                size="large"
                className="w-full"
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                onClick={handleSaveClick}
                disabled={saveIsLoading}
              >
                {saveIsLoading && <LoadingIcon className="animate-spin" />}
                Salvar
              </Button>
            </div>
          </div>
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
