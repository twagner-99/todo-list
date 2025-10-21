const TodoItemCreator = class {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.uuid = self.crypto.randomUUID();
    }
};

const todoList = {};

const createTodoItem = (title, description, dueDate, priority, project) => {
    addToTodoList(new TodoItemCreator(title, description, dueDate, priority, project));
}

const addToTodoList = (todoItem) => {
    let key = todoItem.project;

    if (!(key in todoList)) {
        const newProject = todoItem.project;
        todoList[newProject] = [];
        todoList[newProject].push(todoItem);
    }

    else {
        todoList[key].push(todoItem);
    }
}

// const getTodoList = () => todoList;

const displayTodoList = () => console.log(todoList);

const displayProject = (project) => {
    console.log(todoList[project]);
}

const editTodoItem = (uuid, property, newValue) => {
    for (let key in todoList) {
        for (let currentTodoItem of todoList[key]) {   // Using for...of b/c ability to break.
            if (currentTodoItem.uuid === uuid) {
                currentTodoItem[property] = newValue;   // Bracket notation b/c property is essentially a variable.
                break;
            }
        }
    }
}

const deleteTodoItem = (uuid) => {
    for (let key in todoList) {
        for (let currentTodoItem of todoList[key]) {   // Updated to for...of b/c ability to break.
            if (currentTodoItem.uuid === uuid) {
                const index = todoList[key].indexOf(currentTodoItem);
                todoList[key].splice(index, 1);
                break;
            }
        }
    }
}

const createProject = (project) => {
    if (!(project in todoList)) {
        todoList[project] = [];
    }

    else {
        console.log('Project name already exists. Please enter a new name');
    }
}

const deleteProject = (project) => {
    for (let key in todoList) {
        if (key === project) {
            delete todoList[key];
            break;
        }
    }
}

export { createTodoItem, displayTodoList, editTodoItem, deleteTodoItem, addToTodoList, displayProject, createProject, deleteProject };

// Need ability to: edit project name
    // That will then update the project of the item, too
// Need logic that if user updates project of todo item, it goes where it needs to
    // You can only select projects that already exist from a dropdown
    // And if it doesn't exist, can click add new project option
        // I.e. when creating todoItem, if project doesn't exist, create it