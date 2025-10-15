import "./styles.css"

// TODO CLASS CREATION
const TodoItemCreator = class {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uuid = self.crypto.randomUUID();
    }
};

const todoList = [];

const createTodoItem = (title, description, dueDate, priority) => {
    let todoItem = new TodoItemCreator(title, description, dueDate, priority);
    todoList.push(todoItem); // Should addToTodoList be its own fn? If we wanted to, we'd have to return the todoItem. Seems unnecessary.
}

const getTodoList = () => todoList;

const displayTodoList = () => console.log(getTodoList());

const editTodoItem = (uuid, property, newValue) => {    // Should I use toString() here? When using forms it'll always be string so probably not needed.
    const latestTodoList = getTodoList();
    for (let currentTodoItem of latestTodoList) {   // Using for...of b/c ability to break.
        if (currentTodoItem.uuid === uuid) {
            currentTodoItem[property] = newValue;   // Bracket notation b/c property is essentially a variable.
            break;
        }
    }
}

const deleteTodoItem = (uuid) => {
    const latestTodoList = getTodoList();
    latestTodoList.forEach((todoItem, index) => {   // Using forEach() b/c ability to easily get index.
        if (todoItem.uuid === uuid) {
            latestTodoList.splice(index, 1);
        }
    })
}

// Decide if I want all of these to be fn expressions or change to fn declarations.

window.createTodoItem = createTodoItem;
window.displayTodoList = displayTodoList;
window.editTodoItem = editTodoItem;
window.deleteTodoItem = deleteTodoItem;

