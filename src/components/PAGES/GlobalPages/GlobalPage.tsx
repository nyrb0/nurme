import { FC } from 'react'
import Header from '../../Header/Header'
import GlobalS from './GlobalPage.module.scss'
import StartWatchNow from '../../StartWatchNow/StartWatchNow'
import { Route, Routes } from 'react-router-dom'
import SingleAnimeItem from '../../SingleAnimeItem/SingleAnimeItem'
const GlobalPage:FC = () => {
    return (
        <div className={GlobalS.global}>
            <Header/>
            <div className={GlobalS.innerGlobalP}>
                <Routes>
                    <Route path='/right-now/title/:id' element={<SingleAnimeItem/>}/>
                    <Route path='/right-now' element={<StartWatchNow/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default GlobalPage
