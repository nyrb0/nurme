import React from 'react';
import { useGetResultCategoryQuery } from '../../../API/animeData';
import { useLocation, useSearchParams } from 'react-router-dom';
import AnimeItem from '../../AnimeItem/AnimeItem';
import cateS from './CategoryPage.module.scss';
const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const year = searchParams.get('year') ?? '';
    const genres = searchParams.get('genre') ?? '';
    const {
        data: category,
        isLoading,
        isError,
    } = useGetResultCategoryQuery({ year, genres });
    console.log(category);
    if (isLoading) return <div>Загрузка...</div>;
    if (isError) return <div>Ошибка: {isError}</div>;
    return (
        <div className={cateS.fullContent}>
            <div className={cateS.re}>
                {category?.list.map(item => (
                    <AnimeItem items={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
