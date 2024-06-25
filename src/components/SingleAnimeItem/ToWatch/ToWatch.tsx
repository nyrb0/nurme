import { FC } from 'react';
import { AnimeUpdates, Title } from '../../../types/UpdateA';
import AnimeItem from '../../AnimeItem/AnimeItem';
interface ToWatchProps {
    watch: Title[] | undefined;
}

const ToWatch: FC<ToWatchProps> = ({ watch }) => {
    return (
        <>
            {watch?.map(itemsAnimes => (
                <AnimeItem items={itemsAnimes} key={itemsAnimes.id} />
            ))}
        </>
    );
};

export default ToWatch;
