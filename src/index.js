import { createProject, createTodoItem, editTodoItem, editProjectName, deleteTodoItem, deleteProject, storageHandler, populateStorage } from "./todo-items.js";
import { displayProjectsAll, displayProjectSingle, displayModalNew, addProjectDropdownOptions, deleteProjectDropdownOptions, addProjectBtn, deleteProjectBtn, uuidHandler, displayModalEdit, currentTodoItemHandler, currentProjectHandler, editProjectDropdownOption, editProjectBtn, reloadProjectBtns, reloadProjectDropdownOptions, taskStatusToggler } from "./user-interface.js";
import "./styles.css"

const sidebarDiv = document.querySelector('#sidebar');
const contentDiv = document.querySelector('#content');
const editProjectNameInput = document.querySelector('#edit-project-name-input');
const newProjectInput = document.querySelector('#new-project-input');

const modals = {
    newProjectModal: document.querySelector('#new-project-modal'),
    deleteTodoItemModal: document.querySelector('#delete-todo-item-modal'),
    updateProjectModal: document.querySelector('#update-project-modal'),
    deleteProjectModal: document.querySelector('#delete-project-modal'),
    editProjectNameModal: document.querySelector('#edit-project-name-modal'),
}

const todoItemFormInputs = {
    title: document.querySelector('#title'),
    dueDate: document.querySelector('#due-date'),
    priority: document.querySelector('#priority'),
    project: document.querySelector('#project-dropdown'),
};

// Add event listeners to buttons within modals.
const allModals = document.querySelectorAll('dialog');
for (let currentModal of allModals) {
    const currentForm = document.querySelector(`#${currentModal.id} > form`);

    currentModal.addEventListener('click', (e) => {
        if (e.target.dataset.purpose === 'closeModal') {
            currentForm.reset();
            currentModal.close();
        }

        else if (e.target.dataset.purpose === 'createTodoItem') {
            if (!(currentForm.reportValidity())) {
                return;
            }

            createTodoItem(todoItemFormInputs.title.value,
                           todoItemFormInputs.dueDate.value,
                           todoItemFormInputs.priority.value,
                           todoItemFormInputs.project.value);

            currentForm.reset();
            displayProjectsAll();
            currentModal.close();
        }

        else if (e.target.dataset.purpose === 'editTodoItem') {
            let originalTodoItem = currentTodoItemHandler.getCurrentTodoItem().todoItem;

            for (let formInput in todoItemFormInputs) {
                if (formInput in originalTodoItem) {
                    if (todoItemFormInputs[formInput].value !== originalTodoItem[formInput])
                    editTodoItem(uuidHandler.getCurrentUuid(), formInput, todoItemFormInputs[formInput].value);
                }            
            }

            currentForm.reset();
            displayProjectsAll();
            currentModal.close();
        }

        else if (e.target.dataset.purpose === 'showDeleteTodoItemModal') {
            currentModal.close();
            modals.deleteTodoItemModal.showModal();
        }

        else if (e.target.dataset.purpose === 'deleteTodoItem') {
            deleteTodoItem(uuidHandler.getCurrentUuid());
            currentModal.close();
            displayProjectsAll();   // Need to find a way to keep on the users last view, whether it was all projects or a single project
        }

        else if (e.target.dataset.purpose === 'showDeleteProjectModal') {
            currentModal.close();
            modals.deleteProjectModal.showModal();
        }

        else if (e.target.dataset.purpose === 'showEditProjectNameModal') {
            currentModal.close();
            modals.editProjectNameModal.showModal();
        }

        else if (e.target.dataset.purpose === 'deleteProject') {
            let project = currentProjectHandler.getCurrentProject();
            deleteProject(project);
            deleteProjectDropdownOptions(project);
            deleteProjectBtn(project);
            currentModal.close();
            displayProjectsAll();
        }

        else if (e.target.dataset.purpose === 'editProjectName') {
            let oldProjectName = currentProjectHandler.getCurrentProject();
            let newProjectName = editProjectNameInput.value

            editProjectName(oldProjectName, newProjectName);
            editProjectDropdownOption(oldProjectName, newProjectName);
            editProjectBtn(oldProjectName, newProjectName);
            currentModal.close();
            displayProjectsAll(); // Need to find a way to keep on the users last view, whether it was all projects or a single project
        }

        else if (e.target.dataset.purpose === 'createProject') {
            if (!(currentForm.reportValidity())) {
                return;
            }

            if (createProject(newProjectInput.value)) { // If project doesn't exist, it'll create it and continue on. If it does exist, it'll alert.
                addProjectBtn(newProjectInput.value);
                addProjectDropdownOptions(newProjectInput.value);
                currentForm.reset();
                currentModal.close();
            }
        }
    })
}

// Add event listners to buttons in sidebar.
sidebarDiv.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'displayProjectsAll') {
        displayProjectsAll();
    }

    else if (e.target.dataset.purpose === 'displayProjectSingle') {
        displayProjectSingle(e.target.id);
    }

    else if (e.target.dataset.purpose === 'showNewProjectModal') {
        modals.newProjectModal.showModal();
    }
})

// Add event listeners to buttons in main content area.
contentDiv.addEventListener('click', (e) => {
    if (e.target.dataset.purpose === 'showEditTodoItemModal') {
        uuidHandler.setCurrentUuid(e);

        currentTodoItemHandler.setCurrentTodoItem(uuidHandler.getCurrentUuid());
        
        let currentTodoItem = currentTodoItemHandler.getCurrentTodoItem().todoItem;
        for (let formInput in todoItemFormInputs) {
            if (formInput in currentTodoItem) {
                todoItemFormInputs[formInput].value = currentTodoItem[formInput];
            }            
        }

        displayModalEdit();
    }

    else if (e.target.dataset.purpose === 'showNewTodoItemModal') {
        displayModalNew();
    }

    else if (e.target.dataset.purpose === 'showDeleteTodoItemModal') {
        uuidHandler.setCurrentUuid(e);
        modals.deleteTodoItemModal.showModal();
    }

    else if (e.target.dataset.purpose === 'showUpdateProjectModal') {
        currentProjectHandler.setCurrentProject(e);
        modals.updateProjectModal.showModal();
    }

    else if (e.target.dataset.purpose === 'statusCheckbox') {
        taskStatusToggler(e);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    storageHandler();
    displayProjectsAll();
    reloadProjectBtns();
    reloadProjectDropdownOptions();
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        populateStorage();
    }
});