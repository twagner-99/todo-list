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
        console.log('Project name already exists. Please enter a new name');
    }
}

const createTodoItem = (title, description, dueDate, priority, project) => {
    const todoItem = new TodoItemCreator(title, description, dueDate, priority);
    todoList[project].push(todoItem);

    // Once UI is available, user will only be able to select existing projects
    // from a drop-down so there's no risk of them trying to select one that doesn't exist.
    // If they do want one that doesn't exist, they'll have an option to create it.
}

const getTodoItemInfo = (uuid) => { // LOOK INTO BREAK STATEMENTS. NEED TO QUIT AFTER RETURN.
    for (let key in todoList) {
        for (let currentTodoItem of todoList[key]) {
            if (currentTodoItem.uuid === uuid) {
                const index = todoList[key].indexOf(currentTodoItem);
                return {currentTodoItem,
                        key,
                        index,
                };
            }
        }
    }
}

const displayTodoList = () => console.log(todoList);

const displayProject = (project) => {
    console.log(todoList[project]);
}

const editTodoItem = (uuid, property, newValue) => {
    const todoItem = getTodoItemInfo(uuid).currentTodoItem;
    todoItem[property] = newValue;
}

const deleteTodoItem = (uuid) => {
    const key = getTodoItemInfo(uuid).key;
    const index = getTodoItemInfo(uuid).index;

    todoList[key].splice(index, 1);
}


const deleteProject = (project) => {    // UI won't have option to delete default project "My Stuff"
    for (let key in todoList) {
        if (key === project) {
            delete todoList[key];
            break; // LOOK INTO BREAK STATEMENTS. NEED TO QUIT AFTER RETURN.
        }
    }
}

// NEED TO ADD THESE FUNCTIONS - 
    // editProject
    // moveTodoItem

export { createProject, createTodoItem, getTodoItemInfo, displayTodoList, displayProject, editTodoItem, deleteTodoItem, deleteProject };

// Need ability to: edit project name
    // That will then update the project of the item, too
// Need logic that if user updates project of todo item, it goes where it needs to
    // You can only select projects that already exist from a dropdown
    // And if it doesn't exist, can click add new project option
        // I.e. when creating todoItem, if project doesn't exist, create it