import ToDoList from './toDoList';
import { loadToDoList } from './index';

const toDoList = new ToDoList();
if (localStorage.getItem('toDoList') == null) {
  toDoList.toDoTasks = [];
} else {
  toDoList.toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
}
const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  const description = document.getElementById('addTask').value;
  const completedDefault = false;
  const index = toDoList.toDoTasks.length + 1;
  toDoList.addTask(completedDefault, description, index);
  document.getElementById('addTask').value = '';
  loadToDoList();
});

const taskContainer = document.querySelector('#placeholder');
taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const taskId = e.target.parentNode.parentNode.getAttribute('id') - 1;
    toDoList.remove(taskId);
    localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
    loadToDoList();
  }
  if (e.target.classList.contains('taskText')) {
    const parent = e.target.parentElement.parentElement;
    parent.style.backgroundColor = '#fffeca';
    const icons = parent.querySelectorAll('i');
    icons.forEach((i) => {
      i.classList.toggle('hidden');
    });
    const currentValue = e.target.innerText;
    const inputElement = document.createElement('input');
    inputElement.className = 'newTaskText';
    inputElement.type = 'text';
    inputElement.value = currentValue;
    e.target.replaceWith(inputElement);
    inputElement.focus();

    let keyDownOcurred = false;

    const finishEdit = () => {
      const newLabel = document.createElement('label');
      newLabel.className = 'taskText';
      newLabel.innerText = inputElement.value;
      inputElement.replaceWith(newLabel);
      const taskID = newLabel.parentNode.parentNode.getAttribute('id') - 1;
      toDoList.toDoTasks[taskID].description = newLabel.innerText;
      localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
    };

    inputElement.addEventListener('keydown', (x) => {
      if (x.key === 'Enter') {
        x.preventDefault();
        keyDownOcurred = true;
        finishEdit();
      }
    });

    inputElement.addEventListener('blur', () => {
      parent.style.backgroundColor = '#fff';
      icons.forEach((i) => {
        i.classList.toggle('hidden');
      });
      if (!keyDownOcurred) {
        finishEdit();
      }
    });
  }
});
