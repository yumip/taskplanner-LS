import TaskManager from "./taskManager.js";
import UIManager from "./UIManager";
const taskManager = new TaskManager();
//taskDetails
const taskForm = document.forms.taskForm;
const taskTitle = taskForm.taskTitle;
const taskDescription = taskForm.taskDescription;
const taskAssignedTo = taskForm.taskAssignedTo;
const taskDueDate = taskForm.taskDueDate;
const taskSummary = [taskTitle, taskDescription, taskAssignedTo, taskDueDate]

//Priority && Status
const selectPriority = [...taskForm.querySelectorAll("input[name=priority]")];
const selectStatus = [...taskForm.querySelectorAll("input[name=status]")];
//TaskContainer
const taskContainer = document.querySelector("#tasks");

//main page entry
const newTaskInputForm = document.querySelector("#newTask");

const getEveryStat = [...document.querySelector(".nav").querySelectorAll(".nav-item")];
const statusValues = selectStatus.map(status=>status.value);

const uiManager = new UIManager(
  taskForm,
  taskSummary,
  newTaskInputForm,
  taskContainer,
  taskManager,
  getEveryStat,
  statusValues,
  selectPriority,
  selectStatus
);
uiManager.start();
// class UIManager{
//   constructor(taskForm, taskSummary, newTaskInputForm, taskContainer, taskManager, getEveryStat, statusValues, selectPriority, selectStatus) {
//     this.taskForm = taskForm,
//     this.taskSummary = taskSummary,
//     this.newTaskInputForm = newTaskInputForm,
//     this.taskContainer = taskContainer,
//     this.taskManager = taskManager,
//     this.getEveryStat = getEveryStat,
//     this.statusValues = statusValues,
//     this.selectPriority = selectPriority,
//     this.selectStatus = selectStatus
//   }
//   display() {
//     this.clearAll();
//     this.taskManager.restoreFromLocalStorage();
//     this.taskManager.tasks.forEach(task => this.addTaskToPage(task));
//   }
//   addEditDisplay(){
//     this.display();
//     this.clearValues();
//     this.clearValidations();
//     this.statusStats();
//   }
//   clearAll() {
//     this.taskContainer.innerHTML = "";
//   }
//   //TaskForm
//   clearValues() {
//     return this.taskForm.reset();
//   }
//   clearValidations() {
//    return this.taskSummary.map(formItem => {
//      return formItem.classList.remove("is-invalid", "is-valid");
//     });
//   }
//   openNewTaskClickHandler(event) {
//     const newToDo = this.newTaskInputForm.querySelector("#newToDo");
//     this.clearValues();
//     this.clearValidations();
//     this.taskForm.taskTitle.value = newToDo.value;
//     if (this.taskForm.taskTitle.checkValidity()) {
//       this.taskForm.taskTitle.classList.add("is-valid");
//     } else {
//       this.taskForm.taskTitle.classList.add("is-invalid");
//     }
//     newToDo.value = null;
//   }

//   getAllTask(event) {
//     this.clearAll();
//     this.taskManager.tasks.forEach(task => this.addTaskToPage(task));
//     event.target.querySelector("span").innerHTML = `${this.taskManager.tasks.length}`;
//   }
//   getTasksWithStatus(status) {
//     this.clearAll();
//     this.taskManager.tasks.forEach(function (task) {
//       if (status === task.status) {
//         this.addTaskToPage(task)
//       };
//     });
//   }

//   statusStats() {
//     this.getEveryStat[0].querySelector("span").innerHTML = `${taskManager.tasks.length}`;
//     //const getStats = getEveryStat.slice(1);
//     this.getEveryStat.slice(1).map((status, index) => {
//       console.log(statusValues[index]);
//       status.querySelector("span").innerHTML = `${this.taskManager.tasks.filter(task => task.status === this.statusValues[index]).length}`;
//     });
//   }
//   // const getTotal = getEveryStat[0];
//   // const getStats = getEveryStat.slice(1);

//   // const totalNumber = getEveryStat[0].querySelector("span");
//   saveButtonClicked(event) {
//     //event.preventDefault();
//     this.taskForm.querySelector("#task-modal-save").innerHTML = "Save";
//     console.log("check ID in saveButtonClicked" + taskForm.getAttribute('data-id'));

