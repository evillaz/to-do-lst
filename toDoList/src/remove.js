const remove = (field) => {
  const toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  const elementId = (field + 1).toString();
  const element = document.getElementById(elementId);
  element.remove();
  toDoTasks.splice(field, 1);
  const liContainer = document.querySelectorAll('.task');
  for (let i = field; i < toDoTasks.length; i += 1) {
    toDoTasks[i].index -= 1;
    liContainer[i].id = toDoTasks[i].index;
  }
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
};

export default remove;
