import { saveToLocalStorage } from '../storage';

describe('saveToLocalStorage function', () => {
  let mockLocalStorage;

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };

    // Assign the mock to the global object
    global.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.localStorage;
  });

  it('should_save_new_todo_to_localStorage', () => {
    const newTodo = { index: 1, description: 'New Task' };

    // Mock the return value of localStorage.getItem
    const existingTodos = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 2' },
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingTodos));

    saveToLocalStorage(newTodo);

    // Verify that localStorage.setItem is called with the updated todoList
    const expectedTodoList = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 2' },
      { index: 1, description: 'New Task' },
    ];
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todoList', JSON.stringify(expectedTodoList));
  });
});