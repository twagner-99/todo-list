import { getTodoList } from "./todo-items";

const todoListDiv = document.querySelector('#todo-list');
const projectHeadingMain = document.querySelector('#project-heading');

const displayProjectsAll = () => {
    projectHeadingMain.textContent = 'All Items';
    
    const todoList = getTodoList();     // Do this each time to get current snapshot?
    for (let project in todoList) {
        const projectDiv = renderProjectAndSubheader(project);
        todoListDiv.appendChild(projectDiv);
    }
}

const displayProjectSingle = (project) => {
    projectHeadingMain.textContent = project;

    const projectDiv = renderProject(project);
    todoListDiv.appendChild(projectDiv);
}

const renderProject = (project) => {
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

const renderProjectAndSubheader = (project) => {
    const projectHeader = document.createElement('h2');
    const projectDiv = renderProject(project);

    projectHeader.textContent = project;
    projectDiv.prepend(projectHeader);

    return projectDiv;
}

export { displayProjectsAll, displayProjectSingle };