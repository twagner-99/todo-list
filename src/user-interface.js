import { getTodoList } from "./todo-items";

const displayTodoList = () => {
    const todoList = getTodoList();


    console.log(todoList);
    // Inital render and will run on "All Items" btn click.
    // For each key in todoList, displayProject (use for key in loop)
}

const displayProject = (project) => {
    const todoList = getTodoList();
    
    console.log(todoList[project]);
    // On project btn click, project will get passed in so correct project is displayed.
    // For each todoItem in a project, create divs and then rednerTodoItems fn

}

const renderTodoItems = () => {
    // Use this fn to add any divs created from displayTodoList/displayProject to the UI
}
// get todoList, cycle thru all items and display
// Under all items, we need to show My Stuff, and any other projects
// Under individual projects, only show that stuff
// Rename "My Stuff" to "default"