import { FC, useEffect, useState } from 'react';
import navS from './Navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetRandomItemQuery } from '../../API/animeData';

interface NavigationProps {}
const Navigation: FC<NavigationProps> = () => {
    const random = useNavigate();
    const { data, refetch } = useGetRandomItemQuery({});
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    console.log(activeIndex);
    const handleRandomClick = () => {
        refetch();
        random(`right-now/title/${data?.id}`);
    };
    const handleAciveIndex = (index: number, random?: string) => {
        setActiveIndex(index);
        if (random === 'ok') {
            handleRandomClick();
        }
    };

    return (
        <nav className={navS.nav}>
            <ul className={navS.links}>
                <li
                    onClick={() => {
                        handleAciveIndex(1);
                        random('/right-now');
                    }}
                    className={activeIndex === 1 ? navS.active : ''}
                >
                    Домой
                </li>
                <li
                    onClick={() => handleAciveIndex(2)}
                    className={activeIndex === 2 ? navS.active : ''}
                >
                    Категории
                </li>
                <li
                    onClick={() => handleAciveIndex(3)}
                    className={activeIndex === 3 ? navS.active : ''}
                >
                    Блог
                </li>
                <li
                    onClick={() => {
                        handleAciveIndex(4, 'ok');
                    }}
                    className={activeIndex === 4 ? navS.active : ''}
                >
                    {' '}
                    Случайное
                </li>
                <li
                    onClick={() => handleAciveIndex(5)}
                    className={activeIndex === 5 ? navS.active : ''}
                >
                    Расписание
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
