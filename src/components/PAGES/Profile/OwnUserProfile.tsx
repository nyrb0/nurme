import { ChangeEvent, useEffect, useState } from 'react';
import profileS from './OwnUserProfile.module.scss';
import CustomInput from '../../UI/Inputs/CustomInput';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { removeAcc } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useGetToFavoritesQuery } from '../../../API/user/UserData';
import AnimeItem from '../../AnimeItem/AnimeItem';
import CustomButton from '../../UI/Button/CustomButton';
import { skipToken } from '@reduxjs/toolkit/query';
import { MdAddAPhoto } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import RadioCustom from '../../UI/Radio/RadioCustom';
import Modal from '../../Modal/Modal';
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import Loading from '../../Warning/Loading';
import Error from '../../Warning/Error';
import unknownUser from '../../icons/unknownUser.jpg';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { pack } from '../../PackImg/Packs';
import { IoArrowBackSharp } from 'react-icons/io5';
import { AvatarPacks } from '../../PackImg/PackAvatar';
const OwnUserProfile = () => {
    const nameNurme = localStorage.getItem('nameInNurme');
    const emailNurme = localStorage.getItem('emailInNurme');
    const genderNurme = localStorage.getItem('genderNurme');
    const photoProfile = localStorage.getItem('photoProfileNurme');
    const headerImageStorage = localStorage.getItem('headerImage');
    const getDateUser = localStorage.getItem('dateNurme');
    const [dataUserInfo, setDataUserInfo] = useState<{
        email: string;
        name: string;
    }>({
        email: emailNurme ? emailNurme : '',
        name: nameNurme ? nameNurme : '',
    });
    const { userId } = useAppSelector(state => state.auth);
    const session = userId;
    const { data, isError, isLoading } = useGetToFavoritesQuery(
        session ? { session } : skipToken
    );
    const [genderCurrent, setGenderCurrent] = useState(genderNurme ?? '');
    const [photoForProfile, setPhotoForProfile] = useState('');
    const [previewFile, setPreviewFile] = useState<string | null>();
    const [previewFileP, setPreviewFileP] = useState<string | null>();
    const [headerIsVisible, setHeaderIsVisible] = useState<boolean>(false);
    const [profileIsVisible, setProfileIsVisible] = useState<boolean>(false);
    const [timeOutState, setTimeOutState] = useState(true);
    const [pointer, setPointer] = useState<boolean>(false);
    const [mobileEdit, setModileEdit] = useState(false);
    const [innerWindowWidth, setInnerWindowWidth] = useState<number>(0);
    const [date, setDate] = useState('');
    const [dateVeiw, setDateView] = useState<null | string>(null);
    const [isPackImage, setIsPackImage] = useState<{
        profilePack: boolean;
        headPack: boolean;
    }>({
        profilePack: false,
        headPack: false,
    });
    const [isTypeing, setIsTyping] = useState<{
        name: boolean;
        email: boolean;
        date: boolean;
        photo: boolean;
        gender: boolean;
    }>({
        name: false,
        email: false,
        date: false,
        photo: false,
        gender: false,
    });

    const [testWarning, setTestWarning] = useState<{
        nameW: string;
        emailW: string;
        generalW: string;
    }>({
        nameW: '',
        emailW: '',
        generalW: '',
    });

    const dis = useAppDispatch();

    const { fullDataAboutUser } = useAppSelector(state => state.auth);
    const comeBack = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setTimeOutState(false);
        }, 1000);
    }, []);

    const outAcc = () => {
        dis(removeAcc());
        localStorage.removeItem('photoProfileNurme');
    };

    const goEdit = () => {
        if (dataUserInfo.email.length <= 40 && dataUserInfo.name.length <= 30) {
            if (isTypeing.email) {
                if (dataUserInfo.email.length <= 40) {
                    if (dataUserInfo.email.endsWith('@gmail.com')) {
                        if (dataUserInfo.email.trim() !== emailNurme?.trim()) {
                            localStorage.setItem(
                                'emailInNurme',
                                dataUserInfo.email
                            );
                            setTestWarning(w => ({ ...w, emailW: 'Готово' }));
                            location.reload();
                        } else
                            setTestWarning(w => ({
                                ...w,
                                emailW: 'Измените email на новое',
                            }));
                    } else
                        setTestWarning(w => ({
                            ...w,
                            emailW: 'Неправильный email',
                        }));
                } else
                    setTestWarning(w => ({
                        ...w,
                        emailW: 'Максимальная длина (40 символов)',
                    }));
            }
            if (isTypeing.name) {
                if (dataUserInfo.name.length <= 30) {
                    if (dataUserInfo.name.trim() !== nameNurme?.trim()) {
                        setTestWarning(w => ({ ...w, nameW: 'Готово' }));
                        localStorage.setItem('nameInNurme', dataUserInfo.name);
                        location.reload();
                    } else
                        setTestWarning(w => ({
                            ...w,
                            nameW: 'Измените имя на новое',
                        }));
                } else
                    setTestWarning(w => ({
                        ...w,
                        nameW: 'Максимальная длина (30 символов)',
                    }));
            }
            if (date && isTypeing.date) {
                localStorage.setItem('dateNurme', date);
                processDate(date);
                location.reload();
            }
            if (genderCurrent !== genderNurme) {
                localStorage.setItem('genderNurme', genderCurrent);
                location.reload();
            }
            if (
                isTypeing.photo &&
                photoForProfile.trim() !== photoProfile?.trim()
            ) {
                localStorage.setItem('photoProfileNurme', photoForProfile);
                location.reload();
            }
        } else {
            setTestWarning(w => ({
                ...w,
                emailW: 'Максимальная длина (40 символов)',
                nameW: 'Измените имя на новое',
            }));
        }
    };
    useEffect(() => {
        const storedDate = localStorage.getItem('dateNurme');
        if (storedDate) processDate(storedDate);
    }, []);

    const processDate = (date: string) => {
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ];
        ///// ПРЕОБРАЗУЕТ ЧИСЛОВУЮ НА СТРОКУ date
        const arrDate = date.split('-');
        const month = parseInt(arrDate[1]) - 1;
        const newDate = `${arrDate[0]}-год ${arrDate[2]}-${months[month]}`;
        setDateView(newDate);
    };

    const changeGender = (value: string) => {
        setGenderCurrent(value);
    };
    const gender = ['Мужчина', 'Женщина', 'Другое'];
    const changeImageHeader = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const changeImageProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewFileP(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const delate = () => {
        setPreviewFile('');
    };

    const saveToHeaderImage = (type: string) => {
        if (previewFile && type === 'head') {
            localStorage.setItem('headerImage', previewFile);
            window.location.reload();
        }
        if (previewFileP && type === 'profile') {
            localStorage.setItem('photoProfileNurme', previewFileP);
            window.location.reload();
        }
    };

    const scrollToHead = (id: string): void => {
        const el: HTMLElement | null = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const editPc = () => {
        if (innerWindowWidth <= 1116) {
            setModileEdit(true);
            return;
        }
        scrollToHead('about');
        setPointer(true);
        setInterval(() => {
            setPointer(false);
        }, 2000);
    };

    useEffect(() => {
        const sizeWindow = () => {
            setInnerWindowWidth(innerWidth);
        };
        sizeWindow();
        addEventListener('resize', sizeWindow);
        return () => {
            removeEventListener('resize', sizeWindow);
        };
    }, []);

    if (userId === null) {
        comeBack('/right-now');
    }

    if (timeOutState) {
        return (
            <div className='warning'>
                <Loading />
            </div>
        );
    }

    if (isError || !userId) {
        return (
            <div className={'warning'}>
                <Error comeBack='/right-now'>
                    Ошибка при получении <br />
                    пользователя
                </Error>
            </div>
        );
    }

    return (
        <div className={`${profileS.profile}`}>
            <div className={profileS.top}>
                <div className={profileS.wrapperHeader}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className={profileS.header}
                        style={{
                            backgroundImage: `url(${
                                headerImageStorage
                                    ? headerImageStorage
                                    : 'https://i.imgur.com/lpj7d2S.gif'
                            }`,
                        }}
                    ></motion.div>
                    <div className={`fade-in ${profileS.editHeader}`}>
                        <span>
                            <BsPencilSquare
                                size={30}
                                onClick={() => setHeaderIsVisible(true)}
                            />
                        </span>
                    </div>
                    <div className={profileS.exitFromAcc} onClick={outAcc}>
                        <CustomButton theText='Выйти' type='button' />
                    </div>
                    <div className={profileS.profileImg}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <img
                                src={photoProfile || unknownUser}
                                alt='профиль'
                                onClick={e => {
                                    e.stopPropagation();
                                    setProfileIsVisible(true);
                                }}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className={profileS.camera}
                            onClick={e => {
                                e.stopPropagation();
                                setProfileIsVisible(true);
                            }}
                        >
                            <span>
                                <MdAddAPhoto
                                    style={{ fill: 'gray' }}
                                    size={30}
                                />
                            </span>
                        </motion.div>
                    </div>
                </div>
                <div className={profileS.info}>
                    <motion.div
                        className={profileS.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <div className={profileS.names}>
                            <span>Логин:</span> {fullDataAboutUser?.login}
                        </div>
                        <div className={profileS.names}>
                            <span>Имя:</span> {nameNurme || 'Пусто'}
                        </div>
                        <div className={profileS.names}>
                            <span>Email:</span> {emailNurme || 'Пусто'}
                        </div>
                        <div className={profileS.names}>
                            <span>Пол:</span> {genderNurme || 'Не выбрано'}
                        </div>
                        <div className={profileS.names}>
                            <span>Дата рождения:</span>{' '}
                            {dateVeiw || 'Не выбрано'}
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className={profileS.edit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <span>
                        <span onClick={editPc}>
                            <CustomButton
                                type='button'
                                theText='Редактировать'
                            />
                        </span>
                    </span>
                </motion.div>
            </div>
            <div className={profileS.bottom} id='about'>
                <div
                    className={profileS.aboutMe}
                    style={pointer ? { border: '1px solid yellow' } : {}}
                >
                    <div>
                        <div className={profileS.name}>
                            <CustomInput
                                placeholder='Имя'
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDataUserInfo(state => {
                                        setIsTyping(state => ({
                                            ...state,
                                            name: true,
                                        }));
                                        return {
                                            ...state,
                                            name: e.target.value,
                                        };
                                    })
                                }
                                value={dataUserInfo.name}
                            />
                        </div>

                        <div className={profileS.email}>
                            <CustomInput
                                placeholder='Устоновка фото по ссылке'
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setIsTyping(state => ({
                                        ...state,
                                        photo: true,
                                    }));
                                    setPhotoForProfile(e.target.value);
                                }}
                                value={photoForProfile}
                            />
                        </div>
                        <div className={profileS.born}>
                            <input
                                type='date'
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setIsTyping(state => ({
                                        ...state,
                                        date: true,
                                    }));
                                    setDate(e.target.value);
                                }}
                                value={date}
                            />
                        </div>
                        <div className={profileS.email}>
                            <CustomInput
                                placeholder='Имеил'
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDataUserInfo(state => {
                                        return {
                                            ...state,
                                            email: e.target.value,
                                        };
                                    })
                                }
                                value={dataUserInfo.email}
                            />
                        </div>
                        <div className={profileS.warningTest}>
                            {testWarning.emailW}
                        </div>
                        <div className={profileS.warningTest}>
                            {testWarning.nameW}
                        </div>
                        <div style={{ marginTop: 14 }}>
                            <RadioCustom
                                selected={genderCurrent}
                                options={gender}
                                onChange={changeGender}
                            />
                        </div>
                    </div>
                    <div className={profileS.button}>
                        <span onClick={goEdit}>
                            <CustomButton type='button' theText='Подвердить' />
                        </span>
                    </div>
                </div>
                {mobileEdit && (
                    <Modal onClick={() => setModileEdit(false)} maxWidth={500}>
                        <div className={`${profileS.mobileEdit} `}>
                            <div className={profileS.aboutMeMobile}>
                                <div>
                                    <div className={profileS.name}>
                                        <CustomInput
                                            placeholder='Имя'
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setDataUserInfo(state => {
                                                    setIsTyping(state => ({
                                                        ...state,
                                                        name: true,
                                                    }));
                                                    return {
                                                        ...state,
                                                        name: e.target.value,
                                                    };
                                                })
                                            }
                                            value={dataUserInfo.name}
                                        />
                                    </div>
                                    <div className={profileS.email}>
                                        <CustomInput
                                            placeholder='Устоновка фото по ссылке'
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setIsTyping(state => ({
                                                    ...state,
                                                    photo: true,
                                                }));
                                                setPhotoForProfile(
                                                    e.target.value
                                                );
                                            }}
                                            value={photoForProfile}
                                        />
                                    </div>
                                    <div className={profileS.born}>
                                        <input
                                            type='date'
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setIsTyping(state => ({
                                                    ...state,
                                                    date: true,
                                                }));
                                                setDate(e.target.value);
                                            }}
                                            value={date}
                                        />
                                    </div>
                                    <div className={profileS.email}>
                                        <CustomInput
                                            placeholder='Имеил'
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setIsTyping(state => ({
                                                    ...state,
                                                    email: true,
                                                }));
                                                setDataUserInfo(state => {
                                                    return {
                                                        ...state,
                                                        email: e.target.value,
                                                    };
                                                });
                                            }}
                                            value={dataUserInfo.email}
                                        />
                                    </div>
                                    <div style={{ marginTop: 14 }}>
                                        <RadioCustom
                                            selected={genderCurrent}
                                            options={gender}
                                            onChange={changeGender}
                                        />
                                    </div>
                                </div>
                                <div className={profileS.warningTest}>
                                    {testWarning.emailW}
                                </div>
                                <div className={profileS.warningTest}>
                                    {testWarning.nameW}
                                </div>
                                <div className={profileS.button}>
                                    <span onClick={goEdit}>
                                        <CustomButton
                                            type='button'
                                            theText='Подвердить'
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
                <div className={profileS.favorites}>
                    <h2>Сохраненные</h2>
                    <motion.div
                        className={profileS.favorite}
                        transition={{ delay: 1.8 }}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                    >
                        {isLoading ? (
                            <div className='dfc'>
                                <Loading />
                            </div>
                        ) : data && data.list?.length <= 0 ? (
                            <div>
                                <div
                                    className={profileS.notHaveFavorite}
                                    translate='no'
                                >
                                    К сожелению вы сохранили ничего
                                </div>
                            </div>
                        ) : (
                            <span>
                                {data?.list.map(f => (
                                    <AnimeItem items={f} key={f.id} />
                                ))}
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>
            <>
                {headerIsVisible && (
                    <Modal
                        maxWidth={700}
                        onClick={() => setHeaderIsVisible(false)}
                    >
                        <div className={`${profileS.headerImageToFile} `}>
                            {!isPackImage.headPack ? (
                                <>
                                    <div
                                        className={profileS.packImg}
                                        onClick={e => {
                                            e.stopPropagation();
                                            setIsPackImage({
                                                ...isPackImage,
                                                headPack: true,
                                            });
                                        }}
                                    >
                                        Паки
                                    </div>
                                    {headerImageStorage ? (
                                        <div
                                            className={profileS.del}
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    'headerImage'
                                                );
                                                location.reload();
                                            }}
                                        >
                                            Удалить
                                        </div>
                                    ) : null}
                                    <div className={profileS.inner}>
                                        {previewFile ? (
                                            <div
                                                className={
                                                    profileS.selectedImage
                                                }
                                            >
                                                <img
                                                    src={previewFile}
                                                    alt='preview'
                                                />
                                                <span onClick={delate}>
                                                    Удалить{' '}
                                                    <MdDelete size={20} />
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                className={profileS.imageEmpty}
                                            >
                                                <span>
                                                    <FaFileCirclePlus
                                                        size={60}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                        <input
                                            type='file'
                                            id='filess'
                                            onChange={changeImageHeader}
                                        />
                                        <div className={profileS.file}>
                                            {!previewFile ? (
                                                <label htmlFor='filess'>
                                                    <span>Загрузить</span>
                                                </label>
                                            ) : (
                                                <span
                                                    onClick={() =>
                                                        saveToHeaderImage(
                                                            'head'
                                                        )
                                                    }
                                                >
                                                    Установить
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={profileS.pack}>
                                    <div className={profileS.back}>
                                        <IoArrowBackSharp
                                            size={25}
                                            onClick={() =>
                                                setIsPackImage({
                                                    ...isPackImage,
                                                    headPack: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <span>Выбирайте:</span>
                                    <div className={profileS.wrapperHead}>
                                        <div className={profileS.inner}>
                                            {pack.map((p: string, i) => (
                                                <div key={i}>
                                                    <img
                                                        src={p}
                                                        alt='Anime'
                                                        onClick={() => {
                                                            setPreviewFile(p);
                                                            setIsPackImage({
                                                                ...isPackImage,
                                                                headPack: false,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>
                )}
                {profileIsVisible && (
                    <Modal
                        onClick={() => setProfileIsVisible(false)}
                        maxWidth={700}
                    >
                        <div className={`${profileS.headerImageToFile} `}>
                            {!isPackImage.profilePack ? (
                                <>
                                    <div
                                        className={profileS.packImg}
                                        onClick={() =>
                                            setIsPackImage({
                                                ...isPackImage,
                                                profilePack: true,
                                            })
                                        }
                                    >
                                        Паки
                                    </div>
                                    {photoProfile ? (
                                        <div
                                            className={profileS.del}
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    'photoProfileNurme'
                                                );
                                                location.reload();
                                            }}
                                        >
                                            Удалить
                                        </div>
                                    ) : null}
                                    <div className={profileS.inner}>
                                        {previewFileP ? (
                                            <div
                                                className={
                                                    profileS.selectedImage
                                                }
                                            >
                                                <img
                                                    src={previewFileP ?? 'f'}
                                                    alt='preview'
                                                />
                                                <span onClick={delate}>
                                                    Удалить{' '}
                                                    <MdDelete size={20} />
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                className={profileS.imageEmpty}
                                            >
                                                <span>
                                                    <FaFileCirclePlus
                                                        size={60}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                        <input
                                            type='file'
                                            id='filesss'
                                            onChange={changeImageProfile}
                                        />
                                        <div className={profileS.file}>
                                            {!previewFileP ? (
                                                <>
                                                    <label htmlFor='filesss'>
                                                        <span>Загрузить</span>
                                                    </label>
                                                </>
                                            ) : (
                                                <span
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        saveToHeaderImage(
                                                            'profile'
                                                        );
                                                    }}
                                                >
                                                    Установить
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={profileS.pack}>
                                    <div className={profileS.back}>
                                        <IoArrowBackSharp
                                            size={25}
                                            onClick={() =>
                                                setIsPackImage({
                                                    ...isPackImage,
                                                    headPack: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <span>Выбирайте:</span>
                                    <div className={profileS.wrapper}>
                                        <div className={profileS.inner}>
                                            {AvatarPacks.map((p: string, i) => (
                                                <div key={i}>
                                                    <img
                                                        className={profileS.img}
                                                        src={p}
                                                        alt='Avatar'
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setPreviewFileP(p);
                                                            setIsPackImage({
                                                                ...isPackImage,
                                                                profilePack:
                                                                    false,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>
                )}
            </>
        </div>
    );
};

export default OwnUserProfile;
