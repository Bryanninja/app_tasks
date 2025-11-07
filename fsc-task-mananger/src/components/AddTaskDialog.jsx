import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './input';
import InputLabel from './InputLabel';
import TimeSelect from './TimeSelect';

export default function AddTaskDialog({ isOpen, handleClose, handleSubmit }) {
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timesRef = useRef();

  const handleSaveClick = () => {
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timesRef.current.value;

    console.log(titleRef.current.value);
    console.log(descriptionRef.current.value);
    console.log(timesRef.current.value);

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
      return;
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    });

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
          <h2 className="text-brand-dark-blue text-xl font-semibold">
            Nova Tarefa
          </h2>
          <p className="text-brand-text-gray m-1 mb-4 text-sm">
            Insira as informações abaixo
          </p>

          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
            />

            <TimeSelect errorMessage={timeError?.message} ref={timesRef} />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={decriptionError?.message}
              ref={descriptionRef}
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

              <Button size="large" className="w-full" onClick={handleSaveClick}>
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
