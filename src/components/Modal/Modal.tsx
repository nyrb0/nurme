import React, { FC, ReactNode } from 'react';
import modalS from './Modal.module.scss';
interface ModalProps {
    children?: ReactNode;
    onClick: () => void;
}
const Modal: FC<ModalProps> = ({ children, onClick }) => {
    return (
        <div className={modalS.overlay} onClick={onClick}>
            <div className={modalS.content} onClick={e => e.stopPropagation()}>
                <button onClick={onClick} className={modalS.button}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
