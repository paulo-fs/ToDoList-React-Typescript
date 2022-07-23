import { TasksType } from "../components/contexts/TasksContext";

export enum ActionTypes{
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  DELETE_TASK = 'DELETE_TASK',
  SET_TASK_MESSAGE = 'SET_TASK_MESSAGE',
  SET_TASK_DONE = 'SET_TASK_DONE'
}

export function addNewTaskAction(newTask: TasksType){
  return {
    type: ActionTypes.ADD_NEW_TASK,
    payload: {
      newTask
    }
  }
}

export function deleteTaskAction(task: TasksType){
  return {
    type: ActionTypes.DELETE_TASK,
    payload: {
      task
    }
  }
}

export function setTaskMessageAction (message: string){
  return {
    type: ActionTypes.SET_TASK_MESSAGE,
    payload: {
      message
    }
  }
}

export function setTaskDoneAction(newDoneTask: TasksType){
  return {
    type: ActionTypes.SET_TASK_DONE,
    payload: {
      newDoneTask
    }
  }
}