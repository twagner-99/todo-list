import { getTodoList, getTodoItemInfo } from "./todo-items";
import { intlFormatDistance, differenceInCalendarDays } from "date-fns";

const todoListDiv = document.querySelector('#todo-list');
const todoItemModal = document.querySelector('#todo-item-modal');
const modalBtnsDiv = document.querySelector('#modal-btns-div');
const projectDropdown = document.querySelector('#project-dropdown');
const navBar = document.querySelector('nav');

const displayProjectsAll = () => {
    removeAllChildNodes(todoListDiv);
    
    const todoList = getTodoList();     // Do this each time to get current snapshot
    for (let project in todoList) {
        const projectDiv = createProjectsAll(project);
        todoListDiv.appendChild(projectDiv);
    }
}

const displayProjectSingle = (project) => {
    removeAllChildNodes(todoListDiv);

    const projectMainHeader = document.createElement('h1');
    projectMainHeader.textContent = project;
    
    const projectDiv = createProjectSingle(project);
    projectDiv.prepend(createBtn('updateProjectBtn', '...', 'button', 'showUpdateProjectModal'));
    projectDiv.prepend(projectMainHeader);
    todoListDiv.appendChild(projectDiv);
}

const createProjectsAll = (project) => {
    const projectDiv = createProjectSingle(project);

    if (project === 'default') {
        const projectMainHeader = document.createElement('h1');
        projectMainHeader.textContent = 'All Items';
        projectDiv.prepend(projectMainHeader);
    }

    else {
        const projectSubheader = document.createElement('h2');
        projectSubheader.textContent = project;
        projectDiv.prepend(createBtn('updateProjectBtn', '...', 'button', 'showUpdateProjectModal'));
        projectDiv.prepend(projectSubheader);
    }

    return projectDiv;
}

const createProjectSingle = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.id = project;
    projectDiv.classList.add('project-container');

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
    const dueDatePara = document.createElement('p');
    const checkbox = document.createElement('input');

    const deleteBtn = createBtn('deleteBtn', 'Delete', 'button', 'showDeleteTodoItemModal');
    const editBtn = createBtn('editBtn', 'Edit', 'button', 'showEditTodoItemModal');

    todoItemDiv.dataset.uuid = todoItem.uuid;
    todoItemPara.textContent = todoItem.title;
    todoItemPara.classList.add('project-name-para');
    
    // MINOR UPDATE - Break out into date formatter function.
    const dateToday = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const dueDateFormatted = intlFormatDistance(todoItem.dueDate, dateToday, {unit: 'day'});
    const daysUntilDueDate = differenceInCalendarDays(todoItem.dueDate, dateToday);

    if (daysUntilDueDate <= 7) {
        dueDatePara.textContent = `Due Date: ${dueDateFormatted}`;
    }

    else {
        dueDatePara.textContent = `Due Date: ${todoItem.dueDate}`;
    }

    checkbox.type = 'checkbox';
    checkbox.dataset.purpose = 'statusCheckbox';

    if (todoItem.status === 'complete') {
        checkbox.checked = true;
    }

    else {
        checkbox.checked = false;
    }

    const childrenToAppend = [checkbox, todoItemPara, dueDatePara, deleteBtn, editBtn];
    appendChildren(todoItemDiv, childrenToAppend);

    return todoItemDiv;
}

const addProjectBtn = (project) => {
    const projectBtn = createBtn(project, project, 'button', 'displayProjectSingle');
    navBar.appendChild(projectBtn);
}

const deleteProjectBtn = (project) => {
    const projectBtn = document.querySelector(`button[id="${project}"]`);
    navBar.removeChild(projectBtn);
}

const editProjectBtn = (oldProjectName, newProjectName) => {
    const projectBtn = document.querySelector(`button[id="${oldProjectName}"]`);
    projectBtn.id = newProjectName;
    projectBtn.textContent = newProjectName;
}

