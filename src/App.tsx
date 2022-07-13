import logo from './assets/logo.svg';
import { Task } from './components/Tasks/Task';

function App() {
  return (
    <div className='wrapper'>
      <header>
        <img src={logo} alt='to do logo' />
      </header>
      <Task />
    </div>
  )
}

export default App
