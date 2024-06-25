import React, { FC, ReactNode } from 'react';
import modalS from './Modal.module.scss';
import { motion } from 'framer-motion';
interface ModalProps {
    children: ReactNode;
    onClick: () => void;
    isVisibleX?: boolean;
    maxWidth?: number;
}
const Modal: FC<ModalProps> = ({
    children,
    onClick,
    isVisibleX = true,
    maxWidth,
}) => {
    return (
        <motion.div
            className={modalS.overlay}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <div className={modalS.wrapper} style={{ maxWidth: maxWidth }}>
                {isVisibleX && (
                    <button
                        onClick={onClick}
                        className={modalS.button}
                        translate='no'
                    >
                        X
                    </button>
                )}
                <div
                    className={modalS.content}
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default Modal;
