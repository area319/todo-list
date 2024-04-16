'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '%/components/common/button/button'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <div className='relative'>
            <div className="flex h-10 justify-end items-center bg-gray-light">
                <Link href='/commercial/todo-list'><Button>Todo List</Button></Link>
                <Link href='/commercial/user-manage'><Button>User Management</Button></Link>
            </div>
            <div className="todo-main">{children}</div>
        </div>
    )
}
