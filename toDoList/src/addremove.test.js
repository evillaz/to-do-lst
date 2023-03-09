import { addTask } from './add';
import { remove } from './remove';
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

beforeEach(() => {
  localStorage.setItem('toDoList', JSON.stringify([]));
  document.body.innerHTML = '<ul id="placeholder"></ul>';
});
