import { FC } from 'react';
import navS from './Navigation.module.scss';
const Navigation: FC = () => {
    return (
        <nav className={navS.nav}>
            <ul className={navS.links}>
                <li>Домой</li>
                <li>Категории</li>
                <li>Блог</li>
                <li>Случайное</li>
            </ul>
        </nav>
    );
};

export default Navigation;
