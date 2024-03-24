import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'min-w-24 p-1 mx-1 border-black white rounded-md',
        className
      )}
    >
      {children}
    </button>
  );
}
