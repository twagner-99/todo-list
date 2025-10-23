import { createProject, createTodoItem, getTodoItemInfo, editTodoItem, editProjectName, moveTodoItem, deleteTodoItem, deleteProject } from "./todo-items.js";
import "./styles.css"

window.createProject = createProject;
window.createTodoItem = createTodoItem;
window.getTodoItemInfo = getTodoItemInfo;
window.editTodoItem = editTodoItem;
window.editProjectName = editProjectName;
window.displayTodoList = displayTodoList;
window.moveTodoItem = moveTodoItem;
window.deleteTodoItem = deleteTodoItem;
window.displayProject = displayProject;
window.deleteProject = deleteProject;