import { FC, useContext, useState } from 'react';
import navS from './Navigation.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetRandomItemQuery } from '../../../API/animeData';
import { isVisibleContext } from '../../../features/Context/Visible';
import { menuContext } from '../../../features/Context/Menu';
import { motion } from 'framer-motion';
interface NavigationProps {}
const Navigation: FC<NavigationProps> = () => {
    const random = useNavigate();
    const toRoute = useNavigate();
    const { data, refetch } = useGetRandomItemQuery({});
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const menuCon = useContext(menuContext);

    const contextVis = useContext(isVisibleContext);

    if (!menuCon) throw new Error('error in menuContext');
    if (!contextVis) {
        throw new Error('not have context');
    }
    const { setMenu } = menuCon;
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
    const location = useLocation();
    const currentL = location.pathname;
    return (
        <nav className={navS.nav}>
            <ul className={navS.links}>
                <motion.li
                    onClick={() => {
                        handleAciveIndex(1);
                        random('/right-now');
                    }}
                    className={
                        location.pathname === '/right-now' ? navS.active : ''
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    Домой
                </motion.li>
                <motion.li
                    onClick={() => {
                        handleAciveIndex(2);
                        setIsVisible(true);
                        setMenu(false);
                    }}
                    className={
                        currentL.startsWith('/category') ? navS.active : ''
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Категории
                </motion.li>
                <motion.li
                    onClick={() => {
                        handleAciveIndex(4, 'ok');
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    {' '}
                    Случайное
                </motion.li>
                <motion.li
                    onClick={() => {
                        toRoute('/schedule');
                    }}
                    className={
                        currentL.startsWith('/schedule') ? navS.active : ''
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                >
                    Расписание
                </motion.li>
            </ul>
        </nav>
    );
};

export default Navigation;
