import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();

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
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
}
