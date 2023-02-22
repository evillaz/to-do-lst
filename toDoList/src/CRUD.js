import { loadToDoList } from "./index.js";
import ToDoList from './toDoList';
import { toDoList } from "./index.js";

const addTask = () => {
  const description = document.getElementById('addTask').value;
  const completedDefault = false;
  const index = toDoList.toDoTasks.length + 1;
  toDoList.addTask(completedDefault, description, index);
  localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
  document.getElementById('addTask').value = '';
  loadToDoList();
};

export {addTask};
