import { FC } from 'react';
import custom from './CustomButton.module.scss';
import classNames from 'classnames';
interface ButtonI {
    theText: string;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    isActive?: boolean;
}
const CustomButton: FC<ButtonI> = ({
    theText,
    type,
    disabled,
    onClick,
    isActive = true,
}) => {
    const setColor = classNames({
        grayBtn: isActive,
        redBtn: !isActive,
    });
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${custom.button} ${setColor} `}
        >
            {theText}
        </button>
    );
};

export default CustomButton;
