import axios from '%/utils/axios'

export const get_all_todo_list = async () => {
    const res = await axios.get('/todo_list/');
    return res.data;
}

export const add_todo_list = async(new_task_data: object) => {
    const res = await axios.post('/todo_list/add_task', new_task_data);
    return res.data.data;
}

export const complete_todo = async(task_id: string) => {
    const res = await axios.delete('/todo_list/complete/' + task_id);
    return res.data.data;
}

export const update_todo = async(taskId:string, updateData: object) => {
    console.log(taskId, updateData);
    const res = await axios.put('/todo_list/update_task/' + taskId, {updateData});
    return res.data.data;
}