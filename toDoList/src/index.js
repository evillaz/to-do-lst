import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

if (module.hot) {
  module.hot.accept();
}

const toDoTasks = [
  {
    description: 'wash the dishes',
    completed: true,
    index: '3',
  },
  {
    description: 'complete To Do List project',
    completed: true,
    index: '2',
  },
];

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
  toDoTasks.sort( (a,b) => a.index - b.index);
  for (let i = 0; i < toDoTasks.length; i += 1) {
    setToDoList(toDoTasks[i]);
  }
  list.appendChild(setClearAll());
};

loadToDoList();
