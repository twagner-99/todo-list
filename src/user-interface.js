import { getTodoList } from "./todo-items";

const todoListDiv = document.querySelector('#todo-list');

const displayTodoListAll = () => {
    const todoList = getTodoList();     // Do this each time to get current snapshot?

    for (let project in todoList) {
        displayProject(project);
    }
}

const displayProject = (project) => {   // If project is default, don't create a header?
    const projectDiv = renderTodoList(project);
    
    // const projectDiv = renderProjectContainer(project);
    // const todoList = getTodoList();

    // for (let todoItem of todoList[project]) {
    //     const todoItemDiv = renderTodoItem(todoItem);
    //     projectDiv.appendChild(todoItemDiv);
    // }

    todoListDiv.appendChild(projectDiv);
}

const renderTodoList = (project) => {   // Is it better to have this function? Or just have it all live under displayProject?
    const projectDiv = renderProjectContainer(project);
    const todoList = getTodoList();

    for (let todoItem of todoList[project]) {
        const todoItemDiv = renderTodoItem(todoItem);
        projectDiv.appendChild(todoItemDiv);
    }

    return projectDiv;
}

const renderProjectContainer = (project) => {
    const projectDiv = document.createElement('div');
    const projectHeader = document.createElement('h1');
    
    projectDiv.id = project;
    projectHeader.textContent = project;

    projectDiv.appendChild(projectHeader);
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

// get todoList, cycle thru all items and display
// Under all items, we need to show My Stuff, and any other projects
// Under individual projects, only show that stuff

export { displayTodoListAll, };