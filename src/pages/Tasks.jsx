import Sidebar from '../components/Sidebar';
import Tasks from '../components/Tasks';

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Tasks />
      </div>
    </div>
  );
}

export default TasksPage;
