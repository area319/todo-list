'use client'

import { useEffect, useState } from 'react';
import { Typography, Button, Modal, DatePicker, Input, Flex} from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons';
import MyDialog from '%/components/common/dialog/dialog';
import * as todoListApi from '%/api/todoList';
import todo_type from '%/types/todo.type';

export default function () {
    const [testTitle, setTestTitle] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [allTodoData, setAllTodoData] = useState<todo_type[]>([]);
    const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const [title, setTitle] = useState<string>('');
    const [deadline, setDeatdline] = useState<Date>(new Date());
    const [description, setNewTodoDescription] = useState<string>('');
    const [selectedTodoIndex, setSelectedTodoIndex] = useState<number>(-1);
    const [addTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);
    useEffect(() => {
        handle_get_all_todo_data();
    }, []);

    const handleUpdateTask = async () => {
        await todoListApi.update_todo(allTodoData[selectedTodoIndex]._id, { title, description: description, deadline: deadline });
        await handle_get_all_todo_data();
        setUpdateTaskModalOpen(false);  
    }

    const handle_get_all_todo_data = async () => {
        const allTodoData = await todoListApi.get_all_todo_list();
        if (allTodoData.flag != -1)
            setAllTodoData(allTodoData.data);
    }
    const handle_click_todo = (index: any) => {
        setSelectedTodoIndex(index);
    }
    const handle_complete_todo = async () => {
        await todoListApi.complete_todo(allTodoData[selectedTodoIndex]._id);
        await handle_get_all_todo_data();
        if (allTodoData.length == 1)
            setSelectedTodoIndex(-1);
        else if (selectedTodoIndex == allTodoData.length - 1)
            setSelectedTodoIndex(selectedTodoIndex - 1);
        else
            setSelectedTodoIndex(selectedTodoIndex);
    }
    const handle_add_task = async () => {
        await todoListApi.add_todo_list({ title: title, description: description, deadline: deadline });
        await setAddTaskModalOpen(false);
        await handle_get_all_todo_data();
        setTitle('');
        setNewTodoDescription('');
        setDeatdline(new Date());
    }
    const handle_change_title = (e: any) => {
        setTitle(e.target.value);
    }
    const handle_change_description = (e: any) => {
        setNewTodoDescription(e.target.value);
    }
    const handle_change_deadline = (val: any) => {
        setDeatdline(val);
    }
    const handle_begin_update = async () => {
        await setTitle(allTodoData[selectedTodoIndex].title);
        await setNewTodoDescription(allTodoData[selectedTodoIndex].description);
        await setDeatdline(allTodoData[selectedTodoIndex].deadline);
        setUpdateTaskModalOpen(true);
    }

    return <>
        <ul className='navbar'>
            <li onClick={() => setAddTaskModalOpen(true)} key='Add task' className='add'>
                <a>
                    Add Task&nbsp;&nbsp;<PlusCircleTwoTone />
                </a>
            </li>
            {
                allTodoData?.map((val, index) => (
                    <li onClick={() => { handle_click_todo(index) }} key={val._id}>
                        <a>{val.title}</a>
                    </li>
                ))
            }
        </ul>
        {
            selectedTodoIndex != -1 ?
                <div className='todo_panel'>
                    <Typography className='m-10'>Title: {allTodoData[selectedTodoIndex].title}</Typography>
                    <Typography className='m-10'>Description: {allTodoData[selectedTodoIndex].description}</Typography>
                    <Typography className='m-10'>Time: {allTodoData[selectedTodoIndex].deadline.toString().split('T')[0]}</Typography>
                    <Button onClick={handle_complete_todo} className='mx-10'>Complete</Button>
                    <Button onClick={handle_begin_update}>Update</Button>
                </div> : null
        }
        <Modal
            title='Add new task'
            open={addTaskModalOpen}
            onCancel={() => setAddTaskModalOpen(false)}
            footer={[
                <Button onClick={handle_add_task}>
                    Ok
                </Button>,
                <Button onClick={() => setAddTaskModalOpen(false)}>
                    Cancel
                </Button>
            ]}
            width={400}
        >
            <Flex vertical gap={20} className='my-5'>
                <Input value={title} onChange={handle_change_title} placeholder='Title'/>
                <Input value={description} onChange={handle_change_description} placeholder='Description'/>
                <DatePicker onChange={handle_change_deadline} placeholder='Due Time'/>
            </Flex>
        </Modal>
        <Modal
            title='Update task'
            open={updateTaskModalOpen}
            onCancel={() => setUpdateTaskModalOpen(false)}
            footer={[
                <Button onClick={handleUpdateTask}>
                    Ok
                </Button>,
                <Button onClick={() => setUpdateTaskModalOpen(false)}>
                    Cancel
                </Button>
            ]}
            width={400}
        >
            <Flex vertical gap={20}>
                <Input value={title} onChange={handle_change_title} placeholder='Title'/>
                <Input value={description} onChange={handle_change_description} placeholder='Description'/>
                <DatePicker onChange={handle_change_deadline} placeholder='Due Time'/>
            </Flex>
        </Modal>

        {/* <Button onClick={() => {setNewDialogOpen(true)}}>
            Open Making Dialog
        </Button> */}
        <MyDialog open={newDialogOpen} setOpen={setNewDialogOpen} title='Testing Dialog'>
            <Input className='my-1' placeholder='Title' value={testTitle} onChange={(e) => setTestTitle(e.target.value)}/>
            <Input className='my-1' placeholder='Description' value={testDescription} onChange={(e) => setTestDescription(e.target.value)}/>
        </MyDialog>
    </>
}
