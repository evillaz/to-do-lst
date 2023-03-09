import addTask from '../src/add';
import remove from '../src/remove';
import addNewDescription from '../src/edit';
import changeStatus from '../src/updateStatus';
import filterCompleted from '../src/clearAll';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = value.toString() },
    clear: () => { store = {} }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('addTask', () => {
  test('initial number of li items shuld be 0', () => {
    let initialLength = document.querySelectorAll('.task').length;
    expect(initialLength).toBe(0);
  });
  test('adds a new task to the list', () => {
    addTask('new task');
    addTask('new task');
    addTask('new task');
    let finalLength = document.querySelectorAll('.task').length;
    expect(finalLength).toBe(3);
  });
});

describe('remove', () => {
  test('initial number of li items shuld be 0', () => {
    let initialLength = document.querySelectorAll('.task').length;
    expect(initialLength).toBe(0);
  });
  test('adds a new task to the list', () => {
    addTask('new task');
    addTask('new task');
    remove(1);
    let finalLength = document.querySelectorAll('.task').length;
    expect(finalLength).toBe(1);
  });
});

describe('edit', () => {
  test('initial ', () => {
    addTask('new task');
    addTask('new task');
    addNewDescription(2, "new desc");
    const edittedTask = document.getElementById('2').querySelector('.labelText').innerText;
    expect(edittedTask).toBe("new desc");
  });
});

describe('update status', () => {
  beforeEach(() => {
    addTask('new task');
    addTask('new task');
  });
  test('before changing status ', () => {
    const toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
    const initialCompletedValue = toDoTasks[1].completed;
    expect(initialCompletedValue).toBe(false);
  });
  test('after changing status', () => {
    changeStatus(1);
    const toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
    const finalCompletedValue = toDoTasks[1].completed;
    expect(finalCompletedValue).toBe(true);
  });
});

describe('clear all completed', () => {
  beforeEach(() => {
    addTask('new task');
    addTask('new task');
    addTask('new task');
  });
  test('before changing status ', () => {
    const toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
    expect(toDoTasks.length).toBe(3);
  });
  test('after changing status', () => {
    changeStatus(1);
    changeStatus(2);
    filterCompleted();
    const toDoTasks = JSON.parse(localStorage.getItem('toDoList'));
    expect(toDoTasks.length).toBe(1);
  });
});

beforeEach(() => {
  localStorage.setItem('toDoList', JSON.stringify([]));
  document.body.innerHTML = '<ul id="placeholder"></ul>';
});
