import { Link } from 'react-router-dom';
import footerS from './Footer.module.scss';
import buttonArrow from '../icons/buttonArrow.png';
import { FaInstagram } from 'react-icons/fa';
import { RiTelegramLine } from 'react-icons/ri';
import { IoLogoTiktok } from 'react-icons/io5';
const Footer = () => {
    const scrollToHead = (getId: string): void => {
        const el: HTMLElement | null = document.getElementById(getId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const icons = [
        <FaInstagram size={30} />,
        <RiTelegramLine size={30} />,
        <IoLogoTiktok size={30} />,
    ];
    const urls = [
        'https://www.instagram.com/ny1bo/',
        'https://www.tiktok.com/@ny1bo?_t=8nUhjfoOaYy&_r=1',
        'https://t.me/programmingG1oup',
    ];
    return (
        <footer className={footerS.footer}>
            <a onClick={() => scrollToHead('head')}>
                <img
                    className={footerS.arrow}
                    src={`${buttonArrow}`}
                    alt='arrrow'
                />
            </a>

            <div className={footerS.innerFooter}>
                <div className='namesAnimeCinema' translate='no'>
                    <Link to={'/right-now'}>
                        Nur<span>me</span>
                    </Link>
                </div>

                <div className={`${footerS.social} df`}>
                    {icons.map((ic, index) => (
                        <div className={footerS.i} key={index}>
                            <a target='_black' href={urls[index]}>
                                {ic}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
