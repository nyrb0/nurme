import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTheTitleQuery } from '../../API/animeData';
import singleS from './SingleAnime.module.scss';
import { THE_BASE_URL } from '../../utils/baseUrls';
import { IoIosHome } from 'react-icons/io';
import ThePath from '../../ThePath/ThePath';

interface SingleAnimeItemProps {}

const SingleAnimeItem: FC<SingleAnimeItemProps> = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: single,
        isLoading,
        isError,
    } = useGetTheTitleQuery({ id: id || '' });
    console.log(single);

    if (isLoading) {
        return <>Loading...</>;
    }
    if (isError) {
        return <>error!</>;
    }
    const roadMap = [
        {
            toPathBack: '/',
            nameToPath: 'Домой',
        },
        {
            toPathBack: '',
            nameToPath: `${single?.names.en}`,
        },
    ];

    return (
        <section>
            <ThePath path={roadMap} />
            <div className={`${singleS.partContent} df`}>
                <img
                    width={405}
                    height={572}
                    src={`${THE_BASE_URL}${single?.posters?.original?.url}`}
                    alt='singleAnime'
                    className={singleS.posters}
                />
                <div className={`${singleS.aboutSingle}`}>
                    <div className={singleS.names}>
                        <div className={singleS.ru}>{single?.names.ru}</div>
                        <div className={singleS.en}>{single?.names.en}</div>
                    </div>
                    <div className={singleS.desc}>{single?.description}</div>
                    <div className={singleS.moreInformation}>
                        <div className={`${singleS.genres} df`}>
                            Жанры:
                            <div className={singleS.inGen}>
                                {single?.genres.map(genres => (
                                    <span
                                        style={{ marginRight: 5 }}
                                        key={genres}
                                    >
                                        {genres}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={singleS.status}>
                            Статус: <span>{single?.status.string}</span>
                        </div>
                        <div className={singleS.type}>
                            Типы:{' '}
                            <span>{single?.type.string.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleAnimeItem;
