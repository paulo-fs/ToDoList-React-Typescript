import { createContext, ReactNode, useEffect, useState } from "react";
import { boolean } from "zod";

export interface TasksType {
  id: number,
  isDone: boolean,
  message: string
};

interface TasksContextType{
  tasks: TasksType[]
  taskMessage: string
  tasksDoneCounter: number
  countDoneTasks: (done: number) => void
  createNewTask: (task: TasksType) => void
  getTaskTitle: (message: string) => void
  deleteTask: (task: TasksType) => void
}

interface TasksContextProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextType);

export function TasksContextProvider({ children }: TasksContextProps){
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [taskMessage, setTaskMessage] = useState('');
  const [tasksDoneCounter, setTasksDoneCounter] = useState(0);
  

  function countDoneTasks(done: number){
    setTasksDoneCounter(prevState => prevState + done);
  }

  function createNewTask(newTask: TasksType){
    setTasks([...tasks, newTask]);
  }

  function getTaskTitle(message: string){
    setTaskMessage(message);
  }

  function deleteTask(task: TasksType){
    const filteredTasks = tasks.filter(item => item.id !== task.id);
    setTasks(filteredTasks);
  }

  return(
    <TasksContext.Provider value={{
      tasks,
      taskMessage,
      tasksDoneCounter,
      countDoneTasks,
      createNewTask,
      getTaskTitle,
      deleteTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}