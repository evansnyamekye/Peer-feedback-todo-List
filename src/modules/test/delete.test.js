import { deleteNow } from '../storage';

describe('deleteNow function', () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.localStorage;
  });

  it('should_delete_task_and_update_localStorage', () => {
    // Mock the return value of localStorage.getItem
    const todoDataMock = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 2' },
      { index: 3, description: 'Task 3' },
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(todoDataMock));

    const taskId = 2;
    deleteNow(taskId);

    // Verify that the task is deleted and the index is update
    const expectedTodoData = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 3' },
    ];

    // Verify that localStorage.setItem is called with the updated todoData
    expect(localStorage.setItem).toHaveBeenCalledWith('todoList', JSON.stringify(expectedTodoData));
  });
});