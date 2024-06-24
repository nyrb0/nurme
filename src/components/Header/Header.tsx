// src/components/Header/Header.tsx
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import headerS from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { useGetResultSearchQuery } from '../../API/animeData';
import { Title } from '../../types/UpdateA';
import { THE_BASE_URL } from '../../utils/baseUrls';
import notResultImage from '../icons/pngwing.com.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useUserInfoQuery } from '../../API/user/UserData';
import { pushToData } from '../../redux/userSlice';
import { GiHamburgerMenu } from 'react-icons/gi';
import { skipToken } from '@reduxjs/toolkit/query';
import { menuContext } from '../../Context/Menu';
import unknownUser from '../icons/unknownUser.jpg';
import { motion } from 'framer-motion';
const Header: FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const menuCon = useContext(menuContext);
    if (!menuCon) throw new Error('error in menu context');

    const { menu, setMenu } = menuCon;
    const [title, setTitle] = useState<string>('');
    const { data: resultSearch, isFetching } = useGetResultSearchQuery({
        title,
    });

    const dis = useAppDispatch();
    const navigate = useNavigate();
    const { userId: userD } = useAppSelector(state => state.auth);
    const { data: userInfo } = useUserInfoQuery(userD ? { userD } : skipToken);

    useEffect(() => {
        if (userInfo) {
            dis(pushToData(userInfo));
        }
    }, [userInfo]);

    useEffect(() => {
        const handleSizeWin = () => {
            setWindowWidth(innerWidth);
        };
        handleSizeWin();
        addEventListener('resize', handleSizeWin);
        return () => {
            removeEventListener('resize', handleSizeWin);
        };
    }, []);
    const photoProfile = localStorage.getItem('photoProfileNurme');

    return (
        <header id='head' className={headerS.header}>
            <div className={headerS.innerHeader}>
                <motion.div
                    className={headerS.namesAnimeCinema}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to={'/'}>
                        {windowWidth >= 390 ? (
                            <>
                                Nur<span>me</span>
                            </>
                        ) : (
                            <span>N</span>
                        )}
                    </Link>
                </motion.div>
                <motion.div
                    className={headerS.searchAndUser}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <input
                        value={title}
                        type='search'
                        className={headerS.search}
                        placeholder='Поиск'
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                    />
                    {resultSearch && resultSearch?.list.length > 0 ? (
                        <div className={headerS.resultSer}>
                            <ul>
                                {resultSearch.list.map((resultS: Title) => (
                                    <Link
                                        to={`right-now/title/${resultS.id}`}
                                        key={resultS.id}
                                        onClick={() => setTitle('')}
                                    >
                                        <li key={resultS.id}>
                                            <img
                                                src={`${THE_BASE_URL}${resultS.id}.webp`}
                                                alt={resultS.names.ru}
                                            />
                                            <span>
                                                {resultS.names.ru}
                                                <div className={headerS.year}>
                                                    Год:{resultS?.season?.year}
                                                </div>
                                                <div
                                                    className={
                                                        headerS.genreSearch
                                                    }
                                                >
                                                    {resultS.genres.map(
                                                        genre => (
                                                            <span key={genre}>
                                                                {genre},{' '}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </span>
                                        </li>
                                    </Link>
                                ))}
                                <div
                                    className={headerS.showAgain}
                                    onClick={() => {
                                        navigate(`/result?title=${title}`);
                                        setTitle('');
                                        location.reload();
                                    }}
                                >
                                    Показать еще
                                </div>
                            </ul>
                        </div>
                    ) : isFetching && title ? (
                        <div className={headerS.resultSer}>
                            <div className={`${headerS.loadingResult} dfc`}>
                                Загрузка...
                            </div>
                        </div>
                    ) : resultSearch?.list.length === 0 && title.length > 0 ? (
                        <div className={headerS.resultSer}>
                            <ul>
                                <div className={headerS.notResult}>
                                    <img
                                        src={`${notResultImage}`}
                                        alt='fndbg'
                                    />
                                    <li style={{ textAlign: 'center' }}>
                                        Ничего не найдено
                                    </li>
                                </div>
                            </ul>
                        </div>
                    ) : null}
                </motion.div>

                {windowWidth >= 1217 ? (
                    <>
                        {' '}
                        <div className={headerS.menu}>
                            <Navigation />
                        </div>
                        <div className={headerS.regis}>
                            {userD && userD.length !== 0 ? (
                                <span>
                                    <img
                                        src={
                                            photoProfile &&
                                            photoProfile.length > 0
                                                ? photoProfile
                                                : unknownUser
                                        }
                                        alt='Profile User'
                                        onClick={() => navigate('/profile')}
                                    />
                                    <div className={headerS.login}>
                                        {userInfo?.login}
                                    </div>
                                </span>
                            ) : (
                                <>
                                    <button>
                                        <a href='https://www.anilibria.tv/pages/cp.php'>
                                            Регистрация
                                        </a>{' '}
                                    </button>
                                    <button
                                        className={headerS.b2}
                                        onClick={() => navigate('auth')}
                                    >
                                        Войти
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className='dfa'>
                        <div className={headerS.avatar}>
                            <Link to={userD ? '/profile' : '/route-regis'}>
                                <img
                                    src={photoProfile || unknownUser}
                                    alt='Profile User'
                                />
                                <div className={headerS.login}>
                                    {userD ? userInfo?.login : ''}
                                </div>
                            </Link>
                        </div>
                        <GiHamburgerMenu
                            size={30}
                            onClick={() => setMenu(true)}
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
