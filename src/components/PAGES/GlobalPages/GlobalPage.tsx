import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import Header from '../../Header/Header';
import StartWatchNow from '../../StartWatchNow/StartWatchNow';
import SingleAnimeItem from '../../SingleAnimeItem/SingleAnimeItem';
import Footer from '../../Footer/Footer';
import NotFoundAPage from '../NotFoundAPage/NotFoundAPage';
import Modal from '../../Modal/Modal';
import CustomButton from '../../UI/Button/CustomButton';
import SignIn from '../Sing/SignIn';
import CategoryPage from '../Category/CategoryPage';
import SchedulePage from '../SchedulePage/SchedulePage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { isVisibleContext } from '../../../Context/Visible';
import { useGetGenresQuery } from '../../../API/animeData';
import { BiReset } from 'react-icons/bi';
import GlobalS from './GlobalPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { delateStorage } from '../../../redux/CategorySlice';
import OwnUserProfile from '../Profile/OwnUserProfile';
import Select from '../../UI/Select/Select';
import { menuContext } from '../../../Context/Menu';
import Navigation from '../../Navigation/Navigation';
import TheProject from '../ShowNurmeProjectPage/TheProject';
import unknownUser from '../../icons/unknownUser.jpg';
import Result from '../ResultSearchPage/Result';
import MobileRegis from '../Sing/MobileRegis/MobileRegis';
import { Link } from 'react-router-dom';
import SearchGenre from '../SearchGenre/SearchGenre';
import { FaInstagram } from 'react-icons/fa';
import { RiTelegramLine } from 'react-icons/ri';
import { IoLogoTiktok } from 'react-icons/io5';

