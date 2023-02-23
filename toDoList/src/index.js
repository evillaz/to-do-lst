import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoList from './toDoList';

if (module.hot) {
  module.hot.accept();
}

const toDoList = new ToDoList();

const list = document.getElementById('placeholder');

const addListContent = (toDoTask) => `<div class="inputHolder flex">
            <label class="custom-checkbox">
              <input type="checkbox" class="${toDoTask.completed} checkBox" id="taskItem${toDoTask.index}" name="taskItem${toDoTask.index}">
              <span class="checkmark"></span>
            </label>
            <label class="taskText" for="taskItem${toDoTask.index}">${toDoTask.description}</label>
          </div>
          <div class="icons">
            <i id="elipsis" class="fa-solid fa-ellipsis-vertical move elipsis"></i>
            <i id="trash" class="fa-solid fa-trash-can remove hidden "></i>
          </div>
          `;

const setListItem = (toDoTask) => {
  const listItem = document.createElement('li');
  listItem.className = 'task flex';
  listItem.innerHTML = addListContent(toDoTask);
  listItem.id = toDoTask.index;
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
  const arrayLength = toDoList.toDoTasks.length;
  for (let i = 0; i < arrayLength; i += 1) {
    setToDoList(toDoList.toDoTasks[i]);
  }
  list.appendChild(setClearAll());
};

loadToDoList();

export { loadToDoList };
export { toDoList };
