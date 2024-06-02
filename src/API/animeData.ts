import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../utils/baseUrls';
import { AnimeUpdates, Title } from '../types/UpdateA';

type Pages = {
    page: number;
    limit: number;
};
type ids = {
    id: string;
};
type titles = {
    title: string;
};
type randomT = {
    random?: string;
};
type categoty = {
    genres?: string | null;
    year?: string | null;
};

export const animeData = createApi({
    reducerPath: 'animeUpdate',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    endpoints: builder => ({
        getUpdatesAnime: builder.query<AnimeUpdates, Pages>({
            query: ({ page, limit }) =>
                `title/updates?playlist_type=array&page=${page}&items_per_page=${limit}`,
        }),
        getTheTitle: builder.query<Title, ids>({
            query: ({ id }) => `title?id=${id}&playlist_type=array`,
        }),
        getResultSearch: builder.query<AnimeUpdates, titles>({
            query: ({ title }) =>
                `/title/search?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters,season.year&search=${title}`,
        }),
        getRandomItem: builder.query<Title, randomT>({
            query: () => `title/random`,
        }),
        getGenres: builder.query<[], any>({
            query: () => `genres`,
        }),
        getYears: builder.query<[], any>({
            query: () => `/years`,
        }),
        getResultCategory: builder.query<AnimeUpdates, categoty>({
            query: ({ genres, year }) => {
                let sort = 'title/search?';
                if (year !== null) sort += `&year=${year}`;
                if (genres !== null) sort += `&genres=${genres}`;
                return sort;
            },
        }),
        changes: builder.query<AnimeUpdates, any>({
            query: () => `title/changes`,
        }),
    }),
});
const urlss =
    'filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters&search=${title}';
export const {
    useGetUpdatesAnimeQuery,
    useGetTheTitleQuery,
    useGetResultSearchQuery,
    useGetRandomItemQuery,
    useGetYearsQuery,
    useGetGenresQuery,
    useGetResultCategoryQuery,
    useChangesQuery,
} = animeData;
