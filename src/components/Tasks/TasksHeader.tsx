import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";
import styles from "./TasksHeader.module.css";


export function TasksHeader() {
  const { tasks } = useContext(TasksContext);
  const doneTasksCounter = tasks.filter(item => item.isDone === true).length;

  return (
    <section className={styles.tasksInfo}>
      <div className={styles.createdTasks}>
        <p>Tarefas criadas</p>
        <span>{tasks && tasks.length}</span>
      </div>
      <div className={styles.completedTasks}>
        <p>Concluídas</p>
        <span>{`${doneTasksCounter} de ${tasks && tasks.length}`}</span>
      </div>
    </section>
  );
}
