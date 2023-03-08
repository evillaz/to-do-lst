import Task from './task';

class ToDoList {
  constructor() {
    this.toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
  }

  addTask(completed, description, index) {
    if (completed !== '' && description !== '' && index !== '') {
      const task = new Task(completed, description, index);
      this.toDoTasks = JSON.parse(localStorage.getItem('toDoList')) || [];
      this.toDoTasks.push(task);
      localStorage.setItem('toDoList', JSON.stringify(this.toDoTasks));
    }
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
