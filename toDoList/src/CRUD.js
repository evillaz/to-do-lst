import ToDoList from './toDoList';

const toDoList = new ToDoList();

const newTask = (description) => {
  toDoList.toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  const completedDefault = false;
  const index = toDoList.toDoTasks.length + 1;
  toDoList.addTask(completedDefault, description, index);
};

const removeTask = (index) => {
  toDoList.remove(index);
};

const toggleHidden = (elements) => {
  elements.forEach((el) => {
    el.classList.toggle('hidden');
  });
};

const toggleElements = (target, background) => {
  const parentNode = target.closest('.task');
  const toogleText = parentNode.querySelectorAll('.taskText');
  const toggleIcons = parentNode.querySelectorAll('i');
  toggleHidden(toogleText);
  toggleHidden(toggleIcons);
  parentNode.style.backgroundColor = background;
};

const addNewDescription = (target) => {
  const targetParent = target.closest('.task');
  const newTextInput = targetParent.querySelector('.labelText');
  newTextInput.innerText = targetParent.querySelector('.textArea').value;
  const editedTaskID = targetParent.getAttribute('id') - 1;
  toDoList.toDoTasks[editedTaskID].description = newTextInput.innerText;
  localStorage.setItem('toDoList', JSON.stringify(toDoList.toDoTasks));
};

export {
  newTask,
  removeTask,
  toggleElements,
  addNewDescription,
};
