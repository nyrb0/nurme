import { useEffect, useState } from 'react';
import genreSearch from '../ResultSearchPage/Result.module.scss';
import CustomButton from '../../shared/UI/Button/CustomButton';
import Loading from '../../widgets/components/Warning/Loading';
import { useSearchParams } from 'react-router-dom';
import { useSearchGenreQuery } from '../../API/animeData';
import { Title } from '../../shared/types/UpdateA';
import AnimeItem from '../../shared/components/AnimeItem/AnimeItem';

const SearchGenre = () => {
    const [result, setResult] = useState<Title[]>([]);
    const [page, setPage] = useState<number>(1);

    const [searchParams] = useSearchParams();
    const genre = searchParams.get('genre') ?? '';
    const limit = 15;
    const { data, isFetching, isLoading } = useSearchGenreQuery({
        genre,
        page,
        limit,
    });

    useEffect(() => {
        if (data && data.list) {
            setResult(prevResult => {
                const newResults = data.list.filter(
                    newItem =>
                        !prevResult.some(prevItem => prevItem.id === newItem.id)
                );
                return prevResult.concat(newResults);
            });
        }
    }, [data, page]);
    const addResult = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading) {
        return (
            <div className='warning'>
                <Loading />
            </div>
        );
    }

    return (
        <div className={genreSearch.result}>
            <span className={`${genreSearch.text} dfc`}>
                Поиск по жанру: "{genre}"
            </span>
            <div className='dfc'>
                <div className='column'>
                    {result.map(i => (
                        <AnimeItem items={i} key={i.id} />
                    ))}
                </div>
            </div>
            <div className={`${genreSearch.add} dfc`}>
                {!isFetching ? (
                    result.length === 0 ? (
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

export default SearchGenre;
