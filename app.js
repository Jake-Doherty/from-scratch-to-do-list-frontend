/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo, fetchTodos, getUser } from './fetch-utils.js';
import { renderTodo } from './render-utils.js';

/* Get DOM Elements */
const todoForm = document.getElementById('todo-form');
const errorDisplay = document.getElementById('error-display');
const todoList = document.getElementById('todo-list');

/* State */

let error = null;
// let todos = [];

/* Events */

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);
    const user = await getUser();

    const todo = {
        userId: user.id,
        detail: formData.get('item-input'),
    };

    const response = await createTodo(todo);

    const error = response.error;

    if (error) {
        displayError();
    } else {
        todoForm.reset();
        loadTodos();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function loadTodos() {
    todoList.innerHTML = '';
    const todos = await fetchTodos();
    for (let todo of todos) {
        const todoLI = document.createElement('li');
        todoLI.textContent = todo.detail;
        todoList.append(todoLI);
    }
}

loadTodos();
