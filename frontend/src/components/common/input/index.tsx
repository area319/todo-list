import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useState } from 'react'
import { emit } from 'process'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setValidateResult: Function
}

export function Input({ className, ...rest }: InputProps) {
    return (
        <input {...rest} className={clsx("m-1 border-black border rounded-md h-10 pl-3", className)} />
    );
}

export function PasswordInput({ className, onChange, onFocus, onBlur, setValidateResult, ...rest }: InputProps) {
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("no error.");
    var passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const checkPassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be more than 8 charaters long.";
        } else if (!passwordRegularExpression.test(password)) {
            return "Password must contain special characters, numbers, lowercases, uppercases.";
        } else {
            return "no error.";
        }
    }

    const handleChange = (e: any) => {
        if (typeof onChange == "function") {
            onChange(e);
        }
        if (passwordCheckMessage != "no error.") {
            setValidateResult(checkPassword(e.target.value));
            setPasswordCheckMessage(checkPassword(e.target.value));
        }
    }

    const handleBlur = (e: any) => {
        if (typeof onBlur == "function") {
            onBlur(e);
        }
        setValidateResult(checkPassword(e.target.value));
        setPasswordCheckMessage(checkPassword(e.target.value));
    }

    return (
        <div>
            <input {...rest} type="password" onChange={handleChange} onBlur={handleBlur} className={clsx("block m-1 border-black border rounded-md h-10 w-full pl-3", passwordCheckMessage != "no error." ? "border-red" : "", className)} />
            {passwordCheckMessage != "no error." ? <p className="block text-red">{passwordCheckMessage}</p> : <p>&nbsp;</p>}
        </div>
    );
}

export function EmailInput({ className, onChange, onFocus, setValidateResult, onBlur, ...rest }: InputProps) {
    const [emailCheckMessage, setEmailCheckMessage] = useState("Valid email.");

    const emailRegularExpression = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const checkEmail = (email: string) => {
        if (!emailRegularExpression.test(email)) {
            return "Invalid email.";
        } else {
            return "Valid email.";
        }
    }

    const handleCheckEmail = (e: any) => {
        const checkValue = checkEmail(e.target.value);
        setValidateResult(checkValue);
        setEmailCheckMessage(checkValue);
    }

    // 
    const handleChange = (e: any) => {
        // setValidateResult(checkEmail(e.target.value));
        // setEmail(email);
        console.log(onChange);
        if(typeof onChange == 'function') {
            onChange(e);
        }

        if (emailCheckMessage != "Valid email.") {
            handleCheckEmail(e);
        }
    }

    return (
        <div>
            <input {...rest} type="email" onChange={handleChange} onBlur={handleCheckEmail} className={clsx("block m-1 border-black border rounded-md h-10 w-full pl-3", emailCheckMessage != "Valid email." ? "border-red" : "", className)}/>
            {emailCheckMessage != "Valid email." ? <p className="block text-red">{emailCheckMessage}</p> : <p>&nbsp;</p>}
        </div>
    );
}
