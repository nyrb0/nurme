import { FC, ReactNode } from 'react';
import Yagami from '../icons/Warning_Error.png';
import errorS from './Warning.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaLongArrowAltLeft } from 'react-icons/fa';
interface ErrorI {
    message?: string;
    children?: ReactNode;
    comeBack?: string;
}

const Error: FC<ErrorI> = ({ message, children, comeBack }) => {
    const navigate = useNavigate();
    return (
        <section className={errorS.error}>
            <img width={400} src={Yagami} alt='Error' />

            {children && (
                <>
                    <div className={errorS.message}>{children}</div>
                    {comeBack && (
                        <div
                            className={errorS.comeBack}
                            onClick={() => navigate(`${comeBack}`)}
                        >
                            <FaLongArrowAltRight />
                            Вернуться домой
                            <FaLongArrowAltLeft />
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Error;
