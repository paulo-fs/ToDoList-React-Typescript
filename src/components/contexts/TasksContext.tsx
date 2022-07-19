import { createContext, ReactNode, useState } from "react";

export interface TasksType {
  id: number,
  isDone: boolean,
  message: string
};

interface TasksContextType{
  tasks: TasksType[]
  taskMessage: string
  tasksDoneCounter: number
  checkDoneTasks: (task: TasksType) => void
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

  function checkDoneTasks(task: TasksType){
    const taskId = task.id;
    const checkedTasks = tasks.filter(item => {
      if(item.id === taskId){
        return task.isDone
        ? task.isDone = false
        : task.isDone = true
      }
      return item;
    });

    setTasks(checkedTasks)
    // setTasksDoneCounter(prevState => prevState + (task))
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
    if(task.isDone)
      return setTasksDoneCounter(prevstate => prevstate -1);
  }

  return(
    <TasksContext.Provider value={{
      tasks,
      taskMessage,
      tasksDoneCounter,
      checkDoneTasks,
      createNewTask,
      getTaskTitle,
      deleteTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}