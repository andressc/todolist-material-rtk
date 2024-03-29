import { v1 } from 'uuid'
import { addTask, fetchTasks, removeTask, tasksReducer, TasksType, updateTask } from './taskSlice'
import { TaskPriorities, TaskStatuses, TaskType } from '../../api/tasks-api'
import { TodolistDomainType } from './todolistSlice'

let state: TasksType
let state2: TodolistDomainType[]
const todoList1: string = v1()
const todoList2: string = v1()
const task1: string = v1()
const task2: string = v1()
const title: string = 'newTask'

beforeEach(() => {
    state = {
        [todoList1]: [
            {
                id: v1(),
                title: '1HTML&CSS',
                status: TaskStatuses.New,
                description: 'description',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoList1,
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                description: 'description',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoList1,
                order: 0,
                addedDate: '',
            },
            {
                id: task2,
                title: 'ReactJS',
                status: TaskStatuses.New,
                description: 'description',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoList1,
                order: 0,
                addedDate: '',
            },
        ],
        [todoList2]: [
            {
                id: task1,
                title: 'book',
                status: TaskStatuses.New,
                description: 'description',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoList2,
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'milk',
                status: TaskStatuses.Completed,
                description: 'description',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoList2,
                order: 0,
                addedDate: '',
            },
        ],
    }

    state2 = [
        {
            id: todoList1,
            title: 'todo 1',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
        {
            id: todoList2,
            title: 'todo 2',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
    ]
})

test('add Task', () => {
    const newTask: TaskType = {
        id: v1(),
        title: title,
        status: TaskStatuses.New,
        description: 'description',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todoList1,
        order: 0,
        addedDate: '',
    }

    const result: TasksType = tasksReducer(
        state,
        addTask.fulfilled({ newTask: newTask }, '', { todoListId: newTask.todoListId, title: newTask.title }),
    )

    expect(result[todoList1].length).toBe(4)
    expect(result[todoList1][3].title).toBe('newTask')
    expect(result[todoList1][3].status).toBe(TaskStatuses.New)
    expect(result[todoList2].length).toBe(2)
})

test('remove Task', () => {
    const result: TasksType = tasksReducer(
        state,
        removeTask.fulfilled({ todoListId: todoList2, taskId: task1 }, '', { todoListId: todoList2, taskId: task1 }),
    )

    expect(result[todoList2].length).toBe(1)
    expect(result[todoList2][0].title).toBe('milk')
    expect(result[todoList2][1]).toBeUndefined()
    expect(result[todoList1].length).toBe(3)
})

test('change Status', () => {
    const result: TasksType = tasksReducer(
        state,
        updateTask.fulfilled(
            {
                todoListId: todoList1,
                taskId: task2,
                model: { status: TaskStatuses.Completed },
            },
            '',
            {
                todoListId: todoList1,
                taskId: task2,
                model: { status: TaskStatuses.Completed },
            },
        ),
    )

    expect(result[todoList1][2].status).toBe(TaskStatuses.Completed)
    expect(result[todoList2][2]).toBeUndefined()
})

test('change Title Task', () => {
    const result: TasksType = tasksReducer(
        state,
        updateTask.fulfilled({ todoListId: todoList1, taskId: task2, model: { title } }, '', {
            todoListId: todoList1,
            taskId: task2,
            model: { title },
        }),
    )

    expect(result[todoList1][2].title).toBe(title)
    expect(result[todoList2][2]).toBeUndefined()
})

test('tasks should be added for todolist', () => {
    const action = fetchTasks.fulfilled(
        {
            tasks: state[todoList1],
            todoListId: todoList1,
        },
        '123',
        todoList1,
    )

    const result: TasksType = tasksReducer({ [todoList2]: [], [todoList1]: [] }, action)

    expect(result[todoList1].length).toBe(3)
    expect(result[todoList2].length).toBe(0)
})

/*test("test WRONG ACTION", () => {
    expect(() => {
        taskReducer(state, {type: "WRONG ACTION"})
    }).toThrow()
})*/
