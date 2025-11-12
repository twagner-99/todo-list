import { getTodoList } from "./todo-items";

const todoListDiv = document.querySelector('#todo-list');
const projectHeadingMain = document.querySelector('#project-heading');
const todoItemModal = document.querySelector('#todo-item-modal');
const modalBtnsDiv = document.querySelector('#modal-btns-div');
const projectDropdown = document.querySelector('#project-dropdown')

const displayProjectsAll = () => {
    removeAllChildNodes(todoListDiv);
    projectHeadingMain.textContent = 'All Items';
    
    const todoList = getTodoList();     // Do this each time to get current snapshot?
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
        const todoItemDiv = createTodoItem(todoItem);
        projectDiv.appendChild(todoItemDiv);
    }

    return projectDiv;
}

const createTodoItem = (todoItem) => {
    const todoItemDiv = document.createElement('div');
    const todoItemPara = document.createElement('p');

    todoItemDiv.dataset.uuid = todoItem.uuid;
    todoItemPara.textContent = todoItem.title;

    todoItemDiv.appendChild(todoItemPara);
    return todoItemDiv;
}

const removeAllChildNodes = (parentNode) => {
    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

const createBtn = (id, text) => {
    const newBtn = document.createElement('button');
    newBtn.id = id;
    newBtn.textContent = text;

    return newBtn;
}

const createTodoItemBtnsNew = () => {
    const newTodoItemBtns = [];
    
    newTodoItemBtns.push(createBtn('cancelBtn', 'Cancel'));
    newTodoItemBtns.push(createBtn('createTodoItemBtn', 'Create Task'));
    
    return newTodoItemBtns;
}

const createTodoItemBtnsEdit = () => {
    const editTodoItemBtns = [];
    
    editTodoItemBtns.push(createBtn('deleteBtn', 'Delete Task'));
    editTodoItemBtns.push(createBtn('discardBtn', 'Discard Changes'));
    editTodoItemBtns.push(createBtn('saveBtn', 'Save Changes'));
    
    return editTodoItemBtns;
}

const appendChildren = (parentNode, children) => {
    children.forEach((child) => {
        parentNode.appendChild(child);
    });
}

const createProjectDropdowns = () => {
    const todoList = getTodoList();
    for (let project in todoList) {
        if (project === 'default') {
            return;
        }

        const projectOption = document.createElement('option');
        projectOption.textContent = project;
        projectDropdown.appendChild(projectOption);
    }
}
const displayModalNew = () => {                            // These could be put in a single fn with an if statement... but then we have to query the e param
    appendChildren(modalBtnsDiv, createTodoItemBtnsNew()); // This way, we just run one when one btn is clicked, and the other when another btn is clicked.
    createProjectDropdowns();                              // Seems better for separation for DOM to do it this way.
    todoItemModal.showModal();
}

const displayModalEdit = () => {
    appendChildren(modalBtnsDiv, createTodoItemBtnsEdit());
    createProjectDropdowns();
    todoItemModal.showModal();
}


export { displayProjectsAll, displayProjectSingle, displayModalNew };

// When user adds new project, auto-load it right after
// When add is clicked user can select what project
    // But the default will either be deault when in 
    // All Items or whatever project they're currently in