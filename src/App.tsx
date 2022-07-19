import logo from './assets/logo.svg';
import { TasksContextProvider } from './components/contexts/TasksContext';
import { Task } from './components/Tasks/Task';

function App() {
  return (
    <div className='wrapper'>
      <header>
        <img src={logo} alt='to do logo' />
      </header>
      <TasksContextProvider>
        <Task />
      </TasksContextProvider>
    </div>
  )
}

export default App
