import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle, displayModalNew, addProjectDropdownOptions, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn, uuidHandler, displayModalEdit } from "./user-interface.js";
import "./styles.css"

const newTodoItemBtn = document.querySelector('#new-todo-item-btn');
const newProjectBtn = document.querySelector('#new-project-btn');
const newProjectModal = document.querySelector('#new-project-modal');
const newProjectForm = document.querySelector('#new-project-form');
const createProjectBtn = document.querySelector('#create-project-btn');
const allItemsBtn = document.querySelector('#all-items-btn');
const todoItemModal = document.querySelector('#todo-item-modal');
const todoItemForm = document.querySelector('#todo-item-form');
const sidebarDiv = document.querySelector('#sidebar');
const contentDiv = document.querySelector('#content');
const deleteTodoItemModal = document.querySelector('#delete-todo-item-modal');

const title = document.querySelector('#title');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const project = document.querySelector('#project-dropdown');
const newProjectInput = document.querySelector('#new-project-input');

// MIGHT WANT TO QUERY SELECT ALL BASED ON TYPE AND THEN ADD EVENT LISTENERS THAT WAY.

// Add event listeners to buttons within modals. Only for buttons used in multiple places.
const allModals = document.querySelectorAll('dialog');
for (let currentModal of allModals) {
    const currentForm = document.querySelector(`#${currentModal.id} > form`);

    currentModal.addEventListener('click', (e) => {
        if (e.target.dataset.purpose === 'closeModal') {
            currentModal.close();
        }

        if (e.target.dataset.purpose === 'createTodoItem') {
            if (!(currentForm.reportValidity())) {
                return;
            }

            createTodoItem(title.value, dueDate.value, priority.value, project.value);
            currentForm.reset();
            displayProjectsAll();
            currentModal.close();
        }

        if (e.target.dataset.purpose === 'editTodoItem') {
            // Add code here using editTodoItem(uuid, property, newValue)
            // All params will come from the form the user fills out
        }

        if (e.target.dataset.purpose === 'showDeleteTodoItemModal') {
            currentModal.close();
            deleteTodoItemModal.showModal();
        }

        if (e.target.dataset.purpose === 'deleteTodoItem') {
            deleteTodoItem(uuidHandler.getCurrentUuid());
            currentModal.close();
            displayProjectsAll();   // Need to find a way to keep on the users last view, whether it was all projects or a single project
        }
    })
}

// Add event listners to buttons in sidebar.
sidebarDiv.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'displayProjectsAll') {
        displayProjectsAll();
    }

    if (e.target.dataset.purpose === 'displayProjectSingle') {
        displayProjectSingle(e.target.id);
    }

    if (e.target.dataset.purpose === 'showNewProjectModal') {
        newProjectModal.showModal();
    }
})

contentDiv.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'showEditTodoItemModal') {
        uuidHandler.setCurrentUuid(e);
        displayModalEdit();
    }

    if (e.target.dataset.purpose === 'showNewTodoItemModal') {
        displayModalNew();
    }

    if (e.target.dataset.purpose === 'showDeleteTodoItemModal') {
        uuidHandler.setCurrentUuid(e);
        deleteTodoItemModal.showModal();
    }
})


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