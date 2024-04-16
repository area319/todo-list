'use client'

import React from 'react'
import { EmailInput, PasswordInput } from '../../components/common/input'
import { Button } from '../../components/common/button/button'
import { resetPassword } from '../../api/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValidateResult, setEmailValidateResult] = useState('Invalid email.');
    const [curPasswordValidateResult, setCurPasswordValidateResult] = useState('Password must be more than 8 charaters long.');
    const [newPasswordValidateResult, setNewfirmPasswordValidateResult] = useState('Password must be more than 8 charaters long.');
    const [confirmPasswordValidateResult, setConfirmPasswordValidateResult] = useState('Password must be more than 8 charaters long.');

    const handleResetPassword = async() => {
        if(emailValidateResult != 'Valid email.') {
            console.log(emailValidateResult);
            return;
        }

        if(curPasswordValidateResult != 'no error.') {
            console.log('Current password: ',curPasswordValidateResult);
            return;
        }
        
        if(newPasswordValidateResult != 'no error.') {
            console.log('New password: ', newPasswordValidateResult);
            return ;
        }

        if(confirmPasswordValidateResult != 'no error.') {
            console.log('confirmPassword', confirmPasswordValidateResult);
            return;
        }

        if(newPassword != confirmPassword){
            console.log('diff pass');
            return;
        }

        try {
            const receiveData = await resetPassword({email, curPassword:curPassword, newPassword: newPassword});
            if(receiveData=='success') {
                router.replace('/login');
            }
        } catch(err) {
            console.log(err);
        }
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
                <div className="w-1/2 pt-2">
                    <p className="w-full text-center text-bold text-2xl pl-10">Reset your password.</p>
                    <div>
                        <div className="py-1 pl-10">
                            <label className="block text-xs text-bold">Email:</label>
                            <EmailInput placeholder="Your Email address." type="email" value={email} onChange={(e) => setEmail(e.target.value)} setValidateResult={setEmailValidateResult}/>
                        </div>
                        <div className="py-1 pl-10">
                            <label className="block text-xs text-bold">Current Password:</label>
                            <PasswordInput placeholder="Current password." type="password" value={curPassword} onChange={(e) => setCurPassword(e.target.value)} setValidateResult={setCurPasswordValidateResult}/>
                        </div>
                        <div className="py-1 pl-10">
                            <label className="block text-xs text-bold">New Password:</label>
                            <PasswordInput placeholder="New password." type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} setValidateResult={setNewfirmPasswordValidateResult}/>
                        </div>
                        <div className="py-1 pl-10">
                            <label className="block text-xs text-bold">Confirm New Password:</label>
                            <PasswordInput placeholder="Confirm password." type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} setValidateResult={setConfirmPasswordValidateResult}/>
                        </div>
                    </div>
                    <div className="flex justify-end p-5">
                        <Button onClick={handleResetPassword} className="bg-purple">Reset Password</Button>
                        <Button onClick={handleBackLogin} className="bg-purple">Back to login</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
