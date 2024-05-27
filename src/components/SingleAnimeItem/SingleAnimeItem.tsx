import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetTheTitleQuery } from '../../API/animeData';
import singleS from './SingleAnime.module.scss';
import { THE_BASE_URL, THE_VIDEO } from '../../utils/baseUrls';
import { IoIosHome } from 'react-icons/io';
import ThePath from '../../ThePath/ThePath';
import ReactPlayer from 'react-player';
import Error from '../Warning/Error';
import Loading from '../Warning/Loading';

interface SingleAnimeItemProps {}

const SingleAnimeItem: FC<SingleAnimeItemProps> = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: single,
        isLoading,
        isError,
    } = useGetTheTitleQuery({ id: id || '' });
    console.log(single);

    const [theEpisode, setTheEpisode] = useState<string>('1');
    const [quality, setQueality] = useState('sd');
    const roadMap = [
        {
            toPathBack: '/right-now',
            nameToPath: 'Домой',
        },
        {
            toPathBack: '',
            nameToPath: `${single?.names.en}`,
        },
    ];

    if (isLoading) {
        return (
            <div className={singleS.warning}>
                <Loading />
            </div>
        );
    }
    if (isError) {
        return (
            <>
                <Error />
            </>
        );
    }

    return (
        <section className='fade-in'>
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
                        <div className={singleS.conti}>
                            Продолжительность:{' '}
                            <span>{single?.type.full_string}</span>
                        </div>
                        <div>
                            Год: <span>{single?.season.year}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={singleS.videoPlayer}>
                <span className={singleS.episode}>Эпизоды:</span>
                <select
                    value={theEpisode}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setTheEpisode(e.target.value)
                    }
                    className={singleS.selected}
                >
                    {single?.player.list.map((episode, index) => (
                        <option key={index} value={episode.episode}>
                            {episode.episode} серия
                        </option>
                    ))}
                </select>
                <span className={singleS.quality}>Качество:</span>
                <select
                    value={quality}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setQueality(e.target.value)
                    }
                    className={singleS.selected}
                >
                    <option value='fhd'>1080р</option>
                    <option value='hd'>720р</option>
                    <option value='sd'>480р</option>
                </select>

                {single?.player.list.map(episode =>
                    episode.episode === Number(theEpisode) ? (
                        <ReactPlayer
                            width='100%'
                            height='100%'
                            key={episode.episode}
                            controls
                            url={`${THE_VIDEO}${
                                quality === 'hd'
                                    ? episode.hls.hd
                                    : quality === 'fhd'
                                    ? episode.hls.fhd
                                    : episode.hls.sd
                            }`}
                        />
                    ) : (
                        <div key={episode.episode}></div>
                    )
                )}
            </div>
        </section>
    );
};

export default SingleAnimeItem;
