import { FC, useState } from 'react';
import animeS from './AnimeItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { THE_BASE_URL } from '../../utils/baseUrls';
import { Title } from '../../types/UpdateA';
import { List } from '../../types/SchuduleType';
interface AnimeItemProps {
    items: Title | List;
}

const AnimeItem: FC<AnimeItemProps> = ({ items }) => {
    const nav = useNavigate();
    const go = (g: string) => {
        if (g) {
            nav(`/search?genre=${g}`);
        }
    };
    return (
        <>
            <div className={animeS.frame}>
                <div>
                    <Link to={`title/${items.id}`} className={animeS.picture}>
                        <div className={animeS.view}>
                            <img
                                src={`${THE_BASE_URL}${items.id}.webp`}
                                alt={`${items.names}`}
                            />
                            <div className={animeS.episode}>
                                {items.player.episodes.last
                                    ? items.player.episodes.last === 1
                                        ? `${items.player.episodes.last} серия`
                                        : `${items.player.episodes.last} серии`
                                    : 'Пока не вышло'}
                            </div>
                        </div>
                    </Link>
                    <div className={animeS.titles}>{items?.names.ru}</div>
                    <div className={animeS.gen}>Жанры:</div>
                    <div className={`${animeS.genres} df`}>
                        {items.genres?.map(genre => (
                            <div
                                key={genre}
                                className={animeS.genre}
                                onClick={() => go(genre)}
                            >
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
