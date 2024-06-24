import { useRef } from 'react';
import { useSheduleListQuery } from '../../../API/animeData';
import AnimeItem from '../../AnimeItem/AnimeItem';
import Error from '../../Warning/Error';
import Loading from '../../Warning/Loading';
import scheduleS from './Schedule.module.scss';
import useScroll from '../../../hooks/useScroll';

import { MdKeyboardDoubleArrowLeft as FaArrowCircleLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight as FaArrowCircleRight } from 'react-icons/md';

const SchedulePage = () => {
    const { data: schedule, isLoading, isError } = useSheduleListQuery({});
    const day1 = useRef<HTMLDivElement | null>(null);
    const day2 = useRef<HTMLDivElement | null>(null);
    const day3 = useRef<HTMLDivElement | null>(null);
    const day4 = useRef<HTMLDivElement | null>(null);
    const day5 = useRef<HTMLDivElement | null>(null);
    const day6 = useRef<HTMLDivElement | null>(null);
    const day7 = useRef<HTMLDivElement | null>(null);

    const {
        leftScroll: leftScroll1,
        rightScroll: rightScroll1,
        toScrollLeft: toScrollLeft1,
        toScrollRight: toScrollRight1,
        handleScroll: handleScroll1,
    } = useScroll({ refs: day1 });
    const {
        leftScroll: leftScroll2,
        rightScroll: rightScroll2,
        toScrollLeft: toScrollLeft2,
        toScrollRight: toScrollRight2,
        handleScroll: handleScroll2,
    } = useScroll({ refs: day2 });
    const {
        leftScroll: leftScroll3,
        rightScroll: rightScroll3,
        toScrollLeft: toScrollLeft3,
        toScrollRight: toScrollRight3,
        handleScroll: handleScroll3,
    } = useScroll({ refs: day3 });
    const {
        leftScroll: leftScroll4,
        rightScroll: rightScroll4,
        toScrollLeft: toScrollLeft4,
        toScrollRight: toScrollRight4,
        handleScroll: handleScroll4,
    } = useScroll({ refs: day4 });
    const {
        leftScroll: leftScroll5,
        rightScroll: rightScroll5,
        toScrollLeft: toScrollLeft5,
        toScrollRight: toScrollRight5,
        handleScroll: handleScroll5,
    } = useScroll({ refs: day5 });
    const {
        leftScroll: leftScroll6,
        rightScroll: rightScroll6,
        toScrollLeft: toScrollLeft6,
        toScrollRight: toScrollRight6,
        handleScroll: handleScroll6,
    } = useScroll({ refs: day6 });
    const {
        leftScroll: leftScroll7,
        rightScroll: rightScroll7,
        toScrollLeft: toScrollLeft7,
        toScrollRight: toScrollRight7,
        handleScroll: handleScroll7,
    } = useScroll({ refs: day7 });

    const dayNames = [
        'Понидельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];
    // console.log(schedule);
    if (isLoading) {
        return (
            <div className='loading'>
                <Loading />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='loading fade-in'>
                <Error comeBack='/right-now'>
                    Упс,произашла ошибка в <p>{'разделе <расписание>'}</p>
                </Error>
            </div>
        );
    }

    return (
        <div className='fade-in '>
            <div className={`${scheduleS.days} fade-in `}>
                <div>
                    <div className={scheduleS.day}>{dayNames[0]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft1}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll1 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day1}
                            onScroll={handleScroll1}
                        >
                            {schedule &&
                                schedule[0].list.map((listDays, i) => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight1}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll1 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[1]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft2}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll2 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day2}
                            onScroll={handleScroll2}
                        >
                            {schedule &&
                                schedule[1].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight2}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll2 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[2]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft3}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll3 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day3}
                            onScroll={handleScroll3}
                        >
                            {schedule &&
                                schedule[2].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight3}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll3 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[3]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft4}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll4 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day4}
                            onScroll={handleScroll4}
                        >
                            {schedule &&
                                schedule[3].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight4}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll4 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[4]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft5}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll5 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day5}
                            onScroll={handleScroll5}
                        >
                            {schedule &&
                                schedule[4].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight5}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll5 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[5]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft6}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll6 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day6}
                            onScroll={handleScroll6}
                        >
                            {schedule &&
                                schedule[5].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight6}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll6 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className={scheduleS.day}>{dayNames[6]}</div>
                    <div className={scheduleS.lengthList}>
                        <div className={scheduleS.leftBtn}>
                            <FaArrowCircleLeft
                                onClick={toScrollLeft7}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: leftScroll7 ? '0.7' : '1',
                                }}
                            />
                        </div>
                        <div
                            className={scheduleS.dayList}
                            ref={day7}
                            onScroll={handleScroll7}
                        >
                            {schedule &&
                                schedule[6].list.map(listDays => (
                                    <div
                                        className={scheduleS.single}
                                        key={listDays.id}
                                    >
                                        <AnimeItem items={listDays} />
                                    </div>
                                ))}
                        </div>
                        <div className={scheduleS.rightBtn}>
                            <FaArrowCircleRight
                                onClick={toScrollRight7}
                                size={45}
                                style={{
                                    fill: 'red',
                                    opacity: rightScroll7 ? '0.7' : '1',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
