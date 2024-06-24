import { useSearchParams } from 'react-router-dom';
import { useGetResultSearchQuery } from '../../../API/animeData';
import AnimeItem from '../../AnimeItem/AnimeItem';
import s from './Result.module.scss';
import { useEffect, useState } from 'react';
import { Title } from '../../../types/UpdateA';
import CustomButton from '../../UI/Button/CustomButton';
import Loading from '../../Warning/Loading';

const Result = () => {
    const [result, setResult] = useState<Title[]>([]);
    const [page, setPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const title = searchParams.get('title') ?? '';
    const limit = 10;
    const { data, isFetching, isLoading } = useGetResultSearchQuery({
        title,
        limit,
        page,
    });
    const limitPage = data?.pagination.pages || 1;

    useEffect(() => {
        if (data && data.list) {
            setResult(prevResult => {
                const newResults = data.list.filter(
                    newItem =>
                        !prevResult.some(
                            existingItem => existingItem.id === newItem.id
                        )
                );
                return [...prevResult, ...newResults];
            });
        }
    }, [data, isLoading, page]);
    console.log(data);
    const addResult = () => {
        if (page < limitPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className={s.result}>
            <span className={`${s.text} dfc`}>Результат поиска: "{title}"</span>
            <div className='dfc'>
                <div className='column'>
                    {result.map(i => (
                        <AnimeItem items={i} key={i.id} />
                    ))}
                </div>
            </div>
            <div className={`${s.add} dfc`}>
                {!isFetching ? (
                    page >= limitPage ? (
                        <div>(Пусто)</div>
                    ) : (
                        <span onClick={addResult}>
                            <CustomButton
                                theText={'Еще'}
                                type='button'
                                disabled={isFetching}
                            />
                        </span>
                    )
                ) : (
                    <div>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;
