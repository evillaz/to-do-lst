const changeStatus = (id) => {
  const toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  toDoTasks[id].completed = !toDoTasks[id].completed;
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
};

export default changeStatus;
