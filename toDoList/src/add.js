const addTask = (taskDescription) => {
  const toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  let completedDefault = false;
  let taskIndex = toDoTasks.length + 1;
  const task = {completed: completedDefault, description: taskDescription, index: taskIndex};
  toDoTasks.push(task);
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
  const listItem = document.createElement('li');
  listItem.className = 'task flex';
  listItem.innerHTML = `<div class="inputHolder flex">
                          <label class="custom-checkbox">
                            <input type="checkbox" class="${task.completed} checkBox" id="taskItem${task.index}" name="taskItem${task.index}">
                            <span class="checkmark"></span>
                          </label>
                          <div class="view">
                            <label class="labelText taskText">${task.description}</label>
                            <textarea class="textArea taskText hidden" type="text">${task.description}</textarea>
                          </div>
                          </div>
                          <div class="icons">
                          <i id="elipsis" class="fa-solid fa-ellipsis-vertical move elipsis"></i>
                          <i id="trash" class="fa-solid fa-trash-can remove hidden "></i>
                        </div>
                        `;
  listItem.id = task.index;
  const list = document.getElementById('placeholder');
  list.appendChild(listItem);
}

export { addTask };