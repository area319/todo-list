'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/common/button/button'
import { EmailInput, PasswordInput } from '../../components/common/input'
import { useLogin } from '%/hooks/login'

export default function Page() {
    const {
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
        handleLogin,} = useLogin()

    return (
        <main className="flex login-main inset-0 justify-center items-center" data-testid="main">
            <div className="flex w-11/12 h-full">
                <div className="w-1/2">
                    <img src="/leftofsignup.jpg" alt="AAA" className="w-full h-full" />
                </div>
                <div className="w-1/2 pt-16">
                    <div className="p-5">
                        <p className="text-center text-bold text-4xl pl-10">Log in.</p>
                    </div>
                    <div>
                        <div className="pl-10">
                            <label className="block text-xs text-bold">Email:</label>
                            <EmailInput placeholder="Your Email address." type="email" value={email} onChange={(e) => setEmail(e.target.value)} setValidateResult={setEmailValidateResult} />
                        </div>
                        <div className="pl-10">
                            <label className="block text-xs text-bold">Password:</label>
                            <PasswordInput placeholder="Your password." type="password" value={password} onChange={(e) => setPassword(e.target.value)} setValidateResult={setPasswordValidateResult} />
                        </div>
                        <p className='text-red text-sx ml-6'>{loginErrorShow}</p>
                    </div>
                    <div className="flex justify-end p-5 items-center">
                        <a role='button' className='block mx-3 text-gray' onClick={() => router.replace('/signup')}>Sign up</a>
                        <a role='button' className='block mx-3 text-gray' onClick={() => router.replace('/reset-password')}>Reset password</a>
                        <Button onClick={handleLogin} className="bg-purple">Login</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
