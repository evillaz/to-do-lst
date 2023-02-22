import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoList from './toDoList';
import { addTask } from './CRUD';

if (module.hot) {
  module.hot.accept();
}

const toDoList = new ToDoList();

const list = document.getElementById('placeholder');

const addListContent = (toDoTask) => `<div class="inputHolder flex">
            <input type="checkbox" class="${toDoTask.completed}" id="taskItem${toDoTask.index}" name="taskItem${toDoTask.index}">
            <label for="taskItem${toDoTask.index}">${toDoTask.description}</label>
          </div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
          `;

const setListItem = (toDoTask) => {
  const listItem = document.createElement('li');
  listItem.className = 'task flex';
  listItem.innerHTML = addListContent(toDoTask);
  return listItem;
};

const setToDoList = (toDoTask) => {
  list.appendChild(setListItem(toDoTask));
};

const setClearAll = () => {
  const clearAll = document.createElement('button');
  clearAll.className = 'clearAll';
  clearAll.innerHTML = 'Clear All completed';
  return clearAll;
};

const loadToDoList = () => {
  list.innerHTML = '';
  if (localStorage.getItem('toDoList') == null) {
    toDoList.toDoTasks = [];
  } else {
    toDoList.toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
  }

  toDoList.toDoTasks = toDoList.toDoTasks.sort((a, b) => a.index - b.index);
  localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
  length = toDoList.toDoTasks.length;
  for (let i = 0; i < length; i += 1) {
    setToDoList(toDoList.toDoTasks[i]);
  }
  list.appendChild(setClearAll());
};

const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  addTask();
})

loadToDoList();

export {loadToDoList};
export {toDoList};