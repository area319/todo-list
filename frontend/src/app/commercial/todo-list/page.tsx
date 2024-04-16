'use client'

import React, { useEffect, useState } from 'react'
import * as todoListApi from '../../../api/todo-list'
import todo_type from '../../../types/todo.type'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Input } from '../../../components/common/input'
import { Button } from '../../../components/common/button/button'
import { MyDialog } from '../../../components/common/dialog/dialog'
import { DatePicker } from '../../../components/common/input/datePicker'

export default function Page() {
    const [allTodoData, setAllTodoData] = useState<todo_type[]>([]);
    const [doingAdd, setDoingAdd] = useState(false);
    const [doingUpdate, setDoingUpdate] = useState(false);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [deadline, setDeadline] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedTodoIndex, setSelectedTodoIndex] = useState<number>(-1);
    const [filterAndSortModalOpen, setFilterAndSortModalOpen] = useState<boolean>(false);
    const [sortDirection, setSortDirection] = useState('asc');

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmDescription, setConfirmDescription] = useState("");
    const [onOkConfirm, setOnOkConfirm] = useState<Function>(() => { });
    const [onCancelConfirm, setOnCancelConfirm] = useState<Function>(() => { });

    useEffect(() => {
        handleGetAllTodoData();
    }, []);

    const doConfirm = async (title: string, description: string, onOk: Function, onCancel: Function) => {
        console.log(onOk, typeof (onOk), typeof (handleSetFilterAndSort));
        await setConfirmTitle(title);
        await setConfirmDescription(description);
        await setOnOkConfirm(() => { return onOk });
        await setOnCancelConfirm(() => { return () => { } })
        await setConfirmOpen(true);
    }

    const doDelete = async (index: number) => {
        await todoListApi.deleteTodo(allTodoData[index]._id);
        await handleGetAllTodoData();
        if (allTodoData.length == 1)
            setSelectedTodoIndex(-1);
        else if (index == allTodoData.length - 1)
            setSelectedTodoIndex(index - 1);
        else
            setSelectedTodoIndex(index);

    }

    const getBgColorOfLi = (index: number) => {
        if (allTodoData[index].status == "complete") {
            return "bg-blue-4";
        }
        if (selectedTodoIndex == index && !doingAdd) {
            return "bg-purple";
        }
        return "bg-blue-3";
    }

    const handleSetFilterAndSort = async () => {
        await handleGetAllTodoData();
        await setFilterAndSortModalOpen(false);
    }

    const handleUpdateTask = async () => {
        await todoListApi.updateTodo(allTodoData[selectedTodoIndex]._id, {
            title, description: description,
            deadline: deadline
        });
        await handleGetAllTodoData();
        setDoingUpdate(false);
    }

    const handleGetAllTodoData = async () => {
        console.log(sortDirection);
        const allTodoData1 = await todoListApi.getAllTodoList({
            sortBy: sortBy, sortDirection: sortDirection,
            startDate: startDate || "", endDate: endDate || "", search: search
        });
        if (allTodoData1.flag == 7) {
            await setAllTodoData(allTodoData1.data);
            if (allTodoData1.data.length > 0) {
                await setSelectedTodoIndex(0);
            } else {
                await setSelectedTodoIndex(-1);
            }
        }
    }

    const handleClickTodo = (index: any) => {
        setSelectedTodoIndex(index);
    }

    const handleCompleteTodo = async (index: number) => {
        await todoListApi.completeTodo(allTodoData[index]._id);
        await handleGetAllTodoData();
    }

    const handleDeleteTodo = async (index: number) => {
        doConfirm("Do you really delete this task?", "You can lose your task.", () => doDelete(index), () => { });
    }

    const handleAddTask = async () => {
        if (title == "" || description == "" || deadline == "") {
            return;
        }
        await todoListApi.addTodoList({ title: title, description: description, deadline: deadline });
        await handleGetAllTodoData();
        setTitle('');
        setDescription('');
        setDeadline(new Date().toISOString().split('T')[0]);
    }

    const handleChangeTitle = (e: any) => {
        setTitle(e.target.value);
    }
    const handleChangeDescription = (e: any) => {
        setDescription(e.target.value);
    }

    const handleChangeDeadline = (e: any) => {
        setDeadline(e.target.value);
    }

    const handleBeginUpdate = async () => {
        await setTitle(allTodoData[selectedTodoIndex].title);
        await setDescription(allTodoData[selectedTodoIndex].description);
        await setDeadline(allTodoData[selectedTodoIndex].deadline.toString());
        setDoingUpdate(true);
    }
    const handleCancelAdd = () => {
        setTitle("");
        setDescription("");
        setDeadline("");
    }

    const handleBeginAdd = async () => {
        setDoingAdd(true);
    }

    const handleRecollectTodo = async () => {
        await todoListApi.recollectTodo(allTodoData[selectedTodoIndex]._id);
        await handleGetAllTodoData();
    }

    return (
        <main className='h-full'  >
            <ul className='fixed todo-left bg-blue-4 w-56 top:0 left:0 overflow-y-scroll'>
                <li onClick={() => { handleBeginAdd(); setDoingUpdate(false) }} key='Add task'
                    className={'relative p-3 hover:cursor-pointer border-b border-white hover:bg-orange '
                        + (doingAdd == true ? "bg-purple" : "")} data-testid="add button">
                    <a>
                        <PlusCircleOutlined />
                        &nbsp;&nbsp;Add Task
                    </a>
                    <a className='absolute right-2' role='button' onClick={(e) => { e.stopPropagation(); setFilterAndSortModalOpen(true); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                </li>
                {
                    allTodoData?.map((val, index) => (
                        val.status == 'complete' ?
                            <li onClick={() => { handleClickTodo(index); setDoingAdd(false); setDoingUpdate(false) }} key={val._id} className={'relative p-1 border-b border-white hover:bg-orange ' + getBgColorOfLi(index)}>
                                <p className='line-through'>{val.title.length > 20 ? val.title.substring(0, 20) + '...' : val.title} </p>
                                <p className='text-xs text-white'>Completed By: {val.completeDate.toString().split('T')[0]}</p>
                            </li>
                            : <li onClick={() => { handleClickTodo(index); setDoingAdd(false); setDoingUpdate(false) }} key={val._id} className={'relative p-1 border-b border-white hover:bg-orange hover:cursor-point ' + getBgColorOfLi(index)}>
                                <a>{val.title.length > 20 ? val.title.substring(0, 20) + '...' : val.title}</a>
                                {Date.now() - new Date(val.createdAt).getTime() < 1000 * 60 * 480 ? <span className="bg-blue-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-pink dark:text-pink absolute right-0">New</span> : null}
                                <p className='text-xs text-white'>Due By: {val.deadline.toString().split('T')[0]}</p>
                            </li>
                    ))
                }
            </ul>
            <div className='pl-96 bg-blue-1 h-full'>
                {
                    doingAdd ?
                        <div>
                            <p className='text-3xl text-thin text-center mb-2'>
                                Add Task.
                            </p>
                            <div className='m-5'>
                                <label className='text-sm'>Title</label>
                                <Input value={title} onChange={handleChangeTitle} placeholder='Title' className='w-96 my-5 block' setValidateResult={() => { }} />
                                <label className='text-sm'>Description</label>
                                <textarea value={description} onChange={handleChangeDescription} placeholder='Description' className='h-20 w-96 my-5 block rounded-md border p-2' />
                                <label className='text-sm'>Due Date</label>
                                <DatePicker type="date" value={deadline} placeholder='Due Date' className='w-96 my-5 block' onChange={handleChangeDeadline} min={new Date().toISOString().split('T')[0]} />
                                <div className='m-10'>
                                    <Button onClick={handleAddTask} className='ml-2'>Save</Button>
                                    <Button onClick={() => handleCancelAdd()}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                        : (selectedTodoIndex != -1 ?
                            (doingUpdate ?
                                <div>
                                    <p className='text-3xl text-thin text-bold text-center mb-2'>
                                        Update Task.
                                    </p>
                                    <label className='text-sm'>Title</label>
                                    <Input value={title} onChange={handleChangeTitle} placeholder='Title' className='w-96 my-5 block' setValidateResult={() => { }} />
                                    <label className='text-sm'>Description</label>
                                    <textarea value={description} onChange={handleChangeDescription} placeholder='Description' className='h-20 w-96 my-5 block rounded-md border p-2' />
                                    <label className='text-sm'>Due Date</label>
                                    <DatePicker type="date" value={deadline} placeholder='Due Date' className='w-96 my-5 block' onChange={handleChangeDeadline} min={new Date().toISOString().split('T')[0]} />
                                    <Button onClick={handleUpdateTask} className='ml-6'>Save</Button>
                                    <Button onClick={() => setDoingUpdate(false)}>Cancel</Button>
                                </div> :
                                <div className='pt-20 text-3xl'>
                                    {/* {allTodoData[selectedTodoIndex].status == "complete" ? <p className='text-5xl bp-20'>You did it.</p> : null} */}
                                    <div className='flex'>
                                        <div>
                                            <label className='w-44 inline-block'>Title: </label>
                                            <p className='m-5 inline'>{allTodoData[selectedTodoIndex].title}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='w-44 inline-block'>Description: </label>
                                        {
                                            allTodoData[selectedTodoIndex].description.split('\n').map((val, index) =>
                                                <p className='ml-52 block' key={index}>{val}</p>)
                                        }
                                    </div>
                                    <div>
                                        <label className='w-44 inline-block'>Due Date: </label>
                                        <p className='m-5 inline'>{allTodoData[selectedTodoIndex].deadline}</p>
                                    </div>
                                    <div className='mt-10'>
                                        {
                                            allTodoData[selectedTodoIndex].status == 'complete' ? <Button onClick={handleRecollectTodo}>Recollect</Button> : <>
                                                <Button onClick={handleBeginUpdate}>Update</Button>
                                                <Button onClick={() => handleCompleteTodo(selectedTodoIndex)} className='mx-10'>Complete</Button></>
                                        }
                                        <Button onClick={() => handleDeleteTodo(selectedTodoIndex)} className='mx-10'>Delete</Button>
                                    </div>
                                </div>
                            ) : null)
                }
            </div>
            <MyDialog
                title='Filter And Sort'
                open={filterAndSortModalOpen}
                setOpen={setFilterAndSortModalOpen}
                onOk={handleSetFilterAndSort}
                onCancel={() => { }}
                className='w-120'
            >
                <div className='p-5'>
                    <div>
                        <label className='my-3 block'>Due Date:</label>
                        <DatePicker value={startDate} type="date" placeholder='Start Date' onChange={(e) => { setStartDate(e.target.value) }} />
                        <p className='p-4 inline'>~</p>
                        <DatePicker value={endDate} type="date" placeholder='End Date' onChange={(e) => { setEndDate(e.target.value) }} />
                    </div>
                    <div>
                        <label className='block my-3'>Title Search:</label>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Title search' className='w-96' setValidateResult={() => { }}></Input>
                    </div>
                    <div>
                        <label className='block my-3'>Sort By:</label>
                        <select value={sortBy} onChange={e => { setSortBy(e.target.value) }} className='ml-1 border p-2 rounded-md w-96'>
                            <option value='createdAt'>CreatedAt</option>
                            <option value="title">Title</option>
                            <option value="description">Description</option>
                            <option value="deadline">Due Date</option>
                        </select>
                        <div className='flex'>
                            <div className='p-2'>
                                {sortDirection == 'asc' ? <>
                                    <input type="radio" name="Sort Direction" value={"desc"} onClick={() => setSortDirection('desc')} />
                                    <label htmlFor="descending" className='ml-1'>desc</label>
                                </> : <>
                                    <input type="radio" name="Sort Direction" value={"desc"} onClick={() => setSortDirection('desc')} defaultChecked />
                                    <label htmlFor="descending" className='ml-1'>desc</label>
                                </>}
                            </div>
                            <div className='p-2'>
                                {sortDirection == 'asc' ? <>
                                    <input type="radio" name="Sort Direction" value={"asc"} onClick={() => setSortDirection('asc')} defaultChecked />
                                    <label htmlFor="asc" className='ml-1'>asc</label>
                                </> : <>
                                    <input type="radio" name="Sort Direction" value={"asc"} onClick={() => setSortDirection('asc')} />
                                    <label htmlFor="asc" className='ml-1'>asc</label>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </MyDialog>
            {/* Confirm Dialog */}
            <MyDialog
                open={confirmOpen}
                setOpen={setConfirmOpen}
                title={confirmTitle}
                onOk={onOkConfirm}
                onCancel={onCancelConfirm}
                className='w-80'
            >
                <p className='py-5 text-center'>
                    {confirmDescription}
                </p>
            </MyDialog>
        </main>
    )
}