//     const task = new Task(
//       this.taskForm.taskTitle.value,
//       this.taskForm.taskDescription.value,
//       this.taskForm.taskAssignedTo.value,
//       this.taskForm.taskDueDate.value,
//       this.taskForm.taskDueTime.value,
//       this.prioritySelected(),
//       this.statusSelected()
//       );
//     if (!this.taskForm.getAttribute('data-id')) {
//       console.log("task test", task);
//       this.taskManager.addTask(task);
//     } else {
//       task.id = this.taskForm.getAttribute('data-id');
//       console.log("debugging review ", task);
//       this.taskManager.editTask(task);
//     }
//     this.taskManager.editTask(task);
//     this.addEditDisplay();
//     console.log("debugging review ", task);
//     this.taskForm.removeAttribute('data-id');
//     console.log("task test before hide", task);
//     $("#newTaskInput").modal("hide");
//   }
//   clearTaskForm() {
//     this.clearValues();
//     this.clearValidations();
//     this.taskForm.removeAttribute('data-id');
//   }
//   //find priority
//   prioritySelected() {
//     return this.selectPriority.find(priority => priority.checked).value;
//   }
//   //Status
//   statusSelected() {
//     return this.selectStatus.find(status => status.checked).value;
//   }
//   addTaskToPage(task) {
//     console.log("task", task);
//     const taskElement = task.toHtmlElement();

//     const editTaskOnPage = taskElement.querySelector("[data-edit-button]");
//     editTaskOnPage.addEventListener("click", ()=>this.displayCurrentInput(task));

//     const deleteTaskOnPage = taskElement.querySelector('.bin > button');
//     deleteTaskOnPage.addEventListener("click", () => this.deleteOne(task));

//     const checkbox = taskElement.querySelector('.bin > input[type="checkbox"]');
//     const clearChecked = document.querySelector("#clearChecked");
//     clearChecked.addEventListener('click', () => checkboxClicked(task,checkbox));
//     taskContainer.append(taskElement);
//     $(function () {
//       $('[data-toggle="tooltip"]').tooltip()
//     });
//   }
//   displayCurrentInput(task) {
//     this.taskForm.querySelector("#task-modal-save").innerHTML = "Edit";
//     this.clearValues();
//     this.clearValidations();
//     this.taskForm.setAttribute("data-id", task.id);
//     this.taskForm.taskTitle.value = task.title;
//     this.taskForm.taskDescription.value = task.description;
//     this.taskForm.taskAssignedTo.value = task.assignee;
//     this.taskForm.taskDueDate.value = task.date;
//     this.taskForm.taskDueTime.value = task.time;
//     this.selectPriority.find(priority => priority.value === task.priority).checked = true;
//     this.selectStatus.find(status => status.value === task.status).checked = true;
//   }
//   deleteOne(task) {
//     this.taskManager.deleteTask(task);
//     this.display();
//     this.statusStats();
//     this.deleteTaskOnPage.closest("div.task").remove();
//   }
//   checkboxClicked(task, checkbox) {
//     if (checkbox.checked) {
//       console.log("checked " + task.id);
//       this.taskManager.deleteTask(task);
//       this.display();
//       this.statusStats();
//       console.log("post checked " + task.id);
//       checkbox.closest("div.task").remove();
//       this.removeEventListener('click', () => checkboxClicked(task,checkbox));
//     }
//   }
//   addEventListeners(){
//     this.newTaskInputForm.querySelector("#openForm").addEventListener("click",() => this.openNewTaskClickHandler());
//     this.taskForm.addEventListener("submit", (event)=>{
//       event.preventDefault();
//       this.saveButtonClicked();
//     });
//     this.getEveryStat[0].addEventListener("click", this.getAllTask);
//     this.getEveryStat.slice(1).map((status, index) => {
//       status.addEventListener("click", function () {
//         this.getTasksWithStatus(this.statusValues[index]);
//       });
//     })
//     this.taskSummary.map(formItem => {
//       formItem.addEventListener("input", function (event) {
//         if (!event.target.checkValidity()) {
//           event.target.classList.remove("is-valid");
//           event.target.classList.add("is-invalid");
//         } else {
//           event.target.classList.remove("is-invalid");
//           event.target.classList.add("is-valid");
//         }
//       })
//     });
//     taskForm.cancelButton.addEventListener("click", this.clearTaskForm);
//     taskForm.close.addEventListener("click", this.clearTaskForm);
//  }
// }

