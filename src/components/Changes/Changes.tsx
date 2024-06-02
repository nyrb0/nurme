import React from 'react';
import { useChangesQuery } from '../../API/animeData';
import changesS from './Changes.module.scss';
import { THE_BASE_URL } from '../../utils/baseUrls';
import { Link } from 'react-router-dom';
const Changes = () => {
    const { data } = useChangesQuery({});
    console.log(data?.list[0]);

    return (
        <div className={changesS.wrapper}>
            {data?.list.map(dat => (
                <Link to={`/right-now/title/${dat.id}`} key={dat.id}>
                    <div className={changesS.inner}>
                        <div
                            style={{
                                backgroundImage: `url(${THE_BASE_URL}${dat?.posters?.original?.url})`,
                            }}
                            className={changesS.image}
                        ></div>
                        <div className={changesS.name}>{dat.names.ru}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Changes;
