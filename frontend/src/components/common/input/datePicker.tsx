import React from 'react'
import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function DatePicker({className, ...rest}: InputProps) {
    return (
        <input 
            type="date" 
            className={clsx("m-1 p-2 rounded-lg border", className)} 
            {...rest}
        />
    )
}