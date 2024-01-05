import {useDispatch, useSelector} from "react-redux"
import {AppRootState} from "../../store/store"
import {useCallback} from "react"
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC, Filter,
    removeTodoListAC, TodolistDomainType
} from "../../store/todolist-reducer"

export const useTodoList = () => {
    const dispatch = useDispatch()
    const todoData = useSelector<AppRootState, TodolistDomainType[]>(state => state.todoLists )

    const removeTodoList = useCallback((todoListId: string): void => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string): void => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const changeTitleTodoList = useCallback((title: string, todoListId: string): void => {
        dispatch(changeTitleTodoListAC(todoListId, title))
    }, [dispatch])

    const changeFilterTodoList = useCallback((filter: Filter, todoListId: string): void => {
        dispatch(changeFilterTodoListAC(todoListId, filter))
    }, [dispatch])

    return {
        todoData,
        removeTodoList,
        addTodoList,
        changeTitleTodoList,
        changeFilterTodoList
    }
}