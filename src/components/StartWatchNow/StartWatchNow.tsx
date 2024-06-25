import { FC, useEffect, useState, useCallback } from 'react';
import rightNowS from './StartWatchNow.module.scss';
import { useGetUpdatesAnimeQuery } from '../../API/animeData';
import ToWatch from '../SingleAnimeItem/ToWatch/ToWatch';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { Title } from '../../types/UpdateA';
import Loading from '../Warning/Loading';
import Error from '../Warning/Error';

const StartWatchNow: FC = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [animeList, setAnimeList] = useState<Title[]>([]);
    const { data, isLoading, isError, isFetching } = useGetUpdatesAnimeQuery({
        page,
        limit,
    });

    useEffect(() => {
        if (data) {
            setAnimeList(prevList => {
                const newItems = data.list.filter(
                    newItem =>
                        !prevList.some(
                            existingItem => existingItem.id === newItem.id
                        )
                );
                return [...prevList, ...newItems];
            });
        }
    }, [data]);

    const moreItem = useCallback(() => {
        setPage(thePage => thePage + 1);
    }, []);

    if (isLoading && page === 1) {
        return (
            <div className={rightNowS.warning}>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className={rightNowS.warning}>
                <Error>
                    <>
                        Упс, произошла ошибка
                        <div>Попробуйте перезагрузить</div>
                    </>
                </Error>
            </div>
        );
    }

    return (
        <div className={`${rightNowS.content} fade-in`}>
            <div className={rightNowS.fullContent}>
                <div className={`${rightNowS.re} column`}>
                    <ToWatch watch={animeList} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isFetching ? (
                    <Loading />
                ) : (
                    <div className={rightNowS.view}>
                        <button onClick={moreItem} disabled={isFetching}>
                            Показать еще
                            <FaLongArrowAltDown />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartWatchNow;
