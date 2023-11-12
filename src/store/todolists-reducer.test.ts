import {v1} from "uuid"
import {Filter, TodoType} from "../types"
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todolistReducer
} from "./todolist-reducer"

let state: TodoType[]
const todoList1: string = v1()
const todoList2: string = v1()
const title: string = "newTodo"
const filter: Filter = "Active"

beforeEach(() => {
    state = [
        {
            id: todoList1,
            title: "todo 1",
            filter: "All",
        },
        {
            id: todoList2,
            title: "todo 2",
            filter: "All",
        }
    ]
})

test("remove TodoList", () => {
    const result: TodoType[] = todolistReducer(state, removeTodoListAC(todoList1))

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todoList2)
})

test("add TodoList", () => {
    const result: TodoType[] = todolistReducer(state, addTodoListAC(title))

    expect(result.length).toBe(3)
    expect(result[2].title).toBe(title)
    expect(result[2].filter).toBe("All")
})

test("change Title TodoList", () => {
    const result: TodoType[] = todolistReducer(state, changeTitleTodoListAC(todoList2, title))

    expect(result.length).toBe(2)
    expect(result[1].title).toBe(title)
})

test("change Filter TodoList", () => {
    const result: TodoType[] = todolistReducer(state, changeFilterTodoListAC(todoList1, filter))

    expect(result.length).toBe(2)
    expect(result[0].filter).toBe(filter)
})

test("test WRONG ACTION", () => {
    expect(() => {
        todolistReducer(state, {type: "WRONG ACTION"})
    }).toThrow()
})