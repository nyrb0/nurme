import { FC } from 'react'
import { AnimeUpdates } from '../../types/UpdateA'
import AnimeItem from '../AnimeItem/AnimeItem'
interface ToWatchProps {
    watch: AnimeUpdates | undefined
}

const ToWatch:FC<ToWatchProps> = ({watch}) => {
    return (
        <>
            {watch?.list.map(itemsAnimes=>(
                <AnimeItem items={itemsAnimes} key={itemsAnimes.id}/>
            ))}
        </>
    )
}

export default ToWatch
