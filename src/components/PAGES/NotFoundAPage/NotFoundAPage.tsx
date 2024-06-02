import { Link, useNavigate } from 'react-router-dom';
import notFound from './NotFoundAPage.module.scss';
import Error from '../../Warning/Error';

const NotFoundAPage = () => {
    return (
        <div className={notFound.wrapper}>
            <Error
                comeBack={'/right-now'}
                children={
                    <>
                        <div>Упс,страница не найдена</div>
                        <div>Простите,вы ввели неверный путь</div>
                    </>
                }
            />
        </div>
    );
};

export default NotFoundAPage;
