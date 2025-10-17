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

const getTodoList = () => todoList;

const displayTodoList = () => console.log(getTodoList());

const displayProject = (project) => {
    console.log(getTodoList()[project]);
}

const editTodoItem = (uuid, property, newValue) => {
    const currentTodoList = getTodoList();
    for (let key in currentTodoList) {
        for (let currentTodoItem of currentTodoList[key]) {   // Using for...of b/c ability to break.
            if (currentTodoItem.uuid === uuid) {
                currentTodoItem[property] = newValue;   // Bracket notation b/c property is essentially a variable.
                break;
            }
        }
    }
}

const deleteTodoItem = (uuid) => {
    const currentTodoList = getTodoList();           // Store in variable to prevent running function over and over.
    for (let key in currentTodoList) {
        for (let currentTodoItem of currentTodoList[key]) {   // Updated to for...of b/c ability to break.
            if (currentTodoItem.uuid === uuid) {
                const index = currentTodoList[key].indexOf(currentTodoItem);
                currentTodoList[key].splice(index, 1);
                break;
            }
        }
    }
}

// Decide if I want all of these to be fn expressions or change to fn declarations.

window.createTodoItem = createTodoItem;
window.displayTodoList = displayTodoList;
window.editTodoItem = editTodoItem;
window.deleteTodoItem = deleteTodoItem;
window.addToTodoList = addToTodoList;
window.displayProject = displayProject;

