import { FC } from 'react'
import animeS from './AnimeItem.module.scss'
import { AnimeUpdates, Title } from '../../types/UpdateA'
import { Link } from 'react-router-dom'
import { BASEURL, THE_BASE_URL } from '../../utils/baseUrls'


interface AnimeItemProps {
    items:Title
}

const AnimeItem:FC<AnimeItemProps> = (
    {items}
) => {
    return (
        <>
            <div className={animeS.frame}>
                <div>
                <Link to={`title/${items.id}`}>
                    <img width={254} height={348} 
                    src={`${THE_BASE_URL}${items?.posters?.original?.url}`} alt="img anime"
                    />
                </Link>
                    Жанр:
                    <div className={`${animeS.genres} df`}>
                        {items.genres?.map(genre=>(
                            <div key={genre} className={animeS.genre}>
                                {genre}
                            </div>
                        ))}
                    </div>
                    <div className={animeS.titles}>
                        {items?.names.ru}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnimeItem
