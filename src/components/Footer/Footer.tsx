import { Link } from 'react-router-dom';
import footerS from './Footer.module.scss';
const Footer = () => {
    return (
        <footer className={footerS.footer}>
            <div className={footerS.innerFooter}>
                <Link to={'/right-now'}>
                    Nur<span>me</span>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
