import { getTodoList, createTodoItem, deleteTodoItem, editTodoItem } from "./todo-items";

const todoListDiv = document.querySelector('#todo-list');
const projectHeadingMain = document.querySelector('#project-heading');
const todoItemModal = document.querySelector('#todo-item-modal');
const modalBtnsDiv = document.querySelector('#modal-btns-div');
const projectDropdown = document.querySelector('#project-dropdown');
const navBar = document.querySelector('nav');

const displayProjectsAll = () => {
    removeAllChildNodes(todoListDiv);
    projectHeadingMain.textContent = 'All Items';
    
    const todoList = getTodoList();     // Do this each time to get current snapshot
    for (let project in todoList) {
        const projectDiv = createProjectsAll(project);
        todoListDiv.appendChild(projectDiv);
    }
}

const displayProjectSingle = (project) => {
    removeAllChildNodes(todoListDiv);
    projectHeadingMain.textContent = project;
    const projectDiv = createProjectSingle(project);
    todoListDiv.appendChild(projectDiv);
}

const createProjectsAll = (project) => {
    const projectDiv = createProjectSingle(project);

    if (!(project === 'default')) {
        const projectSubheader = document.createElement('h2');
        projectSubheader.textContent = project;
        projectDiv.prepend(projectSubheader);
    }

    return projectDiv;
}

const createProjectSingle = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.id = project;

    const todoList = getTodoList();
    for (let todoItem of todoList[project]) {
        const todoItemDiv = createTodoItemDiv(todoItem);
        projectDiv.appendChild(todoItemDiv);
    }

    return projectDiv;
}

const createTodoItemDiv = (todoItem) => {
    const todoItemDiv = document.createElement('div');
    const todoItemPara = document.createElement('p');

    todoItemDiv.dataset.uuid = todoItem.uuid;
    todoItemPara.textContent = todoItem.title;

    todoItemDiv.appendChild(todoItemPara);
    return todoItemDiv;
}


// Need to add a modal dialog to enter new project name. Will have option to create or cancel.
// When project name is entered, its value will be used to createProject() from todo-items.js
    // and addProjectDropdownOptions() from user-interface.js
const addProjectBtn = (project) => {
    const projectBtn = createBtn(project, project, 'button', 'displayProjectSingle'); // Add event listeners to these
    navBar.appendChild(projectBtn);
}

const deleteProjectBtn = (project) => {
    const projectBtn = document.querySelector(`button[id=${project}]`);
    navBar.removeChild(projectBtn);
}

const removeAllChildNodes = (parentNode) => {
    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

const createBtn = (id, text, type, purpose) => {
    const newBtn = document.createElement('button');
    newBtn.id = id;
    newBtn.textContent = text;
    newBtn.type = type;
    newBtn.dataset.purpose = purpose;

    return newBtn;
}

const newTodoItemBtns = [];
const editTodoItemBtns = [];

const createTodoItemBtns = (function() {
    newTodoItemBtns.push(createBtn('cancelBtn', 'Cancel', 'button', 'closeModal'));
    newTodoItemBtns.push(createBtn('createTodoItemBtn', 'Create Task', 'button', 'createTodoItem'));
    
    editTodoItemBtns.push(createBtn('deleteBtn', 'Delete Task', 'button', 'deleteTodoItem'));
    editTodoItemBtns.push(createBtn('discardBtn', 'Discard Changes', 'button', 'closeModal'));
    editTodoItemBtns.push(createBtn('saveBtn', 'Save Changes', 'button', 'saveFormValues'));
})();

// NEED TO ADD AUTOFOCUS. ADD OPTIONAL PARAM AND ADD TO SAVEFORMVALUE BUTTONS? OR CANCEL BUTTONS?

const appendChildren = (parentNode, children) => {
    children.forEach((child) => {
        parentNode.appendChild(child);
    });
}

const addProjectDropdownOptions = () => {
    const todoList = getTodoList();
    for (let project in todoList) {
        if (project !== 'default') {    // No if project === default return statment b/c default is always there.
            const projectOption = document.createElement('option');
            projectOption.value = project;
            projectOption.textContent = project;
            projectDropdown.appendChild(projectOption);
        }
    }
}

const deleteProjectDropdownOptions = (project) => {     // might end up needing to be uuid from whatever we click. then project can be looked up.
    if (project === 'default') {      // Not allowed to get rid of default
        return;
    }

    const projectOption = document.querySelector(`[value="${project}"]`);
    projectDropdown.removeChild(projectOption);
}

const displayModalNew = () => {                            // These could be put in a single fn with an if statement... but then we have to query the e param
    appendChildren(modalBtnsDiv, newTodoItemBtns); // This way, we just run one when one btn is clicked, and the other when another btn is clicked.
    addProjectDropdownOptions();                           // Seems better for separation for DOM to do it this way.
    todoItemModal.showModal();
}

const displayModalEdit = () => {
    appendChildren(modalBtnsDiv, editTodoItemBtns);
    addProjectDropdownOptions();
    todoItemModal.showModal();
}

export { displayProjectsAll, displayProjectSingle, displayModalNew, addProjectDropdownOptions, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn };

// When user adds new project, auto-load it right after
// When add is clicked user can select what project
    // But the default will either be deault when in 
    // All Items or whatever project they're currently in