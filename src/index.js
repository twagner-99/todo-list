import { createProject, createTodoItem, getTodoItemInfo, displayTodoList, displayProject, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import "./styles.css"

window.createTodoItem = createTodoItem;
window.displayTodoList = displayTodoList;
window.editTodoItem = editTodoItem;
window.editProjectName = editProjectName;
window.moveTodoItem = moveTodoItem;
window.deleteTodoItem = deleteTodoItem;
window.displayProject = displayProject;
window.createProject = createProject;
window.deleteProject = deleteProject;
window.getTodoItemInfo = getTodoItemInfo;