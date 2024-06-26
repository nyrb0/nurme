import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../UI/Button/CustomButton';
import m from './Mobile.module.scss';
import { motion } from 'framer-motion';
const MobileRegis = () => {
    const nav = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={m.regis}
        >
            <div className={m.auth}>
                <div className={m.route}>Пункт авторизации/регистрации</div>
                <div className={m.nameProject}>
                    Nur<span>me</span>
                </div>
                <div className={m.isAcc}>
                    <span>
                        <a href='https://www.anilibria.tv/pages/cp.php'>
                            <CustomButton
                                type='button'
                                theText='Создать аккаунт'
                            />
                        </a>
                    </span>
                    <span onClick={() => nav('/auth')}>
                        <CustomButton type='button' theText='Войти' />
                    </span>
                </div>
                <p>Регистрация доступна на сайте Anilibria.TV</p>
            </div>
        </motion.div>
    );
};

export default MobileRegis;
