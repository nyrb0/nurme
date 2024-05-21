import { FC, useState } from "react"
import toWatch from '../icons/watchrightnow.jpg'
import rightNowS from './StartWatchNow.module.scss'
import { useSelector } from "react-redux"
import { useAppSelectorA } from "../../hooks/redux"
import { useGetUpdatesAnimeQuery } from "../../API/animeData"
import AnimeItem from "../AnimeItem/AnimeItem"
import { Title } from "../../types/UpdateA"
import ToWatch from "../ToWatch/ToWatch"
const StartWatchNow:FC = () => {

    const [page,setPages] = useState(2)
    const [limit,setLimit] = useState(4)
    // const {data,error,isLoading} = useAppSelectorA()
    // console.log(data)
    const {data,isError,isLoading} = useGetUpdatesAnimeQuery({page,limit})
    console.log(data)
    return (
        <div className={rightNowS.content}>
        <img width='100%' src={toWatch} alt="anime" />
            <div className={rightNowS.re}>
                <ToWatch watch={data}/>
            </div>
        </div>
    )
}

export default StartWatchNow
