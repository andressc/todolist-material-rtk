import React, { FC, useEffect, ReactElement } from 'react'
import { fetchTodoLists } from './todolistSlice'
import { useTodoList } from './hooks/useTodoList'
import Grid from '@mui/material/Grid'
import { TodoList } from './TodoList/TodoList'
import { InputSubmit } from '../../components/InputSubmit/InputSubmit'
import { useAppDispatch } from '../../hooks/useAppDispatchSelector'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelectors } from '../Login/authSlice'

type PropsType = {
    demo?: boolean
}
export const TodoListsList: FC<PropsType> = ({ demo = false }) => {
    const dispatch = useAppDispatch()
    const isAuth = useSelector(authSelectors.selectIsAuth)

    useEffect(() => {
        if (!demo && isAuth) dispatch(fetchTodoLists())
    }, [demo, isAuth, dispatch])

    const { todoData, removeTodoList, addTodoList, changeTitleTodoList, changeFilterTodoList } = useTodoList()

    if (!isAuth) {
        return <Navigate to="/login" />
    }

    const todoList: ReactElement[] = todoData.map((todo) => {
        return (
            <Grid item key={todo.id}>
                <TodoList
                    todoList={todo}
                    changeFilter={changeFilterTodoList}
                    removeTodoList={removeTodoList}
                    changeTitleTodoList={changeTitleTodoList}
                    demo={demo}
                />
            </Grid>
        )
    })

    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <InputSubmit onClickCallBack={addTodoList} />
            </Grid>
            <Grid container spacing={3}>
                {todoList}
            </Grid>
        </>
    )
}
