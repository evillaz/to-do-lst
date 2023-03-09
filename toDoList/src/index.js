import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import toggleElements from './CRUD';
import {
  checkStatus,
  changeStatus,
  filterCompleted,
} from './statusUpdate';
import addTask from './add';
import remove from './remove';
import addNewDescription from './edit';

if (module.hot) {
  module.hot.accept();
}

let toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];

const list = document.getElementById('placeholder');
const toDoListContainer = document.getElementById('toDoList');
const addListContent = (toDoTask) => `<div class="inputHolder flex">
            <label class="custom-checkbox">
              <input type="checkbox" class="${toDoTask.completed} checkBox" id="taskItem${toDoTask.index}" name="taskItem${toDoTask.index}">
              <span class="checkmark"></span>
            </label>
            <div class="view">
              <label class="labelText taskText">${toDoTask.description}</label>
              <textarea class="textArea taskText hidden" type="text">${toDoTask.description}</textarea>
            </div>
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

toDoListContainer.appendChild(setClearAll());

const loadToDoList = () => {
  list.innerHTML = '';
  if (localStorage.getItem('toDoList') == null) {
    toDoTasks = [];
  } else {
    toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
  }
  toDoTasks = toDoTasks.sort((a, b) => a.index - b.index);
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
  const arrayLength = toDoTasks.length;
  for (let i = 0; i < arrayLength; i += 1) {
    setToDoList(toDoTasks[i]);
  }
  const checkBoxes = document.querySelectorAll('.checkBox');
  checkBoxes.forEach((check) => {
    checkStatus(check);
  });
};

loadToDoList();

const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', (e) => {
  const parentContainer = e.target.closest('.addTasks');
  const taskDescriptionInput = parentContainer.querySelector('#addTask').value;
  addTask(taskDescriptionInput);
  parentContainer.querySelector('#addTask').value = '';
});

const taskContainer = document.querySelector('#placeholder');

taskContainer.addEventListener('click', (e) => {
  if (e.target.matches('.labelText')) {
    toggleElements(e.target, '#fffeca');
  }
  if (e.target.matches('#trash')) {
    const removeID = e.target.closest('.task').getAttribute('id') - 1;
    remove(removeID);
  }
});

const clearAllBtn = document.querySelector('.clearAll');
clearAllBtn.addEventListener('click', () => {
  filterCompleted();
  loadToDoList();
});

document.addEventListener('click', (e) => {
  const toggledTask = document.querySelectorAll('.labelText');
  toggledTask.forEach((toggle) => {
    if (toggle.classList.contains('hidden')) {
      const toggledParent = toggle.closest('.task');
      if (!toggledParent.contains(e.target)) {
        toggleElements(toggle, '#fff');
        addNewDescription(toggle);
      }
    }
  });
});

document.addEventListener('keydown', (k) => {
  if (k.target.classList.contains('textArea') && k.key === 'Enter') {
    k.preventDefault();
    const targetParent = k.target.closest('.task');
    const editId = targetParent.getAttribute('id');
    const newTextInput = targetParent.querySelector('.textArea').value;
    addNewDescription(editId, newTextInput);
    toggleElements(k.target, '#fff');
  }
  if ((k.target.id === 'addTask') && k.key === 'Enter') {
    k.preventDefault();
    const parentContainer = k.target.closest('.addTasks');
    const taskDescriptionInput = parentContainer.querySelector('#addTask').value;
    addTask(taskDescriptionInput);
    parentContainer.querySelector('#addTask').value = '';
  }
});

document.addEventListener('change', (e) => {
  changeStatus(e.target);
  loadToDoList();
});

const refreshButton = document.querySelector('#refresh');
refreshButton.addEventListener('click', () => {
  let rotation = 0;
  const intervalId = setInterval(() => {
    rotation += 20;
    refreshButton.style.transform = `rotate(${rotation}deg)`;
  }, 20);

  // do some refreshing action here
  setTimeout(() => {
    // stop rotating
    clearInterval(intervalId);
    refreshButton.style.transform = '';
  }, 300);

  toDoTasks = [];
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
  loadToDoList();
});
