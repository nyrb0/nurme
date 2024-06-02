import { FC } from 'react';
import custom from './CustomButton.module.scss';
interface ButtonI {
    theText: string;
    type: 'button' | 'submit' | 'reset';
}
const CustomButton: FC<ButtonI> = ({ theText, type }) => {
    return (
        <button type={type} className={custom.button}>
            {theText}
        </button>
    );
};

export default CustomButton;
