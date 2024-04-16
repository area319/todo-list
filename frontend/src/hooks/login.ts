'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '%/api/auth';

export function useLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailValidateResult, setEmailValidateResult] = useState('Invalid email.');
    const [password, setPassword] = useState('');
    const [passwordValidateResult, setPasswordValidateResult] = useState('Password must be more than 8 charaters long.');
    const [loginErrorShow, setLoginErrorShow] = useState('');
    
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (emailValidateResult != 'Valid email.') {
            console.log(emailValidateResult);
            return;
        }
        if (passwordValidateResult != 'no error.') {
            console.log(passwordValidateResult);
            return;
        }
        const res_data = await login({ email: email, password: password });
        if (res_data.message == "Login successed") {
            localStorage.setItem('access_token', res_data.accessToken);
            localStorage.setItem('refresh_token', res_data.refreshToken);
            router.replace('/commercial/todo-list');
        } else {
            setLoginErrorShow(res_data.message);
            setTimeout(() => {
                setLoginErrorShow('');
            }, 2000);
        }
    }

    return {
        router, 
        email,
        setEmail,
        emailValidateResult,
        setEmailValidateResult,
        password,
        setPassword,
        passwordValidateResult,
        setPasswordValidateResult,
        loginErrorShow,
        setLoginErrorShow,
        handleLogin,
    }
}

