import React, { useEffect, useState } from 'react';
import { useGetResultCategoryQuery } from '../../../API/animeData';
import { useLocation, useSearchParams } from 'react-router-dom';
import AnimeItem from '../../AnimeItem/AnimeItem';
import cateS from './CategoryPage.module.scss';
import Loading from '../../Warning/Loading';
import Error from '../../Warning/Error';
import CustomButton from '../../UI/Button/CustomButton';
import { Title } from '../../../types/UpdateA';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addToStorage } from '../../../redux/CategorySlice';
const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const year = searchParams.get('year') ?? '';
    const genres = searchParams.get('genre') ?? '';
    const [page, setPage] = useState(1);
    const {
        data: category,
        isLoading,
        isError,
        isFetching,
    } = useGetResultCategoryQuery({ year, genres, page });
    const [cate, setCate] = useState<Title[]>([]);
    const dispatch = useAppDispatch();
    const sele = useAppSelector(state => state.catego);
    console.log(sele, 'lkfk');
    useEffect(() => {
        if (category) {
            dispatch(addToStorage(category.list));
        }
    }, [category]);

    console.log(cate);

    const addToCate = () => {
        setPage(page + 1);
    };
    if (isLoading)
        return (
            <div className={cateS.loading}>
                <Loading />
            </div>
        );
    if (isError)
        return (
            <div className={cateS.loading}>
                <Error comeBack='/right-now'>
                    Упс, ошибка в <p>разделе категории</p>
                </Error>
            </div>
        );

    return (
        <div className={`${cateS.fullContent} fade-in`}>
            <div className={cateS.wrapper}>
                <div className={`${cateS.re} column`}>
                    {sele.cate.map(item => (
                        <AnimeItem items={item} key={item.id} />
                    ))}
                </div>
                {!isFetching ? (
                    <span onClick={addToCate}>
                        <span>
                            <CustomButton
                                theText={'Еще'}
                                type='button'
                                disabled={isFetching}
                            />
                        </span>
                    </span>
                ) : (
                    <span className={cateS.loadingAdd}>
                        <Loading />
                    </span>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
