import { TestScheduler } from "jest";
import Task from "../task";
const task = new Task(
    "Hello task1",
    "description jest testing today and PHP and mySQL",
    "Yumi Patton",
    "2020-10-15",
    "15:00",
    "text-warning",
    "text-danger",
    "a23"
);
test("object creation", () => {

    expect(task.title).toBe("Hello task1");
    expect(task.description).toBe("description jest testing today and PHP and mySQL");
    expect(task.assignee).toBe("Yumi Patton");
    expect(task.date).toBe("2020-10-15");
    expect(task.time).toBe("15:00");
    expect(task.priority).toBe("text-warning");
    expect(task.status).toBe("text-danger");
    expect(task.id).toBe("a23");
});
test("object creation", () => {
    const task2 = new Task(
        "Hello task2",
        "description PHP and mySQL",
        "Alastair Patton",
        "2020-10-20",
        "16:00",
        "text-secondary",
        "text-success"
    );
    expect(task2.id).toBe(null);
});

test("html string contains all attributes", ()=> {
    const htmlString = task.toHtmlString();
    expect(htmlString).toContain("Hello task1");
    expect(htmlString).toContain("description jest testing today and PHP and mySQL");
    expect(htmlString).toContain("Yumi Patton");
    expect(htmlString).toContain("2020-10-15");
    expect(htmlString).toContain("15:00");
    expect(htmlString).toContain("text-warning");
    expect(htmlString).toContain("text-danger");
    expect(htmlString).toContain("a23");
});
test("should be able to add Task element to Dom", ()=>{
    const element = task.toHtmlElement();
    document.body.append(element);
    expect(document.body.children.length).toBe(1);
});
