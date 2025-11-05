import './AddTaskDialog.css';

import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Input from './input';

export default function AddTaskDialog({ isOpen, handleClose }) {
  // 1. Inicialize o ref com null (boa prática)
  const nodeRef = useRef(null);

  // 2. REMOVA o 'if (!isOpen) return null;' daqui.
  // A prop 'in={isOpen}' e 'unmountOnExit' no CSSTransition vão cuidar disso.

  // 3. O createPortal deve vir PRIMEIRO
  return createPortal(
    <CSSTransition
      nodeRef={nodeRef} // Passa o ref para o CSSTransition
      in={isOpen} // Controla se a animação deve ser 'enter' ou 'exit'
      timeout={500} // Deve bater com o tempo da sua transição CSS
      classNames="add-task-dialog"
      unmountOnExit // Remove o modal do DOM após a animação de 'exit'
    >
      {/* 4. O 'ref={nodeRef}' DEVE estar no filho DIRETO do CSSTransition.
           Este 'div' é o seu backdrop e o container do modal. 
           É ele quem receberá as classes de animação.
      */}
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
            />
            <Input id="time" label="Horário" placeholder="Horário" />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
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

              <Button size="large" className="w-full">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body // O portal continua sendo renderizado no 'body'
  );
}
