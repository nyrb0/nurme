import { FC } from 'react';
import Header from '../../Header/Header';
import GlobalS from './GlobalPage.module.scss';
import StartWatchNow from '../../StartWatchNow/StartWatchNow';
import { Route, Routes } from 'react-router-dom';
import SingleAnimeItem from '../../SingleAnimeItem/SingleAnimeItem';
import Footer from '../../Footer/Footer';
import NotFoundAPage from '../NotFoundAPage/NotFoundAPage';
const GlobalPage: FC = () => {
    return (
        <div className={GlobalS.global}>
            <Header />
            <div className={GlobalS.innerGlobalP}>
                <Routes>
                    <Route
                        path='/right-now/title/:id'
                        element={<SingleAnimeItem />}
                    />
                    <Route path='/right-now' element={<StartWatchNow />} />
                    <Route path='*' element={<NotFoundAPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default GlobalPage;
