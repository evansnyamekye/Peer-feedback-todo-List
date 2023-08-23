import { updateItemInLocalStorage } from '../storage';

describe('updateItemInLocalStorage function', () => {
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

  it('should update item in localStorage', () => {
    // Mock the return value of localStorage.getItem
    const todoDataMock = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 2' },
      { index: 3, description: 'Task 3' },
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(todoDataMock));

    const updatedItem = { index: 2, description: 'Updated Task 2' };
    const indexToUpdate = 2;
    updateItemInLocalStorage(indexToUpdate, updatedItem);

    // Verify that the item is updated in the localStorage
    const expectedTodoData = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Updated Task 2' },
      { index: 3, description: 'Task 3' },
    ];

    // Verify that localStorage.setItem is called with the updated todoData
    expect(localStorage.setItem).toHaveBeenCalledWith('todoList', JSON.stringify(expectedTodoData));
  });

  it('should not update item if index does not exist', () => {
    // Mock the return value of localStorage.getItem
    const todoDataMock = [
      { index: 1, description: 'Task 1' },
      { index: 2, description: 'Task 2' },
      { index: 3, description: 'Task 3' },
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(todoDataMock));

    const updatedItem = { index: 4, description: 'Updated Task 4' };
    const indexToUpdate = 4;
    updateItemInLocalStorage(indexToUpdate, updatedItem);

    // Verify that the localStorage is not modified
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
