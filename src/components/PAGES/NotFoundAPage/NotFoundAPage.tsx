import { Link } from 'react-router-dom';
import notFound from './NotFoundAPage.module.scss';

const NotFoundAPage = () => {
    return (
        <div className={notFound.hz}>
            <div className={notFound.warn}>Упс,страница не найдена</div>
            <div className={notFound.sorry}>
                Простите,вы ввели новерное неверный путь
            </div>
            <Link to={'right-now'} className={notFound.comeBack}>
                Вернуться назад
            </Link>
        </div>
    );
};

export default NotFoundAPage;
