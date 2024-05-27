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
                `/title/search?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters&search=${title}`,
        }),
        getRandomItem: builder.query<Title, randomT>({
            query: () => `title/random`,
        }),
    }),
});

export const {
    useGetUpdatesAnimeQuery,
    useGetTheTitleQuery,
    useGetResultSearchQuery,
    useGetRandomItemQuery,
} = animeData;
