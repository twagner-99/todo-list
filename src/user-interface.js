import { getTodoList, getTodoItemInfo } from "./todo-items";
import { intlFormatDistance, differenceInCalendarDays } from "date-fns";

// IDEA - EXTEND TODOITEMS.JS CLASSES TO BE ABLE TO DO UI STUFF
const todoListDiv = document.querySelector('#todo-list');
const todoItemModal = document.querySelector('#todo-item-modal');
const modalBtnsDiv = document.querySelector('#modal-btns-div');
const projectDropdown = document.querySelector('#project-dropdown');
const navBar = document.querySelector('nav');

class TodoItemUICreator extends TodoItemCreator {   
    constructor(title, dueDate, priority, project) {
        super(title, dueDate, priority, project);
    }
    
    createTodoItemDiv() {
        const todoItemDiv = document.createElement('div');
        const todoItemPara = document.createElement('p');
        const dueDatePara = document.createElement('p');
        const checkbox = document.createElement('input');
        
        const deleteBtn = createBtn('deleteBtn', 'Delete', 'button', 'showDeleteTodoItemModal');
        const editBtn = createBtn('editBtn', 'Edit', 'button', 'showEditTodoItemModal');
        
        todoItemDiv.dataset.uuid = this.uuid;
        todoItemPara.textContent = this.title;
        todoItemPara.classList.add('project-name-para');
        dueDatePara.textContent = this.formatDate();

        checkbox.type = 'checkbox';
        checkbox.dataset.purpose = 'statusCheckbox';
        
        this.toggleCheckbox();
        
        const childrenToAppend = [checkbox, todoItemPara, dueDatePara, deleteBtn, editBtn];
        appendChildren(todoItemDiv, childrenToAppend);
        
        return todoItemDiv;
    }

    formatDate() {
        const dateToday = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
        const dueDateFormatted = intlFormatDistance(this.dueDate, dateToday, {unit: 'day'});
        const daysUntilDueDate = differenceInCalendarDays(this.dueDate, dateToday);
        
        if (daysUntilDueDate <= 7) {
            return `Due Date: ${dueDateFormatted}`;
        }
        
        else {
            return `Due Date: ${this.dueDate}`;
        }
    }

    toggleCheckbox() {
        if (this.status === 'complete') {
            checkbox.checked = true;
        }
        
        else {
            checkbox.checked = false;
        }
    }
}

class ProjectUICreator extends ProjectCreator {
    constructor(project) {
        super(project);
    }
    
    createProjectSingleUI() {
        removeAllChildNodes(todoListDiv);
        const project = super.getProjectName();

        const projectDivSingle = document.createElement('div');
        projectDivSingle.classList.add('project-container-single');
        projectDivSingle.id = this[project];

        projectDivSingle.prepend(createBtn('updateProjectBtn', '...', 'button', 'showUpdateProjectModal'));

        const projectMainHeader = document.createElement('h1');
        projectMainHeader.textContent = project;
        projectDivSingle.prepend(projectMainHeader);
        
        const todoList = getTodoList();

        for (let todoItem of this[project]) {
            const todoItemDiv = todoItem.createTodoItemDiv();
            projectDivSingle.appendChild(todoItemDiv);
        }

        todoListDiv.appendChild(projectDivSingle);
    }

    static createProjectAllUI() {
        removeAllChildNodes(todoListDiv);
        const todoList = getTodoList();

        const projectDivAll = document.createElement('div');
        projectDivAll.classList.add('project-container-all');

        for (let projectObj of todoList) {
            for (let project in projectObj) {
                const projectDivSingle = document.createElement('div');
                projectDivSingle.classList.add('project-container-single');
                projectDivSingle.id = this[project];

                if (project === 'default') {
                    const projectMainHeader = document.createElement('h1');
                    projectMainHeader.textContent = 'All Items';
                    projectDivSingle.prepend(projectMainHeader);
                }

                else {
                    const projectSubheader = document.createElement('h2');
                    projectSubheader.textContent = project;
                    projectDivSingle.prepend(createBtn('updateProjectBtn', '...', 'button', 'showUpdateProjectModal'));
                    projectDivSingle.prepend(projectSubheader);
                }

                for (let todoItem of projectObj[project]){
                    const todoItemDiv = todoItem.createTodoItemDiv();
                    projectDivSingle.appendChild(todoItemDiv);
                }

                projectDivAll.appendChild(projectDivSingle);
            }
        }

        todoListDiv.appendChild(projectDivAll);
    }
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