import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      { ...rest }
      className={clsx(
        'h-9 items-center rounded-lg bg-blue-5 px-4 text-sm font-medium text-white transition-colors hover:bg-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue active:bg-blue aria-disabled:cursor-not-allowed aria-disabled:opacity-50 mx-2',
        className,
      )}
    >
      {children}
    </button>
  );
}
