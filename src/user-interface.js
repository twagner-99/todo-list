import { getTodoList } from "./todo-items";

const todoListDiv = document.querySelector('#todo-list');
const projectHeadingMain = document.querySelector('#project-heading');

const displayProjectsAll = () => {
    projectHeadingMain.textContent = 'All Items';
    
    const todoList = getTodoList();     // Do this each time to get current snapshot?
    for (let project in todoList) {
        const projectDiv = renderProjectsAll(project);
        todoListDiv.appendChild(projectDiv);
    }
}

const displayProjectSingle = (project) => {
    projectHeadingMain.textContent = project;
    const projectDiv = renderProjectSingle(project);
    todoListDiv.appendChild(projectDiv);
}

const renderProjectsAll = (project) => {
    const projectDiv = renderProjectSingle(project);

    if (!(project === 'default')) {
        const projectSubheader = document.createElement('h2');
        projectSubheader.textContent = project;
        projectDiv.prepend(projectSubheader);
    }

    return projectDiv;
}

const renderProjectSingle = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.id = project;

    const todoList = getTodoList();
    for (let todoItem of todoList[project]) {
        const todoItemDiv = renderTodoItem(todoItem);
        projectDiv.appendChild(todoItemDiv);
    }

    return projectDiv;
}

const renderTodoItem = (todoItem) => {
    const todoItemDiv = document.createElement('div');
    const todoItemPara = document.createElement('p');

    todoItemDiv.dataset.uuid = todoItem.uuid;
    todoItemPara.textContent = todoItem.title;

    todoItemDiv.appendChild(todoItemPara);
    return todoItemDiv;
}

export { displayProjectsAll, displayProjectSingle };