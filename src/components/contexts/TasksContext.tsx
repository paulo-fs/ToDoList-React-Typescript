import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewTaskAction, deleteTaskAction, setTaskMessageAction } from "../../reducers/taskActions";
import { tasksReducer } from "../../reducers/tasksReducer";

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
  setTaskMessage: (message: string) => void
  deleteTask: (task: TasksType) => void
}

interface TasksContextProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextType);

export function TasksContextProvider({ children }: TasksContextProps){
  const [tasksDoneCounter, setTasksDoneCounter] = useState(0);
  const [tasksState, dispatch ] = useReducer(tasksReducer, {
    tasks: [],
    taskMessage: '',
  })
  const { tasks, taskMessage } = tasksState;

  function countDoneTasks(done: number){
    setTasksDoneCounter(prevState => prevState + done);
  }

  function createNewTask(newTask: TasksType){
    dispatch(addNewTaskAction(newTask));
  }

  function setTaskMessage(message: string){
    dispatch(setTaskMessageAction(message))
  }

  function deleteTask(task: TasksType){
    dispatch(deleteTaskAction(task))
  }

  return(
    <TasksContext.Provider value={{
      tasks,
      taskMessage,
      tasksDoneCounter,
      countDoneTasks,
      createNewTask,
      setTaskMessage,
      deleteTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}