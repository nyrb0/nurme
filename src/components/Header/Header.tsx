// src/components/Header/Header.tsx
import React, { ChangeEvent, FC, useState } from 'react';
import headerS from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { useGetResultSearchQuery } from '../../API/animeData';
import { Title } from '../../types/UpdateA';
import { THE_BASE_URL } from '../../utils/baseUrls';
import notResultImage from '../icons/pngwing.com.png';
const Header: FC = () => {
    const [title, setTitle] = useState<string>('');
    const { data: resultSearch, isFetching } = useGetResultSearchQuery({
        title,
    });

    return (
        <header id='head' className={headerS.header}>
            <div className={headerS.innerHeader}>
                <div className={headerS.namesAnimeCinema}>
                    <Link to={'/right-now'}>
                        Nur<span>Bo</span>
                    </Link>
                </div>
                <div className={headerS.searchAndUser}>
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
                                                width={70}
                                                height={70}
                                                src={`${THE_BASE_URL}${resultS.posters.original.url}`}
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
                            </ul>
                        </div>
                    ) : isFetching ? (
                        <div className={headerS.resultSer}>
                            <li className='dfc'>Загрузка...</li>
                        </div>
                    ) : resultSearch?.list.length === 0 && title.length > 0 ? (
                        <div className={headerS.resultSer}>
                            <ul>
                                <div className={headerS.notResult}>
                                    <img
                                        width={300}
                                        src={`${notResultImage}`}
                                        alt='fndbg'
                                    />
                                    <li style={{ textAlign: 'center' }}>
                                        Нету результатов
                                    </li>
                                </div>
                            </ul>
                        </div>
                    ) : null}
                </div>
                <div className={headerS.menu}>
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