// function addTaskToPage(task) {
//   console.log("task", task);
//   const taskElement = task.toHtmlElement();
//   const editTaskOnPage = taskElement.querySelector("[data-edit-button]");
//   editTaskOnPage.addEventListener("click", ()=> displayCurrentInput(task));

//   const deleteTaskOnPage = taskElement.querySelector('.bin > button');
//   deleteTaskOnPage.addEventListener("click", ()=>deleteOne(task));

//   const checkbox = taskElement.querySelector('.bin > input[type="checkbox"]');
//   const clearChecked = document.querySelector("#clearChecked");
//   clearChecked.addEventListener('click', () => checkboxClicked(task,checkbox));

//   // function checkboxClicked(event) {
//   //   if (checkbox.checked) {
//   //     console.log("checked " + task.id);
//   //     taskManager.deleteTask(task);
//   //     uiManager.display();
//   //     statusStats();
//   //     console.log("post checked " + task.id);
//   //     checkbox.closest("div.task").remove();
//   //     clearChecked.removeEventListener('click', checkboxClicked);
//   //   }
//   // }
//   taskContainer.append(taskElement);
//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
//   });
// }
// function checkboxClicked(task,checkbox) {
//   if (checkbox.checked) {
//     console.log("checked " + task.id);
//     taskManager.deleteTask(task);
//     uiManager.display();
//     statusStats();
//     console.log("post checked " + task.id);
//     checkbox.closest("div.task").remove();
//     this.removeEventListener('click', () => checkboxClicked(task));
//   }
// }
// function displayCurrentInput(task) {
//   taskForm.querySelector("#task-modal-save").innerHTML = "Edit";
//   clearValues();
//   clearValidations();
//   taskForm.setAttribute("data-id", task.id);
//   taskTitle.value = task.title;
//   taskDescription.value = task.description;
//   taskAssignedTo.value = task.assignee;
//   taskDueDate.value = task.date;
//   taskDueTime.value = task.time;
//   selectPriority.find(priority => priority.value === task.priority).checked = true;
//   selectStatus.find(status => status.value === task.status).checked = true;
// }
// function deleteOne(task) {
//   taskManager.deleteTask(task);
//   uiManager.display();
//   statusStats();
//   deleteTaskOnPage.closest("div.task").remove();
// }

// openNewTask.addEventListener("click", openNewTaskClickHandler);
// function openNewTaskClickHandler(event) {
//   clearValues();
//   clearValidations();
//   taskTitle.value = newToDo.value;
//   if (taskTitle.checkValidity()) {
//     taskTitle.classList.add("is-valid");
//   } else {
//     taskTitle.classList.add("is-invalid");
//   }
//   newToDo.value = null;
// }

// function clearValues(){
//   taskForm.reset();
// }

// taskForm.addEventListener("submit",saveButtonClicked);

// function saveButtonClicked(event){
//   event.preventDefault();
//   taskForm.querySelector("#task-modal-save").innerHTML = "Save";
//   const task = new Task(
//     taskForm.taskTitle.value,
//     taskForm.taskDescription.value,
//     taskForm.taskAssignedTo.value,
//     taskForm.taskDueDate.value,
//     taskForm.taskDueTime.value,
//     prioritySelected(),
//     statusSelected()
//   );

//   if (!taskForm.getAttribute('data-id')) {
//   console.log("task test", task);
//   taskManager.addTask(task);
//   } else {
//   task.id = taskForm.getAttribute('data-id');
//   console.log("debugging review ", task);
//   taskManager.editTask(task);
//   }

//   addEditDisplay();
//   taskForm.removeAttribute('data-id');
//   $("#newTaskInput").modal("hide");
// }

// formCancel.addEventListener("click", removeTaskFormId);
// formClose.addEventListener("click", removeTaskFormId);

// function removeTaskFormId() {
//   taskForm.removeAttribute('data-id');
// }

// function clearValidations() {
//   taskSummary.map(formItem =>{
//     formItem.classList.remove("is-invalid", "is-valid");
//   });
//  }

// //find priority
// function prioritySelected() {
//   return selectPriority.find(priority => priority.checked).value;
// }
// //Status
// function statusSelected() {
//   return selectStatus.find(status => status.checked).value;
// }

