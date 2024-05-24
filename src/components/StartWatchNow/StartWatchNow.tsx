import { FC, useState } from 'react';
import toWatch from '../icons/watchrightnow.jpg';
import rightNowS from './StartWatchNow.module.scss';
import { useGetUpdatesAnimeQuery } from '../../API/animeData';
import ToWatch from '../ToWatch/ToWatch';
const StartWatchNow: FC = () => {
    const [page, setPages] = useState(7);
    const [limit, setLimit] = useState(50);

    const { data, isLoading } = useGetUpdatesAnimeQuery({
        page,
        limit,
    });
    ``;
    console.log(data);

    if (isLoading) {
        return <div></div>;
    }
    return (
        <div className={rightNowS.content}>
            {/* <img width='100%' src={toWatch} alt='anime' /> */}
            <div className={rightNowS.re}>
                <ToWatch watch={data} />
            </div>
        </div>
    );
};

export default StartWatchNow;
