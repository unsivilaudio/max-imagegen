import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TextInputProps = ComponentPropsWithoutRef<'input'>;

type TextAreaProps = {
    isTextArea: true;
} & ComponentPropsWithoutRef<'textarea'>;

type InputProps = TextInputProps | TextAreaProps;

function isTextAreaProps(props: InputProps) {
    return 'isTextArea' in props;
}

export default function Input(props: InputProps) {
    const { className } = props;
    const classes = twMerge('rounded-lg bg-stone-600 p-2', className);
    return isTextAreaProps(props) ? (
        <textarea {...props} className={classes}></textarea>
    ) : (
        <input {...props} className={classes} />
    );
}
