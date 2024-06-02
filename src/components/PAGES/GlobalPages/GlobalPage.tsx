import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import Header from '../../Header/Header';
import GlobalS from './GlobalPage.module.scss';
import StartWatchNow from '../../StartWatchNow/StartWatchNow';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SingleAnimeItem from '../../SingleAnimeItem/SingleAnimeItem';
import Footer from '../../Footer/Footer';
import NotFoundAPage from '../NotFoundAPage/NotFoundAPage';
import CategoryPage from '../Category/CategoryPage';
import Modal from '../../Modal/Modal';
import { useGetGenresQuery } from '../../../API/animeData';
import CustomButton from '../../UI/Button/CustomButton';
import { isVisibleContext } from '../../../Context/Visible';
const GlobalPage: FC = () => {
    const { data: genresArray } = useGetGenresQuery({});
    const contextVis = useContext(isVisibleContext);
    if (!contextVis) {
        throw new Error('context not have');
    }
    const { isVisible, setIsVisible } = contextVis;
    const currentDateYear = new Date().getFullYear();
    const startYears = 1995;
    const listYearsSort = [];
    for (let i = startYears; i <= currentDateYear; i++) {
        listYearsSort.push(i);
    }
    const [genres, setGenres] = useState<string | null | undefined>('Комедия');
    const [year, setYears] = useState<string | null>('2015');

    const navigate = useNavigate();
    const filterCategory = (e: FormEvent) => {
        e.preventDefault();
        setIsVisible(false);
        navigate(`/category?year=${year}&genre=${genres}`);
    };

    return (
        <div className={GlobalS.global}>
            <Header />
            {isVisible ? (
                <Modal
                    onClick={() => setIsVisible(false)}
                    children={
                        <div className={`${GlobalS.category} dfd`}>
                            <span className={GlobalS.sortT}>
                                Сортировать по котогориям
                            </span>
                            <form onSubmit={filterCategory}>
                                <select
                                    className={GlobalS.category}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) => setGenres(e.target.value)}
                                >
                                    {genresArray?.map(genre => (
                                        <option value={genre} key={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className={GlobalS.category}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) => setYears(e.target.value.toString())}
                                >
                                    {listYearsSort.map(years => (
                                        <option value={years} key={years}>
                                            {years}г
                                        </option>
                                    ))}
                                </select>
                                <div className={GlobalS.button}>
                                    <CustomButton
                                        type='submit'
                                        theText='Готово'
                                    />
                                </div>
                            </form>
                        </div>
                    }
                />
            ) : null}
            <div className={GlobalS.innerGlobalP}>
                <Routes>
                    <Route
                        path='/right-now/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/right-now' element={<StartWatchNow />} />
                    <Route path='/category' element={<CategoryPage />} />
                    <Route path='*' element={<NotFoundAPage />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

export default GlobalPage;
