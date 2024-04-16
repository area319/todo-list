import Todo from '../models/todo.model'
import { ITodo } from '../interfaces/todo.interface'

export const saveTodo = async (todoData: ITodo) => {
    let new_todo = new Todo(todoData);
    try {
        const saveRes = await new_todo.save();
        return saveRes;
    } catch (err) {
        throw err;
    }
}

export const getAllTodo = async () => {
    try {
        let allTodo = await Todo.find();
        return allTodo;
    } catch (err) {
        throw err;
    }
}

export const getWithFilter = async (filterData: filterData) => {
    try {
        let filteredData;
        if (!filterData.startDate || !filterData.endDate) {
            if (filterData.search != "") {
                filteredData = await Todo.find({ author: filterData.userId, title: { "$regex": filterData.search, '$options': 'i' } }).sort([['status', 'desc'], [filterData.sortBy, filterData.sortDirection == 'asc' ? 1 : -1]]);
            }
            else
                filteredData = await Todo.find({ author: filterData.userId }).sort([['status', 'desc'], [filterData.sortBy, filterData.sortDirection == 'asc' ? 1 : -1]]);
        } else {
            if (filterData.search == "")
                filteredData = await Todo.find({ author: filterData.userId, deadline: { $gte: filterData.startDate, $lte: filterData.endDate } }).sort([['status', 'desc'], [filterData.sortBy, filterData.sortDirection == 'asc' ? 1 : -1]]);
            else
                filteredData = await Todo.find({ author: filterData.userId, title: { "$regex": filterData.search, '$options': 'i' }, deadline: { $gte: filterData.startDate, $lte: filterData.endDate } }).sort([['status', 'desc'], [filterData.sortBy, filterData.sortDirection == 'asc' ? 1 : -1]]);
        }
        return filteredData;
    } catch (error) {
        throw error;
    }
}

export const updateTask = async (props: updateProps) => {
    try {
        console.log(props);
        const updatedData = await Todo.findOneAndUpdate({ _id: props.todoId }, props.updateData)
        return updatedData;
    } catch (err) {
        throw err;
    }
}

export const deleteTask = async (todoId: string) => {
    try {
        const deletedData = await Todo.findByIdAndDelete(todoId);
        return deletedData;
    } catch (err) {
        throw err;
    }
}

export const completeTask = async (todoId: string) => {
    try {
        const findRes = await Todo.findById(todoId);
        if (findRes == null) {
            return "No task";
        }
        findRes.status = "complete";
        findRes.completeDate = new Date();
        const completedTask = findRes.save();
        return completedTask;
    } catch (error) {
        throw error;
    }
}

export const recollectTask = async (todoId: string) => {
    try {
        const findRes = await Todo.findById(todoId);
        if (findRes == null) {
            return 'No task.';
        }
        findRes.status = "pending";
        const recollectedTask = findRes.save();
        return recollectedTask;
    } catch (error) {
        throw error;
    }
}

interface updateProps {
    todoId: string,
    updateData: object
}

interface filterData {
    userId: string,
    search: string,
    sortBy: string,
    sortDirection: string,
    startDate: string,
    endDate: string
}
