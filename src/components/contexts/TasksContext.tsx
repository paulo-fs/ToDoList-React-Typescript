import { createContext, ReactNode, useReducer } from "react";
import { addNewTaskAction, deleteTaskAction, setTaskDoneAction, setTaskMessageAction } from "../../reducers/taskActions";
import { tasksReducer } from "../../reducers/tasksReducer";

export interface TasksType {
  id: number,
  isDone: boolean,
  message: string
};

interface TasksContextType{
  tasks: TasksType[]
  taskMessage: string
  createNewTask: () => void
  setTaskMessage: (message: string) => void
  deleteTask: (task: TasksType) => void
  setTasksDone: (taskDone: TasksType) => void
}

interface TasksContextProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextType);

export function TasksContextProvider({ children }: TasksContextProps){
  const [tasksState, dispatch ] = useReducer(tasksReducer, {
    tasks: [],
    taskMessage: '',
  })
  const { tasks, taskMessage } = tasksState;

  function createNewTask(){
    const newTask = {
      id: Number(new Date().getTime()),
      isDone: false,
      message: taskMessage
    }
    dispatch(addNewTaskAction(newTask));
  }

  function setTaskMessage(message: string){
    dispatch(setTaskMessageAction(message))
  }

  function deleteTask(task: TasksType){
    dispatch(deleteTaskAction(task))
  }

  function setTasksDone(doneTask: TasksType){
    const done = doneTask.isDone;
    const newDoneTask = {
      ...doneTask,
      isDone: !done
    }
    dispatch(setTaskDoneAction(newDoneTask));
  }

  return(
    <TasksContext.Provider value={{
      tasks,
      taskMessage,
      createNewTask,
      setTaskMessage,
      deleteTask,
      setTasksDone
    }}>
      { children }
    </TasksContext.Provider>
  )
}