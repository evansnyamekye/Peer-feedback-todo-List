import { updateItemInLocalStorage, deleteNow } from './storage';

class UI {
  errorMsg(message, color) {
    this.message = message;
    this.color = color;
    const msg = document.querySelector('.msg');
    msg.style.display = 'block';
    msg.innerText = message;
    msg.style.background = color;
    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  }

  static getItems() {
    let todoData;
    if (localStorage.getItem('todoData') === null) {
      todoData = [];
    } else {
      todoData = JSON.parse(localStorage.getItem('todoData'));
    }
    return todoData;
  }

  displayTask(newTodo) {
    this.newTodo = newTodo;
    const ul = document.querySelector('.ul');
    const list = document.createElement('li');
    list.id = 'list';
    list.className = newTodo.index;
    const div = document.createElement('div');
    div.className = 'divn';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = newTodo.index;
    checkbox.className = 'check';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = newTodo.index;
    input.className = 'edit';
    input.value = newTodo.description;

    if (newTodo.completed === true) {
      input.classList.add('completed');
      checkbox.checked = true;
    } else {
      input.classList.remove('completed');
      checkbox.checked = false;
    }

    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.id = 'bar';
    ellipsisIcon.className = 'fas fa-ellipsis-v';

    const trashIcon = document.createElement('i');
    trashIcon.id = 'remove';
    trashIcon.className = 'fas fa-trash-alt hidden';

    div.appendChild(checkbox);
    div.appendChild(input);

    list.appendChild(div);
    list.appendChild(ellipsisIcon);
    list.appendChild(trashIcon);
    ul.appendChild(list);

    const newInput = list.querySelector('.edit');
    newInput.addEventListener('input', () => {
      // Update the description of the task
      newTodo.description = newInput.value;

      // Update the task in the localStorage
      updateItemInLocalStorage(newTodo.index, newTodo);
    });

    newInput.addEventListener('focusin', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        item.classList.add('active');
        const trashIcon = item.querySelector('.fa-trash-alt');
        const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
        trashIcon.classList.remove('hidden');
        ellipsisIcon.classList.add('hidden');
        if (item === list) {
          item.classList.add('active');
          trashIcon.classList.remove('hidden');
          ellipsisIcon.classList.add('hidden');
        }
      });
    });

    // Add event listener to check if completed === true
    const checkboxI = list.querySelector('.check');
    checkboxI.addEventListener('change', () => {
      // Update the status of the task
      newTodo.completed = !newTodo.completed;

      if (newTodo.completed === true) {
        input.classList.add('completed');
        checkbox.checked = true;
      } else {
        input.classList.remove('completed');
        checkbox.checked = false;
      }

      // Update the task in the localStorage
      updateItemInLocalStorage(newTodo.index, newTodo);
    });

    // Add event listener to delete icon
    trashIcon.addEventListener('click', () => {
      const taskId = newTodo.index;

      // Remove the task from the UI
      ul.removeChild(list);

      // Remove the task from the localStorage
      deleteNow(taskId);
    });
  }
}

export default UI;