import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle, displayModalNew, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn } from "./user-interface.js";
import "./styles.css"

const newTodoItemBtn = document.querySelector('#new-todo-item-btn');
const newProjectBtn = document.querySelector('#new-project-btn');
const allItemsBtn = document.querySelector('#all-items-btn');
const todoItemModal = document.querySelector('#todo-item-modal');

const title = document.querySelector('#title');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const project = document.querySelector('#project-dropdown');


// By doing this, we can dynamically create any number of buttons we want
// and add automatically event listerners based on their purpose
todoItemModal.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'closeModal') {
        todoItemModal.close();
    }

    if (e.target.dataset.purpose === 'createTodoItem') {
        createTodoItem(title.value, dueDate.value, priority.value, project.value);
        displayProjectsAll();
    }

    if (e.target.dataset.purpose === 'editTodoItem') {
        // Add code here using editTodoItem(uuid, property, newValue)
        // All params will come from the form the user fills out
    }

    if (e.target.dataset.purpose === 'deleteTodoItem') {
      // Add code here using deleteTodoItem(uuid)
      // the todoItemDivs have a dataset.uuid
    }
})

newTodoItemBtn.addEventListener('click', displayModalNew);
// newProjectBtn.addEventListener('click', );
allItemsBtn.addEventListener('click', displayProjectsAll);