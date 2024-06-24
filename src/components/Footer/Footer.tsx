import { Link } from 'react-router-dom';
import footerS from './Footer.module.scss';
import buttonArrow from '../icons/buttonArrow.png';
import { HashRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
const Footer = () => {
    const scrollToHead = (getId: string): void => {
        const el: HTMLElement | null = document.getElementById(getId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                <div className='namesAnimeCinema'>
                    <Link to={'/right-now'}>
                        Nur<span>me</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
