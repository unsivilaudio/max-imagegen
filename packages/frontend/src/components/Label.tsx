import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type LabelProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<'label'>;

export default function Label({ htmlFor, className, children }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                'mb-1 text-left text-xs font-bold uppercase text-stone-50',
                className,
            )}
        >
            {children}
        </label>
    );
}
