import axios from '../utils/axios'
import * as todoListPropTypes from '../types/propTypes/todo-list.type'
import todoType from '%/types/todo.type';

export const addTodoList = async (newTaskData: object) => {
    const res = await axios.post('/todo-list/add-task', newTaskData);
    return res.data.data;
}

export const getAllTodoList = async (filterAndSortData: todoListPropTypes.getAllTodoListProps) => {
    const res = await axios.post('/todo-list/', filterAndSortData);
    return res.data;
}

export const completeTodo = async (taskId: string) => {
    const res = await axios.put('/todo-list/complete/' + taskId);
    return res.data.data;
}

export const recollectTodo = async (taskId: string) => {
    const res = await axios.put('/todo-list/recollect/' + taskId);
    return res.data;
}

export const updateTodo = async (taskId: string, updateData: object) => {
    console.log(taskId, updateData);
    const res = await axios.put('/todo-list/update-task/' + taskId, { updateData });
    return res.data.data;
}

export const deleteTodo = async (taskId: string) => {
    const res = await axios.delete('/todo-list/delete/' + taskId);
    return res.data.data;
}
