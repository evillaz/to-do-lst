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

beforeEach(() => {
  localStorage.setItem('toDoList', JSON.stringify([]));
  document.body.innerHTML = '<ul id="placeholder"></ul>';
});
