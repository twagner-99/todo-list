import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle } from "./user-interface.js";
import "./styles.css"

window.createProject = createProject;
window.createTodoItem = createTodoItem;
window.getTodoItemInfo = getTodoItemInfo;
window.editTodoItem = editTodoItem;
window.editProjectName = editProjectName;
window.moveTodoItem = moveTodoItem;
window.deleteTodoItem = deleteTodoItem;
window.deleteProject = deleteProject;

window.displayProjectsAll = displayProjectsAll;
window.displayProjectSingle = displayProjectSingle;