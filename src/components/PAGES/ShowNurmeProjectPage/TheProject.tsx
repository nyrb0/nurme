import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../UI/Button/CustomButton';
import p from './TheProject.module.scss';
import { AnimeUpdates } from '../../../types/UpdateA';
import axios from 'axios';
import { BASEURL } from '../../../utils/baseUrls';
import AnimeItem from '../../AnimeItem/AnimeItem';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loading from '../../Warning/Loading';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { MdMusicNote } from 'react-icons/md';
import { MdMusicOff } from 'react-icons/md';
import musicSound from './Sound/9MM x LOLI SHIGURE UI.mp3';
import girlDance from './GifDance/shigure-goddess.gif';
const TheProject = () => {
    const [animeRibbon1, setAnimeRibbon1] = useState<AnimeUpdates | null>(null);
    const [animeRibbon2, setAnimeRibbon2] = useState<AnimeUpdates | null>(null);

    const [isPlay, setIsPlay] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement>(null);
    console.log(isPlay);
    useEffect(() => {
        getShowAnimeRibbon(setAnimeRibbon1, 9);
        getShowAnimeRibbon(setAnimeRibbon2, 4);
    }, []);
    const getShowAnimeRibbon = async (state: any, page: number) => {
        try {
            const changes = await axios.get(
                `${BASEURL}title/changes?limit=10&page=${page}`
            );
            state(changes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    const toggleMutedSound = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                setIsPlay(true);
                audioRef.current.play();
            } else {
                setIsPlay(false);
                audioRef.current.pause();
            }
        }
    };

    console.log(animeRibbon1);
    const repeat = [1, 3];

    const [musicIcon, setMusicIcon] = useState(false);

    const handleScroll = () => {
        const offsetTop = window.scrollY;
        const fixedPosition = 80;

        if (offsetTop > fixedPosition) {
            setMusicIcon(true);
        } else {
            setMusicIcon(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    if (loading) {
        return (
            <div className='warning'>
                <Loading />
            </div>
        );
    }

    return (
        <div className={p.project}>
            <div
                onClick={toggleMutedSound}
                className={p.music}
                style={{
                    top: musicIcon ? '30px' : '127px',
                    transition: 'top 0.15s ease-in-out',
                }}
            >
                {isPlay ? <MdMusicNote size={30} /> : <MdMusicOff size={30} />}
                <audio ref={audioRef} autoPlay loop>
                    <source src={musicSound} />
                </audio>
            </div>
            <div className={p.wrapper}>
                <motion.div
                    className={p.welcome}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Салам! Добро пожаловать <br /> в наш проект{' '}
                    <span>
                        Nur<span>me</span>
                    </span>{' '}
                </motion.div>
                <motion.div
                    className={p.watchRightNow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span>
                        <Link to={'/right-now'}>
                            <CustomButton
                                theText='Смотреть сейчас'
                                type='button'
                                isActive={false}
                            />
                        </Link>
                    </span>
                    {isPlay && (
                        <motion.div
                            className={p.danceGif}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <img src={girlDance} alt='9MM x LOLI SHIGURE UI' />
                        </motion.div>
                    )}
                </motion.div>
                <motion.div
                    className={p.arrow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                >
                    <MdKeyboardDoubleArrowDown size={70} />
                </motion.div>
                <motion.div
                    className={p.interesting}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                >
                    Интересные аниме:
                </motion.div>
                <motion.div
                    className={p.anims1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    {repeat.map(r => (
                        <div className={p.ribbon1} key={r}>
                            {animeRibbon1?.list.map(c => (
                                <span key={c.id}>
                                    <AnimeItem items={c} />
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className={p.anims2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 }}
                >
                    {repeat.map(r => (
                        <div className={p.ribbon2} key={r}>
                            {animeRibbon2?.list.map(c => (
                                <span key={c.id}>
                                    <AnimeItem items={c} />
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TheProject;