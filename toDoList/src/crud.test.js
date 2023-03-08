import { newTask } from "./CRUD.js";

test('Add one new item to the list', () => {

    document.body.innerHTML =
    '<div>' +
    '  <ul id="placeholder"><li></li></ul>' +
    '</div>';
    newTask();
    const list = document.querySelectorAll('#placeholder li');
    expect(list).toHaveLength(1);
});