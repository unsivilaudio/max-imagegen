import { twMerge } from 'tailwind-merge';

type InputProps = {
    isTextArea?: boolean;
    className?: string;
    type?: string;
    id: string;
};

export default function Input({ isTextArea = false, className, ...props }: InputProps) {
    const Component = isTextArea ? 'textarea' : 'input';

    return (
        <Component
            className={twMerge('rounded-lg bg-stone-600 p-2', className)}
            name={props.id}
            {...props}
        />
    );
}