// taskSummary.map(formItem => {
//     formItem.addEventListener("input", function (event) {
//     if (!event.target.checkValidity()){
//       event.target.classList.remove("is-valid");
//       event.target.classList.add("is-invalid");
//       }
//     else {
//       event.target.classList.remove("is-invalid");
//       event.target.classList.add("is-valid");
//     }
//   })
// });

// taskDueDate.addEventListener("input", function (event) {
//   const today = todayConvertor();
//   const dueDate = new Date(event.target.value);
//   if (today >= dueDate) {
//     return alert("The date should not be older than today");
//   };
// })

// function todayConvertor() {
//   const today = new Date();
//   console.log(today.setHours(0, 0, 0, 0));
//   return today.setHours(0, 0, 0, 0);
// }

// function addEditDisplay(){
//   uiManager.display();
//   clearValues();
//   clearValidations();
//   statusStats();
// }

// getTotal.addEventListener("click", getAllTask);

// function getAllTask(event){
//   uiManager.clearAll();
//   taskManager.tasks.forEach(task => addTaskToPage(task));
//   event.target.querySelector("span").innerHTML = `${taskManager.tasks.length}`;
// }
// getStats.map((status, index)=>{
//   status.addEventListener("click", function () {
//     getTasksWithStatus(statusValues[index]);
//   });
// })

// function getTasksWithStatus(status){
//   uiManager.clearAll();
//   taskManager.tasks.forEach(function (task){
//     if (status === task.status){addTaskToPage(task)};
//   });
// }

// function statusStats(){
//   getTotal.querySelector("span").innerHTML = `${taskManager.tasks.length}`;
//   getStats.map((status, index) => {
//     status.querySelector("span").innerHTML = `${taskManager.tasks.filter(task => task.status === statusValues[index]).length}`;
//   });
// }


// function display(){
//   clearAll();
//   taskManager.restoreFromLocalStorage();
//   taskManager.tasks.forEach(task => addTaskToPage(task));
// }

// function clearAll(){
//   taskContainer.innerHTML = "";
// }

// function addTaskToPage(task){
//   console.log("task",task);
//  const taskElement = task.toHtmlElement();
//  const editTaskOnPage = taskElement.querySelector("#editTaskButton");
//   editTaskOnPage.addEventListener("click", function(){
//      taskForm.querySelector("#task-modal-save").innerHTML = "Edit";
//     clearValues();
//     clearValidations();
//     taskForm.setAttribute("data-id", task.id);
//     taskTitle.value=task.title;
//     taskDescription.value = task.description;
//     taskAssignedTo.value = task.assignee;
//     taskDueDate.value = task.date;
//     taskDueTime.value =task.time;
//     selectPriority.find(priority => priority.value === task.priority).checked = true;
//     selectStatus.find(status => status.value === task.status).checked = true;
//   });

//   const deleteTaskOnPage = taskElement.querySelector('#binForOne');
//   deleteTaskOnPage.addEventListener("click", function(){
//     taskManager.deleteTask(task);
//     display();
//     statusStats();
//     deleteTaskOnPage.closest("div.task").remove();
//   });

//   const checkbox = taskElement.querySelector('.bin > input[type="checkbox"]');
//   const clearChecked = document.querySelector("#clearChecked");
//   clearChecked.addEventListener('click', checkboxClicked);
//   function checkboxClicked(event) {
//     if (checkbox.checked) {
//       console.log("checked " + task.id);
//       taskManager.deleteTask(task);
//       display();
//       statusStats();
//       console.log("post checked " + task.id);
//       checkbox.closest("div.task").remove();
//       clearChecked.removeEventListener('click', checkboxClicked);
//     }
//   }
//   taskContainer.append(taskElement);
//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
//   });
// }



// const task1 = new Task("Team work Project",
//   `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//   "Yumi Patton",
//   "2020-07-31",
//   "02:05",
//   "bg-danger",
//   "text-info");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-danger",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-danger");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-info",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-warning");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-danger",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-danger");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-info",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-warning");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-danger",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-danger");
// addTask("Team work Project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-07-31",
// "02:05",
// "bg-info",
// "text-info");
// addTask("Javescript project",
// `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
// specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
// passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
// "Yumi Patton",
// "2020-08-31",
// "10:05",
// "bg-warning",
// "text-warning");
