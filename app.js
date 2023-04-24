const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");
    listItem.className = "list__item";

    //input (checkbox)
    const checkBox = document.createElement("input");
    //label
    const label = document.createElement("label");
    //input (text)
    const editInput = document.createElement("input");
    //button.edit
    const editButton = document.createElement("button");

    //button.delete
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "list__title list__label";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.classList = "list__checkbox";
    editInput.type = "text";
    editInput.className = "list__title list__input";

    editButton.innerText = "Edit";
    editButton.className = "button button-edit";

    deleteButton.className = "button button-delete";
    deleteButtonImg.className = "button-delete__image";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem = this.parentNode;

    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".button-edit");
    const containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");

    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function () {
    console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.button-edit");
    const deleteButton = taskListItem.querySelector("button.button-delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (const i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}