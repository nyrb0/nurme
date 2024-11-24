import { FC, ReactNode } from 'react';
import Yagami from '../../../assets/icons/Warning_Error.png';
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
            <div>
                <img src={Yagami} alt='Error' />
            </div>
            <div className={errorS.wrapper}>
                <div className={errorS.eContent}>
                    {children && (
                        <div>
                            <div className={errorS.message}>{children}</div>
                            {comeBack && (
                                <div
                                    className={errorS.comeBack}
                                    onClick={() => navigate(`${comeBack}`)}
                                >
                                    <FaLongArrowAltRight />
                                    <span>Вернуться домой</span>
                                    <FaLongArrowAltLeft />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Error;
