type InputContainerProps = {
    children: React.ReactNode;
};

export default function InputContainer({ children }: InputContainerProps) {
    return <p className='flex flex-col'>{children}</p>;
}
