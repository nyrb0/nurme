import { FC, useEffect, useState } from 'react';
import rightNowS from './StartWatchNow.module.scss';
import { useGetUpdatesAnimeQuery } from '../../API/animeData';
import ToWatch from '../ToWatch/ToWatch';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { Title } from '../../types/UpdateA';
import Loading from '../Warning/Loading';

const StartWatchNow: FC = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(16);
    const [animeList, setAnimeList] = useState<Title[]>([]);
    const { data, isLoading, isFetching } = useGetUpdatesAnimeQuery({
        page,
        limit,
    });
    console.log(data);

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

    const moreItem = () => {
        setPage(thePage => thePage + 1);
    };

    if (isLoading && page === 1) {
        return (
            <div className={rightNowS.warning}>
                <Loading />;
            </div>
        );
    }

    return (
        <div className={`${rightNowS.content} fade-in`}>
            <div className={rightNowS.re}>
                <ToWatch watch={animeList} />
            </div>

            <div className={rightNowS.view}>
                <button onClick={moreItem} disabled={isFetching}>
                    Показать еще
                    <FaLongArrowAltDown />
                </button>
            </div>
        </div>
    );
};

export default StartWatchNow;
