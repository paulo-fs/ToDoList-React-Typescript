import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
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
  setTaskMessage: (message: string) => void
  deleteTask: (task: TasksType) => void
}

interface TasksContextProps {
  children: ReactNode
}

interface TasksState{
  tasks: TasksType[]
  taskMessage: string
}

export const TasksContext = createContext({} as TasksContextType);

export function TasksContextProvider({ children }: TasksContextProps){
  // const [tasks, setTasks] = useState<TasksType[]>([]);
  // const [taskMessage, setTaskMessage] = useState('');
  const [tasksDoneCounter, setTasksDoneCounter] = useState(0);

  // const [tasks, dispatch ] = useReducer((state: TasksType[], action: any) => {
  //   if(action.type === 'ADD_NEW_TASK'){
  //     return [...state, action.payload.newTask]
  //   }
  //   if(action.type === 'DELETE_TASK'){
  //     return state.filter(item => item.id !== action.payload.task.id)
  //   }
  //   return state;
  // }, [])

  const [tasksState, dispatch ] = useReducer((state: TasksState, action: any) => {
    if(action.type === 'ADD_NEW_TASK'){
      return {
        ...state,
        tasks: [...state.tasks, action.payload.newTask]
      }
    }
    if(action.type === 'DELETE_TASK'){
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload.task.id)
      }
    }
    if(action.type === 'SET_TASK_MESSAGE'){
      return {
        ...state,
        taskMessage: action.payload.message
      }
    }
    return state;
  }, {
    tasks: [],
    taskMessage: '',
  })

  const { tasks, taskMessage } = tasksState;
  

  function countDoneTasks(done: number){
    setTasksDoneCounter(prevState => prevState + done);
  }

  function createNewTask(newTask: TasksType){
    // setTasks([...tasks, newTask]);

    dispatch({
      type: 'ADD_NEW_TASK',
      payload: {
        newTask
      }
    });
  }

  function setTaskMessage(message: string){
    // setTaskMessage(message);
    dispatch({
      type: 'SET_TASK_MESSAGE',
      payload: {
        message
      }
    })
  }

  function deleteTask(task: TasksType){
    // const filteredTasks = tasks.filter(item => item.id !== task.id);
    // setTasks(filteredTasks);

    dispatch({
      type: 'DELETE_TASK',
      payload: {
        task
      }
    })
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