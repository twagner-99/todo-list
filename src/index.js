import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle, displayModalNew, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn } from "./user-interface.js";
import "./styles.css"

// window.createProject = createProject;
// window.createTodoItem = createTodoItem;
// window.getTodoItemInfo = getTodoItemInfo;
// window.editTodoItem = editTodoItem;
// window.editProjectName = editProjectName;
// window.moveTodoItem = moveTodoItem;
// window.deleteTodoItem = deleteTodoItem;
// window.deleteProject = deleteProject;

// window.displayProjectsAll = displayProjectsAll;
// window.displayProjectSingle = displayProjectSingle;
// window.displayModalNew = displayModalNew;
// window.deleteProjectDropdownOptions = deleteProjectDropdownOptions;
// window.addProjectBtn = addProjectBtn;
// window.deleteProjectBtn = deleteProjectBtn;

const newTodoItemBtn = document.querySelector('#new-todo-item-btn');
const newProjectBtn = document.querySelector('#new-project-btn');
const allItemsBtn = document.querySelector('#all-items-btn');


newTodoItemBtn.addEventListener('click', displayModalNew);
// newProjectBtn.addEventListener('click', );
allItemsBtn.addEventListener('click', displayProjectsAll);