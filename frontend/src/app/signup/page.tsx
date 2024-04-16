'use client'

import React from 'react'
import { EmailInput, PasswordInput } from '%/components/common/input'
import { Button } from '../../components/common/button/button'
import { signup } from '../../api/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailValidateResult, setEmailValidateResult] = useState('Invalid email.');
    const [password, setPassword] = useState('');
    const [passwordValidateResult, setPasswordValidateResult] = useState('Password must be more than 8 charaters long.');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidateResult, setConfirmPasswordValidateResult] = useState('Password must be more than 8 charaters long.');
    const [confirmCheckMessage, setConfirmCheckMessage] = useState('');

    const handleSignUp = async () => {
        if(emailValidateResult != 'Valid email.') {
            console.log(emailValidateResult);
            return;
        }

        if(passwordValidateResult != 'no error.') {
            console.log('Password:', passwordValidateResult);
            return ;
        }
        
        if(confirmPasswordValidateResult != 'no error.') {
            console.log('Confirm password:', confirmPasswordValidateResult);
            return;
        }

        try {
            const signupRes = await signup({ email, password });
            if(signupRes.message == 'Success') {
                router.replace('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value);
    }

    const handleBackLogin = () => {
        router.replace('/login');
    }

    return (
        <main className="flex login-main inset-0 justify-center items-center">
            <div className="flex w-11/12 h-full pt-5">
                <div className="w-1/2">
                    <img src="/leftofsignup.jpg" alt="AAA" className="w-full h-full" />
                </div>
                <div className="w-1/2 pt-8">
                    <div className="pl-20 p-2">
                        <p className="text-center text-bold text-2xl">{`Let's get started`}</p>
                    </div>
                    <div className='pl-10'>
                        <div className="p-1">
                            <label className="block text-xs text-bold">Email:</label>
                            <EmailInput value={email} onChange={(e:any) => setEmail(e.target.value)} setValidateResult={setEmailValidateResult}/>
                        </div>
                        <div className="p-1">
                            <label className='block text-xs text-bold'>Password:</label>
                            <PasswordInput value={password} onChange={handleChangePassword} setValidateResult={setPasswordValidateResult}/>
                        </div>
                        <div className="p-1">
                            <label className="block text-xs text-bold">Confirm Password:</label>
                            <PasswordInput value={confirmPassword} onChange={handleChangeConfirmPassword} setValidateResult={setConfirmPasswordValidateResult} />
                        </div>
                        <p className="m-6 text-red text-sm">{confirmCheckMessage}</p>
                    </div>
                    <div className="flex justify-end p-5">
                        <Button onClick={handleSignUp} className="bg-purple">Sign Up</Button>
                        <Button onClick={handleBackLogin} className="bg-purple">Back to login</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
