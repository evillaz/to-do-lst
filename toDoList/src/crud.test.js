import { newTask } from "./CRUD.js";
import { loadToDoList } from "./index.js";
import ToDoList from './toDoList';

test('Add one new item to the list', () => {

    document.body.innerHTML =
    '<div>' +
    '  <ul id="placeholder"><li></li></ul>' +
    '</div>';
});