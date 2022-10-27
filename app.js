//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-task");//ul of #incomplete-task
var completedTasksHolder=document.getElementById("completed-task");//completed-task


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = "item";
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.className = "item__checkbox";
    //label
    var label=document.createElement("label");//label
    label.className = "item__label";
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.className = "item__text";
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.className = "item__button";

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className = "item__button";
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.className = "item__img";

    label.innerText=taskString;


    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";


    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add("item__button--edit");

    deleteButton.classList.add("item__button--delete");
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".item__button--edit");
    var containsClass=listItem.classList.contains("item--edit-task");
    //If class of the parent is .edit-task
    if(containsClass){

        //switch to .edit-item
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-task on the parent.
    listItem.classList.toggle("item--edit-task");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-task
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);


    bindTaskEvents(listItem, taskIncomplete);
    addClassCompletedTasks();
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-task.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    removeClassNotCompletedTasks();
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.item__button--edit");
    var deleteButton=taskListItem.querySelector("button.item__button--delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

function addClassCompletedTasks() {
    var completedTasksHolderLabel=completedTasksHolder.querySelectorAll('label');
    completedTasksHolderLabel.forEach((item) => item.classList.add('completed-task__label'))
}

function removeClassNotCompletedTasks() {
    var incompleteTaskHolderLabel=incompleteTaskHolder.querySelectorAll('label');
    incompleteTaskHolderLabel.forEach((item) => item.classList.remove('completed-task__label'))
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.