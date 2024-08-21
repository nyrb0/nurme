import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../utils/baseUrls';
import { AnimeUpdates, Title } from '../types/UpdateA';
import { Root2 } from '../types/SchuduleType';

type Pages = {
    page: number;
    limit: number;
};
type ids = {
    id: string;
};
type titles = {
    title: string;
    limit?: number;
    page?: number;
};
type randomT = {
    random?: string;
};
type categoty = {
    genres?: string | string[] | null;
    year?: string | null;
    limit?: number;
    page?: number;
    seasonCode: number;
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
            query: ({ title, limit = 5, page = 1 }) =>
                `/title/search?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,player.episodes.last,posters,season.year&search=${title}&limit=${limit}&page=${page}`,
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
            query: ({ genres, year, page = 1, limit = 10, seasonCode }) => {
                let sort =
                    'title/search?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,player.episodes.last,posters,season.year';
                if (year) sort += `&year=${year}`;
                if (genres && genres.length !== 0) sort += `&genres=${genres}`;
                if (seasonCode) sort += seasonCode;

                return `${sort}&page=${page}&items_per_page=${limit}`;
            },
        }),

        changes: builder.query<AnimeUpdates, any>({
            query: () => `title/changes`,
        }),

        sheduleList: builder.query<Root2[], any>({
            query: () =>
                `title/schedule?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters`,
        }),

        searchGenre: builder.query<
            AnimeUpdates,
            { genre: string; limit: number; page: number }
        >({
            query: ({ genre, page = 1, limit = 10 }) => {
                if (!genre) {
                    return '';
                }
                return `title/search?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,player.episodes.last,posters,season.year&genres=${genre}&limit=${limit}&page=${page}`;
            },
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
    useSheduleListQuery,
    useSearchGenreQuery,
} = animeData;
