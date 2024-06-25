import style from './SignIn.module.scss';
import L from '../../icons/L.jpg';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CustomButton from '../../UI/Button/CustomButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { loginId } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Warning/Loading';
const SignIn = () => {
    const [loading, setLoading] = useState(true);
    const [valuePassword, setValuePassword] = useState<string>('');
    const [valueEmailName, setValueEmailName] = useState<string>('');
    const dis = useAppDispatch();
    const { userId } = useAppSelector(state => state.auth);
    const backRoute = useNavigate();
    const regis = (e: FormEvent) => {
        e.preventDefault();
        dis(loginId({ valueEmailName, valuePassword }));
    };

    useEffect(() => {
        if (userId && userId.length !== 0) {
            backRoute('/right-now');
        }
    }, [userId]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    if (loading) {
        return (
            <div className='warning'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='max-w fade-in'>
            <div className={style.regis}>
                <div className={style.auth}>
                    <div className={style.data}>
                        <span className={style.t}>Войти в аккаунт</span>
                        <input
                            type='text'
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setValueEmailName(e.target.value)
                            }
                            value={valueEmailName}
                        />
                        <input
                            type='password'
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setValuePassword(e.target.value)
                            }
                            value={valuePassword}
                        />
                        <div className={style.error}>
                            {userId === undefined ? (
                                <>
                                    Такого пользователя нету или <br />
                                    неверный пароль
                                </>
                            ) : userId === null ? null : (
                                <span>Успешный вход</span>
                            )}
                        </div>
                        <div className={style.btn}>
                            <span onClick={regis}>
                                <CustomButton
                                    theText='Подтвердить'
                                    type='submit'
                                />
                            </span>
                        </div>

                        <div className={style.notAcc}>
                            Нетy аккаунта?{' '}
                            <a href='https://www.anilibria.tv/pages/cp.php'>
                                Зарегистрироваться
                            </a>
                            <p>Регистрация доступна на сайте Anilibria.TV</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
