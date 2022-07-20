import { TasksType } from "../components/contexts/TasksContext"
import { ActionTypes } from "./taskActions"

interface TasksState{
  tasks: TasksType[]
  taskMessage: string
}

export function tasksReducer(state: TasksState, action: any){
  switch(action.type){
    case ActionTypes.ADD_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.newTask]
      }
    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload.task.id)
      }
    case ActionTypes.SET_TASK_MESSAGE:
      return {
        ...state,
        taskMessage: action.payload.message
      }
    default:
      return state;
  }
}