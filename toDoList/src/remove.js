const remove = (field) => {
  console.log(field);
  const toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  const arraylength = toDoTasks.length;
  let elementId = (field + 1).toString();
  var element = document.getElementById(elementId);
  element.remove();
  toDoTasks.splice(field, 1);
  const liContainer = document.querySelectorAll('.task')
    for (let i = field; i < toDoTasks.length; i += 1) {

      toDoTasks[i].index -= 1;
      liContainer[i].id = toDoTasks[i].index;
    }
  localStorage.setItem('toDoList', JSON.stringify(toDoTasks));
}

export { remove };