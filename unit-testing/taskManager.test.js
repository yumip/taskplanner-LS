import TaskManager from "../taskManager";
import Task from "../task";

let taskManager
beforeEach(() => {
    localStorage.clear();
    taskManager = new TaskManager();
})
test("object creation", () => {
    const task1 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Yumi Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
    );
    taskManager.addTask(task1);
    expect(taskManager.tasks.length).toBe(1);
});
test("find task", () => {
    const task1 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Yumi Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
        "a23"
    );
    taskManager.addTask(task1);
    taskManager.findTaskIndex(task1);
    expect(taskManager.findTaskIndex(task1)).toBe(0);
    const task2 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Yumi Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
        "aaa"
    );
    expect(taskManager.findTaskIndex(task2)).toBe(-1);
});
test("edit task", () => {
    const task1 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Yumi Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
    );
    taskManager.addTask(task1);
    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].title).toBe("Hello task1");
    expect(taskManager.tasks[0].id).not.toBe(null);
    const task1Id = taskManager.tasks[0].id;
    const task2 = new Task(
        "Hello task2",
        "description jest",
        "PPPPatton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
        task1Id
    );
    taskManager.editTask(task2);
    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].title).toBe("Hello task2");
    const task3 = new Task(
        "Hello task2",
        "description jest",
        "PPPPatton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
        "aaa"
    );
    taskManager.editTask(task3);
    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].title).toBe("Hello task2");
});

test("delete task and all the tasks", () => {
    const task1 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Julie Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
    );
    const task2 = new Task(
        "Hello task2",
        "description jest testetasesfadads",
        "Patton Patton",
        "2020-10-16",
        "15:00",
        "text-success",
        "text-danger",
    );
    const task3 = new Task(
        "Hello task3",
        "description jest delete test",
        "Patton Patton",
        "2020-10-16",
        "15:00",
        "text-success",
        "text-success",
    );
    taskManager.addTask(task1);
    taskManager.addTask(task2);
    taskManager.addTask(task3);
    expect(taskManager.tasks.length).toBe(3);
    const testTask = taskManager.tasks[1];
    taskManager.deleteTask(testTask);
    expect(taskManager.tasks.length).toBe(2);
    expect(taskManager.tasks[0].title).toBe("Hello task1");
    expect(taskManager.tasks[1].title).toBe("Hello task3");
    taskManager.deleteTask(task2);
    expect(taskManager.tasks.length).toBe(2);
    expect(taskManager.tasks[0].title).toBe("Hello task1");
    expect(taskManager.tasks[1].title).toBe("Hello task3");
    taskManager.deleteAll();
    expect(taskManager.tasks.length).toBe(0);
});
test("restore From local Storage", () => {
    taskManager.restoreFromLocalStorage();
    expect(taskManager.tasks.length).toBe(0)
    const task1 = new Task(
        "Hello task1",
        "description jest testing today and PHP and mySQL",
        "Julie Patton",
        "2020-10-15",
        "15:00",
        "text-warning",
        "text-danger",
    );
    const task2 = new Task(
        "Hello task2",
        "description jest testetasesfadads",
        "Patton Patton",
        "2020-10-16",
        "15:00",
        "text-success",
        "text-danger",
    );
    const task3 = new Task(
        "Hello task3",
        "description jest delete test",
        "Patton Patton",
        "2020-10-16",
        "15:00",
        "text-success",
        "text-success",
    );
    taskManager.addTask(task1);
    taskManager.addTask(task2);
    taskManager.addTask(task3);
    taskManager.restoreFromLocalStorage();
    expect(taskManager.tasks.length).toBe(3);
    taskManager.deleteAll();
    taskManager.restoreFromLocalStorage();
    expect(taskManager.tasks.length).toBe(0);
});