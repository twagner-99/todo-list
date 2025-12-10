import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle, displayModalNew, addProjectDropdownOptions, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn } from "./user-interface.js";
import "./styles.css"

const newTodoItemBtn = document.querySelector('#new-todo-item-btn');
const newProjectBtn = document.querySelector('#new-project-btn');
const newProjectModal = document.querySelector('#new-project-modal');
const newProjectForm = document.querySelector('#new-project-form');
const createProjectBtn = document.querySelector('#create-project-btn');
const allItemsBtn = document.querySelector('#all-items-btn');
const todoItemModal = document.querySelector('#todo-item-modal');
const todoItemForm = document.querySelector('#todo-item-form');

const title = document.querySelector('#title');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const project = document.querySelector('#project-dropdown');
const newProjectInput = document.querySelector('#new-project-input');

// By doing this, we can dynamically create any number of buttons we want
// and add automatically event listerners based on their purpose

//querySelectorAll for any modal? Then loop thru those?
todoItemModal.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'closeModal') {
        todoItemModal.close();
    }

    if (e.target.dataset.purpose === 'createTodoItem') {
        if (!(todoItemForm.reportValidity())) { // This needs to find todoItemForm equivalent
            return;
        }

        createTodoItem(title.value, dueDate.value, priority.value, project.value);
        todoItemForm.reset();
        displayProjectsAll();
        todoItemModal.close();
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
newProjectBtn.addEventListener('click', () => newProjectModal.showModal());
createProjectBtn.addEventListener('click', () => { // should I leverage event bubbling here or is it not needed b/c these buttons aren't dynamically created?
    if (!(newProjectForm.reportValidity())) {   // should prob be in it's own fn, like form check. and then the form it's checking is a parameter
        return;
    }
    
    createProject(newProjectInput.value);
    addProjectBtn(newProjectInput.value);
    addProjectDropdownOptions();
    newProjectForm.reset();
    newProjectModal.close();
    // QUESTION! SHOULD ALL THESE BE BLOBBED INTO THEIR OWN FN UNDER USER-INTERFACE
    // AND THEN CALL THAT SINGLE FN HERE? PROBABLY
})

allItemsBtn.addEventListener('click', displayProjectsAll);

// At the end of this, can clean things up
// Maybe get anything with a dataset purpose and based on that have
    // showModals
    // close modals
    // create, edit, and delete todo items