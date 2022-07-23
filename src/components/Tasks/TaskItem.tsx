import { useContext } from "react";
import { Trash } from "phosphor-react";
import styles from './TaskItem.module.css';
import { TasksContext, TasksType } from "../contexts/TasksContext";

interface TaskItemProp{
  task: TasksType
}

export function TaskItem({ task }: TaskItemProp) {
  const {
    deleteTask,
    setTasksDone
  } = useContext(TasksContext);

  function handleCheckTask() {
    setTasksDone(task);
  }

  function handleDeleteTask(){
    deleteTask(task);
  }

  return (
    <li className={styles.task}>
        <button
          onClick={handleCheckTask}
          className={task.isDone ? styles.taskChecked : styles.taskCheck}
        >••</button>
      <div className={styles.container}>
        <p className={task.isDone ? styles.done : styles.notDone}>
          {task.message}
        </p>
        <button className={styles.btnDelete} onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </li>
  );
}
