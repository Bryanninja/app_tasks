import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';

import { LoadingIcon } from '../assets/icons';
import { useDeleteTasks } from '../hooks/data/use-delete-tasks';
import Button from './Button';

export default function DeleteTasksDialog({ handleClose, isOpen }) {
  const { mutate: deleteTasks, isPending } = useDeleteTasks();

  const handleDeleteTasks = async () => {
    deleteTasks(undefined, {
      onSuccess: () => {
        (toast.success('Tarefas deletadas com sucesso!'), handleClose());
      },
      onError: () => {
        toast.error('Não foi possivel deletar as tarefas!');
      },
    });
  };

  const nodeRef = useRef();
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
        className="fixed bottom-0 left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.08)] backdrop-blur"
      >
        <div className="flex flex-col gap-3 rounded-xl bg-white p-5 text-center shadow">
          <h1 className="text-brand-dark-blue">
            Confirme a deleção de todas as tarefas
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={handleClose}
              className="w-full"
              size="large"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteTasks}
              className="w-full"
              size="large"
              disabled={isPending}
            >
              {isPending && <LoadingIcon className="animate-spin" />}
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
}
