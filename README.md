# todo-list

ASSIGNMENT OUTLINE
- Dynamically create todo objects with factories or classes
- Todo items will have the following properties:
    - title, description, dueDate, priority
    - Extra credit: include notes and checklist
- There should be projects that the user specifies
    - There will be a default project where all todo items go
    - And user can choose if they want to add them to diff project
- Remember: Separate application logic from DOM logic
    - Use separate modules for everything
- UI requirements. You should be able to:
    - View all projects
    - View all todos in each project
        - Probably just the title and duedate… perhaps changing color for different priorities
    - Expand a single todo to see/edit its details
    - Delete a todo

MODULE BRAINSTORM
Todo List
- Create a todo item that opens in it's own todo UI
- Toggle todo completion
- Click on a button to edit the todo which opens it's own todo UI
- Delete a todo, with a confirmation dialog
- Should be able to see when todo is due from this list
- Would be cool to click and drag to diff projects
- Would be cool to delete entire projects and all the todos associated

Individual Todo UI
- Opens after user creates todo item from todo list UI
- Set and edit title, description, dueDate, priority
    - Extra credit: include notes and checklist
- Save the todo to lock it down
- Edit the todo
- Toggle todo completion
- Delete the todo
- Change which folder (project) the todo is assigned to

Main UI
- View all projects
    - Do this as sidebar, like in VSCode or Todoist
- Click on a project and see only what's in that
    - Have a default project
    - Have an "All" project where all todos can be seen
- This will be index.js and it will call initial page-load function as well as import all functionality from other modules
- HTML will have permanent sidebar and content sections
    - The info in them will be dynamically populated by two different modules