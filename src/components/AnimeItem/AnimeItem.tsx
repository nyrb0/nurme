import { FC } from 'react';
import animeS from './AnimeItem.module.scss';
import { Link } from 'react-router-dom';
import { THE_BASE_URL } from '../../utils/baseUrls';
import { Title } from '../../types/UpdateA';

interface AnimeItemProps {
    items: Title;
}

const AnimeItem: FC<AnimeItemProps> = ({ items }) => {
    return (
        <>
            <div className={animeS.frame}>
                <div>
                    <Link to={`title/${items.id}`} className={animeS.picture}>
                        <img
                            src={`${THE_BASE_URL}${items?.posters?.original?.url}`}
                            alt='img anime'
                        />
                    </Link>
                    <div className={animeS.titles}>{items?.names.ru}</div>
                    <div className={animeS.gen}>Жанры:</div>

                    <div className={`${animeS.genres} df`}>
                        {items.genres?.map(genre => (
                            <div key={genre} className={animeS.genre}>
                                {genre}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnimeItem;
