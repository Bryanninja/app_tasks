import './AddTaskDialog.css';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './input';
import InputLabel from './InputLabel';
import TimeSelect from './TimeSelect';

export default function AddTaskDialog({ isOpen, handleClose, handleSubmit }) {
  const [title, setTitle] = useState();
  const [time, setTime] = useState();
  const [description, setDescription] = useState();

  const nodeRef = useRef(null);

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    });

    handleClose();
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
          <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
          <p className="m-1 mb-4 text-sm text-[#9A9C9F]">
            Insira as informações abaixo
          </p>

          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <TimeSelect
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                variant="secondary"
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
