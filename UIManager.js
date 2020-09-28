import Task from "./task.js";

export default class UIManager {
  constructor(taskForm, taskSummary, newTaskInputForm, taskContainer, taskManager, getEveryStat, statusValues, selectPriority, selectStatus) {
    this.taskForm = taskForm,
      this.taskSummary = taskSummary,
      this.newTaskInputForm = newTaskInputForm,
      this.taskContainer = taskContainer,
      this.taskManager = taskManager,
      this.getEveryStat = getEveryStat,
      this.statusValues = statusValues,
      this.selectPriority = selectPriority,
      this.selectStatus = selectStatus
  }
  clearAll() {
    this.taskContainer.innerHTML = "";
  }
  display() {
    this.clearAll();
    this.taskManager.restoreFromLocalStorage();
    this.taskManager.tasks.forEach(task => this.addTaskToPage(task));
    this.statusStats()
  }
  addEditDisplay() {
    this.display();
    this.clearValues();
    this.clearValidations();
  }

  clearValues() {
    return this.taskForm.reset();
  }
  clearValidations() {
    return this.taskSummary.map(formItem => {
      return formItem.classList.remove("is-invalid", "is-valid");
    });
  }
  openNewTaskClickHandler() {
    const newToDo = this.newTaskInputForm.querySelector("#newToDo");
    this.clearValues();
    this.clearValidations();
    this.taskForm.taskTitle.value = newToDo.value;
    if (this.taskForm.taskTitle.value.length > 7) {
      this.taskForm.taskTitle.classList.add("is-valid");
    } else {
      this.taskForm.taskTitle.classList.add("is-invalid");
    }
    newToDo.value = null;
  }

  getAllTask() {
    this.clearAll();
    this.taskManager.tasks.forEach(task => this.addTaskToPage(task));
    this.getEveryStat[0].querySelector("span").innerHTML = `${this.taskManager.tasks.length}`;
  }
  getTasksWithStatus(status) {
    this.clearAll();
    this.taskManager.tasks.forEach((task) => {
      if (status === task.status) {
        this.addTaskToPage(task);
      };
    });
  }

  statusStats() {
    this.getEveryStat[0].querySelector("span").innerHTML = `${this.taskManager.tasks.length}`;
    this.getEveryStat.slice(1).map((status, index) => {
      status.querySelector("span").innerHTML = `${this.taskManager.tasks.filter(task => task.status === this.statusValues[index]).length}`;
    });
  }

  saveButtonClicked() {
    this.taskForm.querySelector("#task-modal-save").innerHTML = "Save";

    const task = new Task(
      this.taskForm.taskTitle.value,
      this.taskForm.taskDescription.value,
      this.taskForm.taskAssignedTo.value,
      this.taskForm.taskDueDate.value,
      this.taskForm.taskDueTime.value,
      this.prioritySelected(),
      this.statusSelected()
    );
    if (!this.taskForm.getAttribute('data-id')) {
      console.log("task test", task);
      this.taskManager.addTask(task);
    } else {
      task.id = this.taskForm.getAttribute('data-id');
      console.log("debugging review ", task);
      this.taskManager.editTask(task);
    }
    this.taskManager.editTask(task);
    this.addEditDisplay();

    this.taskForm.removeAttribute('data-id');

    $("#newTaskInput").modal("hide");
  }
  clearTaskForm() {
    this.clearValues();
    this.clearValidations();
    this.taskForm.removeAttribute('data-id');
  }
  //find priority
  prioritySelected() {
    return this.selectPriority.find(priority => priority.checked).value;
  }
  //Status
  statusSelected() {
    return this.selectStatus.find(status => status.checked).value;
  }
  addTaskToPage(task) {
    console.log("task", task);
    const taskElement = task.toHtmlElement();

    const editTaskOnPage = taskElement.querySelector("[data-edit-button]");
    editTaskOnPage.addEventListener("click", () => this.displayCurrentInput(task));

    const deleteTaskOnPage = taskElement.querySelector('.bin > button');
    deleteTaskOnPage.addEventListener("click", (event) => this.deleteOne(task,event));

    this.taskContainer.append(taskElement);
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }
  displayCurrentInput(task) {
    this.taskForm.querySelector("#task-modal-save").innerHTML = "Edit";
    console.log(task);
    this.clearValues();
    this.clearValidations();
    this.taskForm.setAttribute("data-id", task.id);
    this.taskForm.taskTitle.value = task.title;
    this.taskForm.taskDescription.value = task.description;
    this.taskForm.taskAssignedTo.value = task.assignee;
    this.taskForm.taskDueDate.value = task.date;
    this.taskForm.taskDueTime.value = task.time;
    this.selectPriority.find(priority => priority.value === task.priority).checked = true;
    this.selectStatus.find(status => status.value === task.status).checked = true;
  }
  deleteOne(task, event) {
    this.taskManager.deleteTask(task);
    this.display();
    event.target.closest("div.task").remove();
  }

  addEventListeners() {
    this.newTaskInputForm.querySelector("#openForm").addEventListener("click", () => this.openNewTaskClickHandler());
    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.taskForm.taskTitle.value.length > 7 &&
        this.taskForm.taskDescription.value.length > 14 &&
        this.taskForm.taskAssignedTo.value.length > 7 &&
        this.taskForm.priority.value &&
        this.taskForm.status.value
        ) {
        this.saveButtonClicked();
      }
    });
    this.getEveryStat[0].addEventListener("click", (() => this.getAllTask()));
    this.getEveryStat.slice(1).map((status, index) => {
      status.addEventListener("click", () => { 
        this.getTasksWithStatus(this.statusValues[index])});
    });
    this.taskSummary.map(formItem => {
      formItem.addEventListener("input", function (event) {
        if (!event.target.checkValidity()) {
          event.target.classList.remove("is-valid");
          event.target.classList.add("is-invalid");
        } else {
          event.target.classList.remove("is-invalid");
          event.target.classList.add("is-valid");
        }
      })
    });
    document.querySelector("#clearAll").addEventListener('click', () => {
      this.taskManager.deleteAll();
      this.display();

    });
    taskForm.cancelButton.addEventListener("click", ()=>this.clearTaskForm());
    taskForm.close.addEventListener("click", () => this.clearTaskForm());
  }
  start(){
    this.addEventListeners();
    this.display();
  }
}