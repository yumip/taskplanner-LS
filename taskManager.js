import Task from "./task.js";
export default class TaskManager {
    constructor() {
        this.tasks = [];
        //this.id = 0;
    }
    addTask(task) {
        //this.id += 1;
        task.id = Math.random().toString(36).substr(2, 9);
        this.tasks.push(task);
        this.mirrorToLocalStorage()
        return task;
    }
    findTaskIndex(task) {
        return this.tasks.findIndex(taskInDB => (taskInDB.id === task.id));
    };
    editTask(task) {
        let taskIndex = this.findTaskIndex(task)
        if (taskIndex === -1) {
            return console.log("error");
        }
        this.tasks.splice(taskIndex, 1, task);
        this.mirrorToLocalStorage();
    }
    deleteTask(task) {
        let taskIndex = this.findTaskIndex(task);
        if(taskIndex === -1){
            return console.log("error");
        }
        this.tasks.splice(taskIndex, 1);
        this.mirrorToLocalStorage()
    }
    deleteAll() {
        this.tasks=[];
        this.mirrorToLocalStorage();
    }
    mirrorToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    restoreFromLocalStorage() {
        this.tasks = [];
        const lsTasks = JSON.parse(localStorage.getItem('tasks'));
        if (lsTasks) {
            lsTasks.forEach(item => {
                const task = new Task(item.title, item.description, item.assignee, item.date, item.time, item.priority, item.status, item.id);
                this.tasks.push(task);
            });
        }
        return this.tasks
    }
}