const GlobalPage: FC = () => {
    const menuCon = useContext(menuContext);
    const [windowCurrent, setWindowCurrent] = useState<number>(0);
    if (!menuCon) throw new Error('error menu context');

    const { menu, setMenu } = menuCon;

    const [selectedCurrent, setSelectredCurrent] = useState<string | number>(
        'Выберете'
    );

    const dispatch = useAppDispatch();
    const { data: genresArray } = useGetGenresQuery({});

    const contextVis = useContext(isVisibleContext);
    if (!contextVis) {
        throw new Error('context not have');
    }
    const { isVisible, setIsVisible } = contextVis;

    const currentDateYear = new Date().getFullYear();

    const startYears = 1995;
    const startSelectYears = 2013;
    const endYears = currentDateYear;
    const listYearsSort = [];
    const currentLocation = useLocation();
    for (let i = startYears; i <= currentDateYear; i++) {
        listYearsSort.push(i);
    }
    const [genres, setGenres] = useState<string[]>([]);
    const [startEndYears, setStartEndYears] = useState<{
        start: number;
        end: number;
    }>({
        start: startSelectYears,
        end: endYears,
    });
    const [state, setState] = useState<number[]>([]);

    useEffect(() => {
        const newYears = [];
        for (
            let yearsI = startEndYears.start;
            yearsI <= startEndYears.end;
            yearsI++
        ) {
            newYears.push(yearsI);
        }
        setState(newYears);
    }, [startEndYears]);

    const navigate = useNavigate();

    const filterCategory = (e: FormEvent) => {
        e.preventDefault();
        setIsVisible(false);
        dispatch(delateStorage([]));
        navigate(`/category?year=${state}&genre=${genres}`);
    };

    const genresFilter = (selectGenres: string) => {
        const filtered = genres.some(sGenre => sGenre === selectGenres);
        if (!filtered && selectGenres !== 'Не выбрано')
            setGenres(currentsGenres => [...currentsGenres, selectGenres]);
    };

    const selectedEndAndStartYears2 = (value: number, type: string) => {
        setStartEndYears(year => ({
            ...year,
            [type]: Number(value),
        }));
    };

    const delateSelectedGenres = (g: string) => {
        const addToGenres = genres.filter(sort => sort !== g);
        setGenres(addToGenres);
    };

    const handleOptionChange = (newValue: string | number, type?: string) => {
        if (typeof newValue === 'string') {
            genresFilter(newValue);
        } else if (typeof newValue === 'number' && type) {
            selectedEndAndStartYears2(newValue, type);
        }
    };
    const changeCurrent = (current: string) => {
        setSelectredCurrent(current);
    };

    const { userId } = useAppSelector(state => state.auth);

    useEffect(() => {
        const win = () => {
            setWindowCurrent(innerWidth);
            if (windowCurrent < 1216) setMenu(false);
        };
        win();
        addEventListener('resize', win);
        return () => {
            removeEventListener('resize', win);
        };
    }, []);

    const icons = [
        <FaInstagram size={30} />,
        <RiTelegramLine size={30} />,
        <IoLogoTiktok size={30} />,
    ];
    const urls = [
        'https://www.instagram.com/ny1bo/',
        'https://www.tiktok.com/@ny1bo?_t=8nUhjfoOaYy&_r=1',
        'https://t.me/programmingG1oup',
    ];

    const photoProfile = localStorage.getItem('photoProfileNurme');
    const showPrifile = !currentLocation.pathname.startsWith('/profile');
    const showProject = !currentLocation.pathname.startsWith('/');

    return (
        <div className={GlobalS.global}>
            <Header />
            {isVisible ? (
                <Modal
                    maxWidth={500}
                    onClick={() => setIsVisible(false)}
                    children={
                        <div className={`${GlobalS.category} `}>
                            <span className={GlobalS.sortT}>
                                Сортировать по категориям
                            </span>
                            <div className={`${GlobalS.selected} `}>
                                <div className={`${GlobalS.selectedGenres} `}>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}
                                    >
                                        Выбрано:
                                    </div>
                                    <div
                                        className={`${GlobalS.sc} scrollOpacity`}
                                    >
                                        {genres.length !== 0 ? (
                                            genres.map(genre => (
                                                <span key={genre}>
                                                    {genre}
                                                    <span
                                                        onClick={() =>
                                                            delateSelectedGenres(
                                                                genre
                                                            )
                                                        }
                                                    >
                                                        x
                                                    </span>
                                                </span>
                                            ))
                                        ) : (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    fontSize: 16,
                                                }}
                                            >
                                                (Пусто)
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={GlobalS.resetGenres}
                                    onClick={() => setGenres([])}
                                >
                                    сбросить
                                    <BiReset />
                                </div>
                            </div>
                            <form onSubmit={filterCategory}>
                                <span className={GlobalS.titleC}>Жанры:</span>
                                <div className='mtAndMtOprion'>
                                    <Select
                                        option={genresArray}
                                        selectedOption={selectedCurrent}
                                        onOptionChange={handleOptionChange}
                                        onChangeCurrent={changeCurrent}
                                    />
                                </div>
                                <div className='mtAndMtOprion'>
                                    <Select
                                        type={'start'}
                                        option={listYearsSort}
                                        selectedOption={startEndYears.start}
                                        onOptionChange={handleOptionChange}
                                    />
                                </div>
                                <div className='mtAndMtOprion'>
                                    <Select
                                        type={'end'}
                                        option={listYearsSort}
                                        selectedOption={startEndYears.end}
                                        onOptionChange={handleOptionChange}
                                    />
                                </div>
                                <div className={GlobalS.button}>
                                    <span>
                                        <CustomButton
                                            type='submit'
                                            theText='Готово'
                                        />
                                    </span>
                                </div>
                            </form>
                        </div>
                    }
                />
            ) : null}
            {menu && (
                <Modal onClick={() => setMenu(false)} maxWidth={500}>
                    <div className={`${GlobalS.menu} `}>
                        <div className={GlobalS.wrapper}>
                            <div className={GlobalS.avatar}>
                                <Link to={userId ? '/profile' : '/route-regis'}>
                                    <img
                                        src={photoProfile || unknownUser}
                                        alt='Profile User'
                                    />
                                </Link>
                            </div>
                            <Navigation />
                        </div>
                    </div>
                    <div className={`${GlobalS.i} df`}>
                        <span>
                            {icons.map((ic, i) => (
                                <a href={urls[i]} target='_blank'>
                                    {ic}
                                </a>
                            ))}
                        </span>
                    </div>
                    <div className={GlobalS.footer}>
                        Nur<span>me</span>
                    </div>
                </Modal>
            )}

            <div
                className={`${GlobalS.innerGlobalP} ${
                    showPrifile || showProject ? 'max-w' : ''
                } `}
            >
                <Routes>
                    <Route
                        path='/right-now/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route
                        path='/schedule/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/right-now' element={<StartWatchNow />} />
                    <Route path='/category' element={<CategoryPage />} />
                    <Route
                        path='/category/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/auth' element={<SignIn />} />
                    {/* Новый маршрут для авторизации */}
                    <Route path='/schedule' element={<SchedulePage />} />
                    <Route path='/profile' element={<OwnUserProfile />} />
                    <Route
                        path='/profile/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/title/:id' element={<SingleAnimeItem />} />
                    <Route path='/result' element={<Result />} />
                    <Route path='/result/:id' element={<Result />} />
                    <Route
                        path='/result/:title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/search' element={<SearchGenre />} />
                    <Route path='/route-regis' element={<MobileRegis />} />
                    <Route path='/' element={<TheProject />} />
                    <Route path='*' element={<NotFoundAPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default GlobalPage;
