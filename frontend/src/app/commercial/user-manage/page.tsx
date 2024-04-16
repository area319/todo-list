'use client'

import React, { useState, useEffect } from 'react'
import Table from '%/components/common/table'
import { getAllUserData } from '../../../api/auth'
import { deleteUser } from '../../../api/auth'
import userType from '%/types/user.type'
import { MyDialog } from '%/components/common/dialog/dialog'

export default function Page() {
    const [allUserData, setAllUserData] = useState<Array<userType>>([]);
    const [allUserArray, setAllUserArray] = useState<Array<Array<string>>>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmDescription, setConfirmDescription] = useState("");
    const [onOkConfirm, setOnOkConfirm] = useState<Function>(() => { });
    const [onCancelConfirm, setOnCancelConfirm] = useState<Function>(() => { });

    useEffect(() => {
        handleGetAllUsers();
    }, [])

    const doConfirm = async (title: string, description: string, onOk: Function, onCancel: Function) => {
        await setConfirmTitle(title);
        await setConfirmDescription(description);
        await setOnOkConfirm(() => { return onOk });
        await setOnCancelConfirm(() => { return () => { } })
        await setConfirmOpen(true);
    }

    const handleGetAllUsers = async () => {
        const allUserDataRes = await getAllUserData();
        setAllUserData(allUserDataRes);
        if (allUserDataRes == "Didn't get it.") {
            return;
        }
        console.log(allUserDataRes);
        const changedAllUserData = allUserDataRes.map((val: any) => [val.email, val.createdAt.split('T')[0]])
        setAllUserArray(changedAllUserData);
    }

    const handleDeleteUser = async (index: number) => {
        await deleteUser(allUserData[index]._id);
        handleGetAllUsers();
    }

    const handleClickUser = (index: number) => {
        doConfirm('You can lose your data', 'Do you really want to delete this user?', () => handleDeleteUser(index), () => setConfirmOpen(false));
    }

    return (
        <div className='todo-main bg-blue-1'>
            <Table columns={['email', 'createdAt']} data={allUserArray} onClick={handleClickUser}></Table>
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
        </div>
    )
}
