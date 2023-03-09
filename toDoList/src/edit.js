const addNewDescription = (id, newDescription) => {
  const toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  const targetParent = document.getElementById(id);
  const newTextInput = targetParent.querySelector('.labelText');
  newTextInput.innerText = newDescription;
  const editedTaskID = id - 1;
  toDoTasks[editedTaskID].description = newTextInput.innerText;
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
};

export default addNewDescription;
