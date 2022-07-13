import { useState, ChangeEvent, FormEvent, InvalidEvent, } from 'react';
import { NoTasks } from '../NoTasks/NoTasks';
import { TaskItem } from './TaskItem';

import { PlusCircle } from 'phosphor-react';
import styles from "./Task.module.css";
import { TasksHeader } from './TasksHeader';

interface Tasks {
  id: number,
  isDone: boolean,
  message: string
};

export function Task() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [taskMessage, setTaskMessage] = useState('');
  const [counter, setCounter] = useState(tasks.length);
  const [tasksDone, setTasksDone] = useState(0);

  function increaseConter(){
    setCounter(prevState => prevState += 1);
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    increaseConter();

    const newTask = {
      id: counter,
      isDone: false,
      message: taskMessage
    }

    setTasks([...tasks, newTask])
    setTaskMessage('');
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setTaskMessage(event.target.value);
  }

  function handleCheckTask(task: Tasks){
    if(task.isDone)
      return setTasksDone(prevstate => prevstate -1);
    setTasksDone(prevState => prevState + 1);
  }

  function deleteTask(task: Tasks){
    const filteredTasks = tasks.filter(item => item.id !== task.id);
    setTasks(filteredTasks);
    if(task.isDone)
      return setTasksDone(prevstate => prevstate -1);
  }

  function handleInvalidInput(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Dê um nome pra sua task!')
  }

  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder='Adicione uma nova tarefa'
          value={taskMessage} 
          onChange={handleMessageChange}
          onInvalid={handleInvalidInput}
          required
        />
        <button className={taskMessage ? styles.btnCreate : styles.btnCreateDisabled} >
          Criar
          <PlusCircle size={18} />
        </button>
      </form>

      <TasksHeader length={tasks.length} tasksDone={tasksDone} />

      <section className={styles.taskList}>
        { tasks.length === 0 && <NoTasks /> }
        {
          tasks.length !== 0 && 
          <ul className={styles.taskListItems}>
            {
              tasks.map((task) => {
                return (
                  <TaskItem 
                    key={task.id}
                    task={task} 
                    handleCheckTask={handleCheckTask}
                    deleteTask={deleteTask}
                    tasks={tasks}
                  />)
              })
            }
          </ul>
        }
      </section>
    </main>
  );
}
