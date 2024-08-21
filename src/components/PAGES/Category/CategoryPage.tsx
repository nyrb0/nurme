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
    const seasonCode = Number(searchParams.get('season_code')) ?? null;

    const [page, setPage] = useState(1);
    const {
        data: category,
        isLoading,
        isError,
        isFetching,
    } = useGetResultCategoryQuery({ year, genres, page, seasonCode });
    const [cate, setCate] = useState<Title[]>([]);
    const dispatch = useAppDispatch();
    const sele = useAppSelector(state => state.catego);

    useEffect(() => {
        if (category) {
            dispatch(addToStorage(category.list));
        }
    }, [category]);

    const addToCate = () => {
        setPage(page + 1);
    };
    const toArrResult = (g: string, knife: string) => g.split(knife);
    const seasonListFull = ['Зима', 'Весна', 'Лето', 'Осень'];

    // const toSeasonFromIndex = ()=>{

    // }

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
            <div>
                <div className={cateS.resultSearch}>
                    <span>Результаты поиска:</span>
                    <div className={`${cateS.genre} `}>
                        {toArrResult(genres, ',').map(g => (
                            <div key={g} className={cateS.soloGenre}>
                                {g}
                            </div>
                        ))}
                    </div>
                    <div className={cateS.year}>
                        {toArrResult(year, ',')[0]}-
                        {toArrResult(year, ',').at(-1)}
                    </div>
                    <div className={cateS.season}>
                        Сезон:{' '}
                        {seasonCode
                            ? seasonListFull[seasonCode - 1]
                            : 'Не выбран'}
                    </div>
                </div>
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
        </div>
    );
};

export default CategoryPage;
