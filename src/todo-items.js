const TodoItemCreator = class {
    constructor(title, dueDate, priority, project) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.uuid = self.crypto.randomUUID();
        this.status = 'incomplete';
    }
};

let todoList = {default: [],};

const createProject = (project) => {
    if (!(project in todoList)) {   // If project doesn't exist yet, create it.
        todoList[project] = [];
        return true;
    }

    else {
        alert('Project name already exists. Please enter a new name.');
        return false;
    }
}

const createTodoItem = (title, dueDate, priority, project) => {
    if (!(project in todoList)) {
        return;
    }
    
    const todoItem = new TodoItemCreator(title, dueDate, priority, project);
    todoList[project].push(todoItem);
}

const getTodoList = () => todoList;

const getTodoItemInfo = (uuid) => {
    for (let project in todoList) {
        for (let todoItem of todoList[project]) {
            if (todoItem.uuid === uuid) {
                const index = todoList[project].indexOf(todoItem);
                return {todoItem,
                        project,
                        index,
                };
            }
        }
    }
}

const moveTodoItem = (uuid, project) => {
    const todoItemToMove = getTodoItemInfo(uuid).todoItem;
    deleteTodoItem(uuid);

    todoItemToMove.project = project;
    todoList[project].push(todoItemToMove);
}

const editTodoItem = (uuid, property, newValue) => {
    if (property === 'project') {
        moveTodoItem(uuid, newValue);
    }
    
    const todoItemToEdit = getTodoItemInfo(uuid).todoItem;
    todoItemToEdit[property] = newValue;
}

const editProjectName = (oldProjectName, newProjectName) => {
    if (newProjectName in todoList) {
        alert('Project name already exists. Cannot rename.');
        return;
    }

    todoList[newProjectName] = todoList[oldProjectName];
    for (let todoItem of todoList[newProjectName]) {
        todoItem.project = newProjectName;
    }

    delete todoList[oldProjectName];
}

const deleteTodoItem = (uuid) => {
    const todoItemInfo = getTodoItemInfo(uuid);
    const project = todoItemInfo.project;
    const index = todoItemInfo.index;

    todoList[project].splice(index, 1);
}


const deleteProject = (project) => {    // UI won't have option to delete default
    if (project === 'default') {        // project but this is a fail safe.
        return;
    }    
    
    delete todoList[project];
}

const populateStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const getStorage = () => {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    console.log(todoList);
}

const storageHandler = () => {
    if (!localStorage.length) {
        populateStorage();
        getStorage();
    }
    
    else {
        getStorage();
    }
}

export { createProject, createTodoItem, getTodoList, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject, storageHandler, populateStorage };