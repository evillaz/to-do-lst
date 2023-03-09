class Task {
  constructor(completed, description, index) {
    this.completed = completed;
    this.description = description;
    this.index = index;
  }
}

class ToDoList {
  constructor() { 
    this.toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  }

  addTask(description) {
      const completedDefault = false;
      const index = this.toDoTasks.length + 1;
      const task = new Task(completedDefault, description, index);
      this.toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
      this.toDoTasks.push(task);
      localStorage.setItem('toDoList', JSON.stringify(this.toDoTasks));
  }

  remove(field) {
    const arraylength = this.toDoTasks.length;
    this.toDoTasks.splice(field, 1);
    if (field !== arraylength - 1) {
      for (let i = field; i < this.toDoTasks.length; i += 1) {
        this.toDoTasks[i].index -= 1;
      }
    }
    localStorage.setItem('toDoList', JSON.stringify(this.toDoTasks));
  }
}

export default ToDoList;