const reloadProjectBtns = () => {
    const todoList = getTodoList();
    
    for (let project in todoList) {
        if (project !== 'default') {
            addProjectBtn(project);
        }
    }
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

const createTodoItemBtns = (function() {
    const newTodoItemBtns = [createBtn('cancelBtn', 'Cancel', 'button', 'closeModal'),
                             createBtn('createTodoItemBtn', 'Create Task', 'button', 'createTodoItem')];

    const editTodoItemBtns = [createBtn('cancelBtn', 'Cancel', 'button', 'closeModal'),
                             createBtn('deleteBtn', 'Delete Task', 'button', 'showDeleteTodoItemModal'),
                             createBtn('saveBtn', 'Save Changes', 'button', 'editTodoItem')];

    return { newTodoItemBtns, editTodoItemBtns };
})();

const appendChildren = (parentNode, children) => {
    children.forEach((child) => {
        parentNode.appendChild(child);
    });
}

const addProjectDropdownOptions = (project) => {
    const projectDropdownOptions = document.querySelectorAll('#project-dropdown > option');
    
    // if a child with value of project exists already, return
    for (let option of projectDropdownOptions) {
        if ([option].value === project) {
            return;
        }
    }
    
    if (project !== 'default') {    // No if project === default return statment b/c default is always there.
        const projectOption = document.createElement('option');
        projectOption.value = project;
        projectOption.textContent = project;
        projectDropdown.appendChild(projectOption);
    }
}

const deleteProjectDropdownOptions = (project) => {
    if (project === 'default') {    // Not allowed to get rid of default
        return;
    }

    const projectOption = document.querySelector(`[value="${project}"]`);
    projectDropdown.removeChild(projectOption);
}

const editProjectDropdownOption = (oldOptionName, newOptionName) => {
    if (oldOptionName === 'default' || newOptionName === 'default') {     // Not allowed to change default or rename something as default.
        return;
    }

    const projectOption = document.querySelector(`[value="${oldOptionName}"]`);
    projectOption.value = newOptionName;
    projectOption.textContent = newOptionName;
}

const reloadProjectDropdownOptions = () => {
    const todoList = getTodoList();
    
    for (let project in todoList) {
        addProjectDropdownOptions(project);
    }
}

const displayModalNew = () => {
    removeAllChildNodes(modalBtnsDiv);
    appendChildren(modalBtnsDiv, createTodoItemBtns.newTodoItemBtns);
    todoItemModal.showModal();
}

const displayModalEdit = () => {
    removeAllChildNodes(modalBtnsDiv);
    appendChildren(modalBtnsDiv, createTodoItemBtns.editTodoItemBtns);
    todoItemModal.showModal();
}

const uuidHandler = (function() {
    let uuid;
    
    const setCurrentUuid = (e) => {
        uuid = e.target.parentElement.dataset.uuid;
    }
    
    const getCurrentUuid = () => uuid;
    
    return { setCurrentUuid, getCurrentUuid };
})();

const currentTodoItemHandler = (function() {
    let currentTodoItem;

    const setCurrentTodoItem = (uuid) => {
        currentTodoItem = getTodoItemInfo(uuid);
    }

    const getCurrentTodoItem = () => currentTodoItem;

    return { setCurrentTodoItem, getCurrentTodoItem };

})();

const currentProjectHandler = (function() {
    let currentProject;

    const setCurrentProject = (e) => {
        currentProject = e.target.parentElement.id;
    }

    const getCurrentProject = () => currentProject;

    return { setCurrentProject, getCurrentProject };
})();

const taskStatusToggler = (e) => {
    uuidHandler.setCurrentUuid(e);
    currentTodoItemHandler.setCurrentTodoItem(uuidHandler.getCurrentUuid(e));

    const currentTodoItem = currentTodoItemHandler.getCurrentTodoItem().todoItem;
    
    if (e.target.checked) {
        currentTodoItem.status = 'complete';
        console.log(currentTodoItem.status);
    }

    else {
        currentTodoItem.status = 'incomplete';
        console.log(currentTodoItem.status);
    }
}

export { displayProjectsAll, displayProjectSingle, displayModalNew, addProjectDropdownOptions, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn, uuidHandler, displayModalEdit, currentTodoItemHandler, currentProjectHandler, editProjectDropdownOption, editProjectBtn, reloadProjectBtns, reloadProjectDropdownOptions, taskStatusToggler };