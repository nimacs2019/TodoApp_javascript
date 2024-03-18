// obtain the necessary elements
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let description = document.getElementById("description");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// to avoid default behavior of the browser when click on the add button and its type is submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// for validation
let formValidation = () => {
    if (textInput.value === "") {
        msg.innerText = "Task can not be blank";
    } else {
        msg.innerText = "";
        acceptData();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();
        })();
    }
};

// to create a array and push data in to the array
let data = [];
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        dese: description.value,
    });
    console.log(data);
    
    // to set the content to localStorage
    localStorage.setItem("data", JSON.stringify(data));
    createTaskList();
};

// to create task 
let createTaskList = () => {
    tasks.innerHTML = "";
    data.forEach((item, index) => {
        return (tasks.innerHTML += `<div id="${index}" >
        <span class="fw-bold">${item.text}</span>
        <span class="small text-secondary">${item.date}</span>
        <p>${item.dese}</p>
        <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onClick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
        </span>
    </div>`);
    });
    resetForm();
};

// to reset the form
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    description.value = "";
};

// to delete the task
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

// to edit the task
let editTask = (item) => {
    let selectedTask = item.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;
    deleteTask(item);
};

// to get localStorage content and create task list
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTaskList();
})();
