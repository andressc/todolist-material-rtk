import {v1} from "uuid"
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, taskReducer, TasksType} from "./task-reducer"
import {TaskPriorities, TaskStatuses} from "../api/tasks-api"

let state: TasksType
const todoList1: string = v1()
const todoList2: string = v1()
const task1: string = v1()
const task2: string = v1()
const title: string = "newTask"

beforeEach(() => {
    state = {
        [todoList1]: [
            {
                id: v1(),
                title: "1HTML&CSS",
                status: TaskStatuses.New,
                description: "description",
                completed: false,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: todoList1,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                description: "description",
                completed: false,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: todoList1,
                order: 0,
                addedDate: "",
            },
            {
                id: task2,
                title: "ReactJS",
                status: TaskStatuses.New,
                description: "description",
                completed: false,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: todoList1,
                order: 0,
                addedDate: "",
            }
        ],
        [todoList2]: [
            {
                id: task1,
                title: "book",
                status: TaskStatuses.New,
                description: "description",
                completed: false,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: todoList2,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                description: "description",
                completed: false,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                todoListId: todoList2,
                order: 0,
                addedDate: "",
            },
        ]
    }
})

test("add Task", () => {
    const result: TasksType = taskReducer(state, addTaskAC(todoList1, title))

    expect(result[todoList1].length).toBe(4)
    expect(result[todoList1][3].title).toBe("newTask")
    expect(result[todoList1][3].status).toBe(TaskStatuses.New)
    expect(result[todoList2].length).toBe(2)
})

test("remove Task", () => {
    const result: TasksType = taskReducer(state, removeTaskAC(todoList2, task1))

    expect(result[todoList2].length).toBe(1)
    expect(result[todoList2][0].title).toBe("milk")
    expect(result[todoList2][1]).toBeUndefined()
    expect(result[todoList1].length).toBe(3)
})

test("change Status", () => {
    const result: TasksType = taskReducer(state, changeStatusTaskAC(todoList1, task2, TaskStatuses.Completed))

    expect(result[todoList1][2].status).toBe(TaskStatuses.Completed)
    expect(result[todoList2][2]).toBeUndefined()
})

test("change Title Task", () => {
    const result: TasksType = taskReducer(state, changeTitleTaskAC(todoList1, task2, title))

    expect(result[todoList1][2].title).toBe(title)
    expect(result[todoList2][2]).toBeUndefined()
})

/*test("test WRONG ACTION", () => {
    expect(() => {
        taskReducer(state, {type: "WRONG ACTION"})
    }).toThrow()
})*/
