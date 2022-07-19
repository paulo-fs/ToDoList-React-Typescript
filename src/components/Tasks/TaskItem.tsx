import { useContext, useEffect, useState } from "react";
import { Trash } from "phosphor-react";
import styles from './TaskItem.module.css';
import { TasksContext, TasksType } from "../contexts/TasksContext";

interface TaskItemProp{
  task: TasksType
}

export function TaskItem({ task }: TaskItemProp) {
  const [isDone, setIsDone] = useState(false);

  const {
    deleteTask,
    countDoneTasks
  } = useContext(TasksContext);

  function handleCheckTask() {
    isDone
    ? setIsDone(false)
    : setIsDone(true);

    countDoneTasks(isDone ? -1 : +1)
  }

  function handleDeleteTask(){
    deleteTask(task);
    countDoneTasks(isDone ? -1 : +0)
  }

  return (
    <li className={styles.task}>
        <button
          onClick={handleCheckTask}
          className={isDone ? styles.taskChecked : styles.taskCheck}
        >••</button>
      <div className={styles.container}>
        <p className={isDone ? styles.done : styles.notDone}>
          {task.message}
        </p>
        <button className={styles.btnDelete} onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </li>
  );
}
