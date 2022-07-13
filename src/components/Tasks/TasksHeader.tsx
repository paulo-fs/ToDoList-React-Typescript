import styles from "./TasksHeader.module.css";

interface Props{
  length: number;
  tasksDone: number;
}

export function TasksHeader(props: Props) {
  return (
    <section className={styles.tasksInfo}>
      <div className={styles.createdTasks}>
        <p>Tarefas criadas</p>
        <span>{props.length}</span>
      </div>
      <div className={styles.completedTasks}>
        <p>Concluídas</p>
        <span>{`${props.tasksDone} de ${props.length}`}</span>
      </div>
    </section>
  );
}
