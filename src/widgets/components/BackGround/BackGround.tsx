import { useContext } from 'react';
import { ThemeContext } from '../../../features/Context/Theme';
import bgNight from '../icons/BG.webp';
import bgLight from '../icons/BGLight.webp';

const BackGround = () => {
    const con = useContext(ThemeContext);
    if (!con) throw new Error('Error in theme context');

    const { theme } = con;
    return (
        <div className={`background ${theme ? 'bgLight' : 'bgNight'}`}></div>
    );
};

export default BackGround;
