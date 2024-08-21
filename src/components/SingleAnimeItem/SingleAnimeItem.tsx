import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    useGetResultCategoryQuery,
    useGetTheTitleQuery,
} from '../../API/animeData';
import singleS from './SingleAnime.module.scss';
import { THE_BASE_URL, THE_VIDEO } from '../../utils/baseUrls';
import ThePath from '../../ThePath/ThePath';
import ReactPlayer from 'react-player';
import Error from '../Warning/Error';
import Loading from '../Warning/Loading';
import AnimeItem from '../AnimeItem/AnimeItem';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { useAppSelector } from '../../hooks/redux';
import {
    useAddToFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetToFavoritesQuery,
} from '../../API/user/UserData';
import Ratings from '../UI/Rating/Ratings';
import { skipToken } from '@reduxjs/toolkit/query';
import Modal from '../Modal/Modal';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';
import l from '../icons/pngwing.com.png';
import { MdOutlineFullscreenExit } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
interface SingleAnimeItemProps {}
const SingleAnimeItem: FC<SingleAnimeItemProps> = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: single,
        isLoading,
        isError,
        isFetching,
    } = useGetTheTitleQuery({ id: id || '' });
    const [stateRating, setStateRating] = useState<number>(
        single?.in_favorites ?? 0
    );
    const [warningFavorite, setWarningFavorite] = useState(false);
    const [normalizedValue, setNormalizedValue] = useState<number>(
        normalize(stateRating, 0, 2042, 0, 10)
    );
    const [visibleSeriesLimit, setVisibleSeriesLimit] = useState<number>(50);
    const episodeLength = single?.player.list.length;
    const [awaitLoading, setAwaitLoading] = useState(true);

    const [isScrolledLeft, setIsScrolledLeft] = useState(true);
    const [isScrolledRight, setIsScrolledRight] = useState(false);
    const [isFullDisplay, setIsFullDisplay] = useState(false);
    const { userId: session } = useAppSelector(state => state.auth);

    const [deleteFavorite] = useDeleteFavoriteMutation();
    const genres = single?.genres;
    const { data: similar, isLoading: loadingSimilar } =
        useGetResultCategoryQuery({ genres });

    const [theEpisode, setTheEpisode] = useState<string>('1');
    const navigate = useNavigate();
    const [quality, setQuality] = useState('');

    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef<null | ReactPlayer>(null);

    useEffect(() => {
        setTheEpisode(
            single?.player.episodes && single?.player.episodes.first
                ? single.player.episodes.first.toString()
                : single?.player.list[0]?.episode
                ? single?.player.list[0]?.episode.toString()
                : '0'
        );
        if (single?.player.list && single.player.list.length > 0) {
            const firstEpisodeQualities = single.player.list[0].hls;
            if (firstEpisodeQualities.sd !== null) {
                setQuality('sd');
            } else if (firstEpisodeQualities.hd !== null) {
                setQuality('hd');
            } else if (firstEpisodeQualities.fhd !== null) {
                setQuality('fhd');
            }
        }
    }, [single]);

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

    useEffect(() => {
        const scrollToHead = (getId: string): void => {
            const el: HTMLElement | null = document.getElementById(getId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };
        scrollToHead('head');
    }, [id]);

    const title_id = single?.id;
    const [addToFavorite] = useAddToFavoriteMutation();

    const { data: addedFa, refetch } = useGetToFavoritesQuery(
        session ? { session } : skipToken
    );
    const currentLocation = useLocation();

    const showPrifile = !currentLocation.pathname.startsWith('/profile');

    const handleSimilarAnimeClick = (id: string) => {
        navigate(`/right-now/title/${id}`);
    };

    const searchFavorite = addedFa?.list.some(f => f.id === single?.id);

    const delateAndAddFavorite = async () => {
        let searchFavorite = addedFa?.list.some(f => f.id === single?.id);
        if (!session) {
            setWarningFavorite(true);
        } else if (searchFavorite) {
            await deleteFavorite({ session, title_id });
            await refetch();
            searchFavorite = addedFa?.list.some(f => f.id === single?.id);
        } else if (!searchFavorite) {
            await addToFavorite({ session, title_id });
            await refetch();
        }
    };

    function normalize(
        value: number,
        min: number,
        max: number,
        newMin: number,
        newMax: number
    ): number {
        return ((value - min) * (newMax - newMin)) / (max - min) + newMin;
    }
    // react players
    const skipIntroVideo = (s: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(s);
        }
    };
    //////////////////////////////////////

    const handleProgress = (
        player: { playedSeconds: number },
        episodeEndSecodIntro: number[]
    ) => {
        if (player.playedSeconds < episodeEndSecodIntro[1] + 5) {
            setCurrentTime(player.playedSeconds);
        }
    };

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setIsScrolledLeft(scrollLeft <= 0);
            setIsScrolledRight(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setAwaitLoading(false);
            }, 2000);
        }
    }, [isLoading]);

    if (awaitLoading) {
        return (
            <div className={'warning'}>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='warning'>
                <Error children={<div>Ошибка!</div>} comeBack='/right-now' />
            </div>
        );
    }
    return (
        <section className={`fade-in ${showPrifile ? '' : 'max-w'}`}>
            <ThePath path={roadMap} />
            <div className={`${singleS.partContent} `}>
                <div className={singleS.photo}>
                    <div className={singleS.hidden}>
                        <div className={singleS.wrapper}>
                            <div
                                className={singleS.posters}
                                style={{
                                    backgroundImage: `url(${THE_BASE_URL}${single?.id}.webp)`,
                                }}
                            ></div>
                        </div>
                        <span onClick={delateAndAddFavorite}>
                            {searchFavorite ? (
                                <MdFavorite size={40} style={{ fill: 'red' }} />
                            ) : (
                                <MdFavoriteBorder
                                    size={40}
                                    style={{ fill: 'red' }}
                                />
                            )}
                        </span>
                        <div
                            className={singleS.fulldisplay}
                            onClick={() => setIsFullDisplay(true)}
                        >
                            <MdOutlineFullscreenExit size={25} />
                        </div>
                    </div>

                    {isFullDisplay && (
                        <Modal
                            onClick={() => setIsFullDisplay(false)}
                            maxWidth={300}
                        >
                            <div className={singleS.img}>
                                <div className={singleS.fullDis}>
                                    <img
                                        src={`${THE_BASE_URL}${single?.id}.webp`}
                                        alt={single?.names.ru}
                                    />
                                </div>
                                <span>{single?.names.ru}</span>
                            </div>
                        </Modal>
                    )}

                    {warningFavorite ? (
                        <Modal
                            onClick={() => setWarningFavorite(false)}
                            isVisibleX={false}
                            maxWidth={500}
                        >
                            <div className={singleS.warningFavorite}>
                                <div className={singleS.wrapper}>
                                    <h1>Предупреждение!</h1>
                                    <div>
                                        Упс,вы должны сперва зарегистрироваться
                                    </div>
                                </div>
                                <div className={singleS.close}>
                                    <span
                                        onClick={() =>
                                            setWarningFavorite(false)
                                        }
                                    >
                                        закрыть
                                    </span>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </div>
                <div className={`${singleS.aboutSingle}`}>
                    <div className={singleS.names}>
                        <div className={singleS.ru}>{single?.names.ru}</div>
                        <div className={singleS.en}>{single?.names.en}</div>
                    </div>
                    <div className={singleS.desc}>{single?.description}</div>
                    <div className={singleS.moreInformation}>
                        <div className={`${singleS.genres} df`}>
                            Жанры:
                            <>
                                {single?.genres.map(genres => (
                                    <span
                                        style={{ marginRight: 5 }}
                                        key={genres}
                                        className={singleS.inGen}
                                    >
                                        {genres}
                                    </span>
                                ))}
                            </>
                        </div>
                        <div className={singleS.status}>
                            Статус: <span>{single?.status.string}</span>
                        </div>
                        <div className={singleS.type}>
                            Типы:{' '}
                            <span>
                                {single?.type.string?.toUpperCase() ||
                                    'отсутсвует'}
                            </span>
                        </div>
                        <div className={singleS.conti}>
                            Продол: <span>{single?.type.full_string}</span>
                        </div>
                        <div>
                            Год: <span>{single?.season.year}</span>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Ratings normalizedValue={normalizedValue} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={singleS.descBottom}>{single?.description}</div>
            {single?.player.list.length ? (
                <>
                    <div className={singleS.videoPlayer}>
                        <div className={singleS.options}>
                            <span className={singleS.episode}>Эпизоды:</span>
                            <select
                                value={theEpisode}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setTheEpisode(e.target.value)
                                }
                                className={singleS.selected}
                            >
                                {single?.player.list.map(episode => (
                                    <option
                                        key={episode.episode}
                                        value={episode.episode}
                                    >
                                        {episode.episode} серия
                                    </option>
                                ))}
                            </select>
                            <span className={singleS.quality}>Качество:</span>
                            <select
                                value={quality}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setQuality(e.target.value)
                                }
                                className={singleS.selected}
                            >
                                <option value='fhd'>1080р</option>
                                <option value='hd'>720р</option>
                                <option value='sd'>480р</option>
                            </select>
                        </div>
                        {single?.player.list.map(episode =>
                            episode.episode === Number(theEpisode) ? (
                                <div>
                                    <ReactPlayer
                                        ref={playerRef}
                                        width='100%'
                                        height='100%'
                                        key={episode.episode}
                                        onProgress={progress =>
                                            handleProgress(
                                                progress,
                                                episode.skips.opening
                                            )
                                        }
                                        controls
                                        url={`${THE_VIDEO}${
                                            quality === 'sd'
                                                ? episode.hls.sd
                                                : quality === 'hd'
                                                ? episode.hls.hd
                                                : episode.hls.fhd
                                        }`}
                                    />
                                    <div className='dfc'>
                                        <button
                                            className={singleS.skipsIntro}
                                            onClick={() =>
                                                skipIntroVideo(
                                                    episode.skips.opening[1]
                                                )
                                            }
                                            style={{
                                                visibility:
                                                    currentTime >=
                                                        episode.skips
                                                            .opening[0] &&
                                                    currentTime <=
                                                        episode.skips.opening[1]
                                                        ? 'visible'
                                                        : 'hidden',
                                            }}
                                        >
                                            Пропустить заставку
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div key={episode.episode}></div>
                            )
                        )}
                    </div>

                    <div className={`${singleS.seriesBlocks} `}>
                        <div className={singleS.listEpisode}>Список серии:</div>
                        <ul>
                            {single?.player.list
                                .slice(0, visibleSeriesLimit)
                                .map(ep => (
                                    <li
                                        key={ep.episode}
                                        onClick={() =>
                                            setTheEpisode(ep.episode.toString())
                                        }
                                        style={{
                                            backgroundColor:
                                                ep.episode.toString() ===
                                                theEpisode
                                                    ? 'red'
                                                    : '',
                                        }}
                                    >
                                        {ep.episode}
                                    </li>
                                ))}
                        </ul>
                        {episodeLength &&
                            visibleSeriesLimit < episodeLength && (
                                <div className={singleS.seriesDown}>
                                    <div>
                                        Есть еще{' '}
                                        {single?.player.list.length
                                            ? single?.player.list.length -
                                              visibleSeriesLimit
                                            : ''}
                                        -серии
                                    </div>
                                    <IoIosArrowDown
                                        className={singleS.isLeft}
                                        size={50}
                                        style={{
                                            fill: 'red',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            setVisibleSeriesLimit(
                                                prevState => prevState + 20
                                            )
                                        }
                                    />
                                </div>
                            )}
                    </div>
                </>
            ) : null}

            <div className={singleS.similars}>
                <div className={singleS.similarText}>Похожие</div>
                <div className={singleS.simBox}>
                    {loadingSimilar ? (
                        <div className={singleS.similarLoading}>
                            <Loading />
                        </div>
                    ) : similar?.list ? (
                        <div className={singleS.scroll}>
                            <FaArrowCircleLeft
                                className={singleS.left}
                                onClick={scrollLeft}
                                size={40}
                                style={{
                                    fill: 'red',
                                    opacity: isScrolledLeft ? 0.7 : 1,
                                }}
                            ></FaArrowCircleLeft>
                            <div
                                className={singleS.innerScroll}
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                            >
                                {similar?.list.map(sim => (
                                    <div
                                        key={sim.id}
                                        className={singleS.similar}
                                        onClick={() =>
                                            handleSimilarAnimeClick(
                                                sim.id.toString()
                                            )
                                        }
                                    >
                                        <AnimeItem items={sim} />
                                    </div>
                                ))}
                            </div>
                            <FaArrowCircleRight
                                style={{
                                    fill: 'red',
                                    opacity: isScrolledRight ? 0.7 : 1,
                                }}
                                className={singleS.right}
                                onClick={scrollRight}
                                size={40}
                            ></FaArrowCircleRight>
                        </div>
                    ) : (
                        <div className={`${singleS.emptySimilar} dfc`}>
                            <div className={singleS.empty}>
                                <span>
                                    <div>(Пусто)</div>
                                </span>
                                <img src={l} alt='L' />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SingleAnimeItem;
