import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoList from './toDoList';
import {
  newTask, removeTask, addNewDescription, toggleElements,
} from './CRUD';
import {
  checkStatus,
  changeStatus,
  filterCompleted,
} from './statusUpdate';

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
  newTask(taskDescriptionInput);
  parentContainer.querySelector('#addTask').value = '';
  loadToDoList();
});

const taskContainer = document.querySelector('#placeholder');

taskContainer.addEventListener('click', (e) => {
  if (e.target.matches('.labelText')) {
    toggleElements(e.target, '#fffeca');
  }
  if (e.target.matches('#trash')) {
    const removeID = e.target.closest('.task').getAttribute('id') - 1;
    removeTask(removeID);
    loadToDoList();
  }
  if (e.target.matches('.clearAll')) {
    filterCompleted();
    loadToDoList();
  }
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
    addNewDescription(k.target);
    toggleElements(k.target, '#fff');
  }
  if ((k.target.id === 'addTask') && k.key === 'Enter') {
    k.preventDefault();
    const parentContainer = k.target.closest('.addTasks');
    const taskDescriptionInput = parentContainer.querySelector('#addTask').value;
    newTask(taskDescriptionInput);
    parentContainer.querySelector('#addTask').value = '';
    loadToDoList();
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

  toDoList.toDoTasks = [];
  localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
  loadToDoList();
});
