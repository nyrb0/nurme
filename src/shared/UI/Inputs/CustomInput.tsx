import { ChangeEvent, FC, ReactNode } from 'react';
import inS from './CustomInputs.module.scss';

interface CustomIn {
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}
const CustomInput: FC<CustomIn> = ({ placeholder, onChange, value }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inS.input}
            type='text'
        />
    );
};

export default CustomInput;
