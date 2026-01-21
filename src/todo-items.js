let todoList = [ {default: []} ];
const getTodoList = () => todoList;

class ProjectCreator {
    constructor(project) {
        this[project] = [];

        // Add project to todoList
        for (let key in this) {
            for (let projectObj of todoList) {
                if (key in projectObj) {
                    alert('Project name already exists. Please enter a new name.');
                    return false;
                }

                todoList.push(this);
                return;
            }
        }
    }

    getProjectName() {
        const keys = Object.keys(this);
        const [project] = keys;
        return project;
    }

    deleteProject() {                            // UI doesn't have option to delete default
        if (this.project === 'default') {        // project but this is a fail safe.
            return;
        }    
        
        delete todoList[this.project];
    }

    editProjectName(newProjectName) {
        if (newProjectName in todoList) {
            alert('Project name already exists. Cannot rename.');
            return;
        }

        todoList[newProjectName] = todoList[this.project];
        for (let todoItem of todoList[newProjectName]) {
            todoItem.project = newProjectName;
        }

        this.deleteProject();
    }
}

class TodoItemCreator {
    constructor(title, dueDate, priority, project) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.uuid = self.crypto.randomUUID();
        this.status = 'incomplete';

        // Add todoItem to approprate project in todoList
        for (let projectObj of todoList) {
            if ((this.project in projectObj)) {
                projectObj[this.project].push(this);
                return;
            }
        }
    }

    deleteTodoItem() {
        const index = todoList[this.project].indexOf(this);
        todoList[this.project].splice(index, 1);
    }

    moveTodoItem (project) {
        this.deleteTodoItem();

        this.project = project;
        todoList[project].push(this);
    }

    editTodoItem(property, newValue) {
        if (property === 'project') {
            this.moveTodoItem(newValue);
        }
        
        this[property] = newValue;
    }

    getTodoItem() {
        return this;
    }

};

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