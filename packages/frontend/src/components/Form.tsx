import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = {
    children: ReactNode;
    className?: string;
} & ComponentPropsWithoutRef<'form'>;

export default function Form({ children, className, ...props }: FormProps) {
    return (
        <form
            className={twMerge('flex flex-col gap-3 rounded-lg bg-stone-700 p-4', className)}
            {...props}
        >
            {children}
        </form>
    );
}
