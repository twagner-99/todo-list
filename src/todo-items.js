const TodoItemCreator = class {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uuid = self.crypto.randomUUID();
        // Probably will need to add property for completetionStatus = true or false
        // that will toggle when checkboxes are checked 
    }
};

const todoList = {"My Stuff": [],};     // "My Stuff" is default project.

const createProject = (project) => {
    if (!(project in todoList)) {   // If project doesn't exist yet, create it.
        todoList[project] = [];
    }

    else {
        console.log('Project name already exists. Please enter a new name');    // Will eventually be returned instead of console.logged
    }
}

const createTodoItem = (title, description, dueDate, priority, project) => {
    const todoItem = new TodoItemCreator(title, description, dueDate, priority);
    todoList[project].push(todoItem);

    // Once UI is available, user will only be able to select existing projects
    // from a drop-down so there's no risk of them trying to select one that doesn't exist.
    // If they do want one that doesn't exist, they'll have an option to create it.
}

const getTodoList = () => todoList;

const getTodoItemInfo = (uuid) => {
    for (let key in todoList) {                 // Change verbiage? From key to project?
        for (let todoItem of todoList[key]) {
            if (todoItem.uuid === uuid) {
                const index = todoList[key].indexOf(todoItem);
                return {todoItem,
                        key,
                        index,
                };
            }
        }
    }
}

// const displayTodoList = () => console.log(todoList);

// const displayProject = (project) => {
//     console.log(todoList[project]);
// }

const editTodoItem = (uuid, property, newValue) => {
    const todoItemToEdit = getTodoItemInfo(uuid).todoItem;
    todoItemToEdit[property] = newValue;
}

const editProjectName = (oldProjectName, newProjectName) => {
    if (newProjectName in todoList) {  // Could have also chosen if, else statement
        console.log('Project name already exists. Cannot rename.');     // Will eventually be returned instead of console.logged
        return;
    }

    todoList[newProjectName] = todoList[oldProjectName];
    delete todoList[oldProjectName];
}

const moveTodoItem = (uuid, project) => {
    const todoItemToMove = getTodoItemInfo(uuid).todoItem;
    deleteTodoItem(uuid);

    todoList[project].push(todoItemToMove);
}

const deleteTodoItem = (uuid) => {
    const todoItemInfo = getTodoItemInfo(uuid);     // Makes sure we only run getTodoItemInfo fn one time
    const key = todoItemInfo.key;
    const index = todoItemInfo.index;

    todoList[key].splice(index, 1);
}


const deleteProject = (project) => {    // UI won't have option to delete default project "My Stuff"
    delete todoList[project];
}

export { createProject, createTodoItem, getTodoList, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject };