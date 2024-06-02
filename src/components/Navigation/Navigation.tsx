import { FC, useContext, useState } from 'react';
import navS from './Navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetRandomItemQuery } from '../../API/animeData';
import Modal from '../Modal/Modal';
import { isVisibleContext } from '../../Context/Visible';

interface NavigationProps {}
const Navigation: FC<NavigationProps> = () => {
    const random = useNavigate();
    const { data, refetch } = useGetRandomItemQuery({});
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const contextVis = useContext(isVisibleContext);
    if (!contextVis) {
        throw new Error('not have context');
    }
    const { setIsVisible } = contextVis;
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
                    onClick={() => {
                        handleAciveIndex(2);
                        setIsVisible(true);
                    }}
                    className={activeIndex === 2 ? navS.active : ''}
                >
                    Категории
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
