import { Toaster } from 'sonner';

import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
      <Sidebar />
      <div className="flex-1 pl-64">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
