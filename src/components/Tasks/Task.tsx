import { ChangeEvent, FormEvent, InvalidEvent, useContext, } from 'react';
import { NoTasks } from '../NoTasks/NoTasks';
import { TaskItem } from './TaskItem';
import { TasksHeader } from './TasksHeader';
import { TasksContext } from '../contexts/TasksContext';

import { PlusCircle } from 'phosphor-react';
import styles from "./Task.module.css";

export function Task() {
  const {
    tasks,
    taskMessage,
    createNewTask,
    setTaskMessage
  } = useContext(TasksContext);

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    createNewTask();
    setTaskMessage('');
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setTaskMessage(event.target.value);
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

      <TasksHeader />

      <section className={styles.taskList}>
        { tasks && tasks.length === 0 && <NoTasks /> }
        {
          tasks &&
          <ul className={styles.taskListItems}>
            {
              tasks.map((task) => {
                return (
                  <TaskItem key={task.id} task={task} />)
              })
            }
          </ul>
        }
      </section>
    </main>
  );
}
