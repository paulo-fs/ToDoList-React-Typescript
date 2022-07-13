import { ClipboardText } from "phosphor-react";
import styles from "./NoTasks.module.css";

export function NoTasks() {
  return (
    <div className={styles.emptyListMessage}>
      <ClipboardText size={54} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
