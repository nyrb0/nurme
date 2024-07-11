import { useContext } from 'react';
import switchS from './Swirch.module.scss';
import { ThemeContext } from '../../Context/Theme';

const Switch = () => {
    const con = useContext(ThemeContext);

    if (!con) throw new Error('Error theme context');

    const { theme, toggle } = con;

    return (
        <div
            className={switchS.container}
            onClick={toggle}
            style={{ background: theme ? '' : 'black' }}
        >
            <div className={switchS.icon}>🔆</div>
            <div className={switchS.icon}>🌙</div>
            <div
                className={switchS.button}
                style={theme ? { right: '3px' } : { left: '3px' }}
            ></div>
        </div>
    );
};

export default Switch;
