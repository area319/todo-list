'use client'
import React from 'react'
import { useRouter } from "next/navigation"


export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.replace('/login');
    }

    const handleSignup = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.replace('/signup');
    }

    const handleResetPassword = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log(localStorage);
        router.replace('/reset-password');
    }

    return (
        <div className="h-20 flex items-center justify-center bg-blue-3 relative text-white">
            <p className="text-5xl text-black">Todo list</p>
            <a role="button" className="absolute right-32" onClick={handleSignup}>
                Sign up
            </a>
            <a role="button" className="absolute right-52" onClick={handleResetPassword}>
                Reset Password
            </a>
            <a role="button" className="absolute right-10" onClick={handleLogout}>
                Log out
            </a>
        </div>
    );
}