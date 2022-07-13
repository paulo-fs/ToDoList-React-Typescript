import React, { useState, ReactPropTypes, FC, ComponentProps } from "react";
import { Trash } from "phosphor-react";
import styles from './TaskItem.module.css';

interface Tasks {
  id: number,
  isDone: boolean,
  message: string
};

interface TaskProp{
  key: number
  task: Tasks
  handleCheckTask: (task: Tasks) => void
  deleteTask: (item: Tasks) => void
  tasksList: Tasks[]
}

export function TaskItem(props: TaskProp) {
  const [checked, setChecked] = useState(false);
  const [tasksDone, setTasksDone] = useState(0);
  const [task, setTask] = useState({
    id: props.task.id,
    isDone: checked,
    message: props.task.message
  });

  function handleCheckTask(): void {
    if(task.isDone === true)
      setTask({...task, isDone: false});
    if(task.isDone === false)
      setTask({...task, isDone: true});
    props.handleCheckTask(task);
  }

  function handleDeleteTask(){
    props.deleteTask(task);
  }

  return (
    <li className={styles.task}>
        <button
          onClick={handleCheckTask}
          className={task.isDone ? styles.taskChecked : styles.taskCheck}
        >••</button>
      <div className={styles.container}>
        <p className={task.isDone ? styles.done : styles.notDone}>
          {props.task.message}
        </p>
        <button className={styles.btnDelete} onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </li>
  );
}
