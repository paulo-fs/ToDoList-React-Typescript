import { useState, ChangeEvent, FormEvent, InvalidEvent, } from 'react';
import { NoTasks } from '../NoTasks/NoTasks';
import { TaskItem } from './TaskItem';

import { PlusCircle } from 'phosphor-react';
import styles from "./Task.module.css";
import { TasksHeader } from './TasksHeader';

export function Task() {
  const taskInitList = [
    {
      id: 0,
      isDone: false,
      message: 'init.'
    },
  ]

  interface Tasks {
    id: number,
    isDone: boolean,
    message: string
  };
  
  const [tasksList, setTasksList] = useState(taskInitList);
  const [taskMessage, setTaskMessage] = useState('');
  const [counter, setCounter] = useState(tasksList.length);
  const [tasksDone, setTasksDone] = useState(0);

  onload = () => {
    setTasksList([]);
  }
  
  
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

    setTasksList([...tasksList, newTask])
    setTaskMessage('');
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setTaskMessage(event.target.value);
  }

  function handleCheckTask(task: Tasks){
    if(task.isDone === false)
      setTasksDone(prevState => prevState + 1);
    if(task.isDone === true)
      setTasksDone(prevstate => prevstate -1);
  }

  function deleteTask(task: Tasks){
    const filteredTasks = tasksList.filter(item => item.id !== task.id);
    setTasksList(filteredTasks);

    if(task.isDone === false)
      setTasksDone(prevState => prevState);
    if(task.isDone === true)
      setTasksDone(prevstate => prevstate -1);
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

      <TasksHeader length={tasksList.length} tasksDone={tasksDone} />

      <section className={styles.taskList}>
        { tasksList.length === 0 && <NoTasks /> }
        {
          tasksList.length !== 0 && 
          <ul className={styles.taskListItems}>
            {
              tasksList.map((task) => {
                return (
                  <TaskItem 
                    key={task.id}
                    task={task} 
                    handleCheckTask={handleCheckTask}
                    deleteTask={deleteTask}
                    tasksList={tasksList}
                  />)
              })
            }
          </ul>
        }
      </section>
    </main>
  );
}
