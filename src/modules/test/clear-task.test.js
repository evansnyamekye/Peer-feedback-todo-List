// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { clearCompletedTasks } from '../storage';

describe('Test edit and complete status', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <body>
        <ul>
          <li class="completed">Task 1</li>
          <li>Task 2</li>
          <li class="completed">Task 3</li>
        </ul>
      </body>
    `, { runScripts: 'dangerously' });

    global.document = dom.window.document;
    global.window = dom.window;
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.document;
    delete global.window;
    delete global.localStorage;
  });

  it('test_remove_completed_tasks', () => {
    const mockTodoData = [
      { index: 1, task: 'Task 1', completed: true },
      { index: 2, task: 'Task 2', completed: false },
      { index: 3, task: 'Task 3', completed: true },
    ];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(mockTodoData));

    // Act
    clearCompletedTasks();

    // Assert
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'todoList',
      JSON.stringify([{ index: 1, task: 'Task 2', completed: false }]),
    );
    expect(global.document.querySelectorAll('li').length).toBe(1);
    expect(global.document.querySelector('li').textContent).toBe('Task 2');
  });
});
