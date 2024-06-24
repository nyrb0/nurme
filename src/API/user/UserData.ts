import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../../utils/baseUrls';
import { UserInfoType } from '../../types/userType';
import { AnimeUpdates } from '../../types/UpdateA';

type favoriteType = {
    session: string | null;
    title_id: number | undefined;
};
type updateUser = {
    nickname?: string;
    email?: string;
    userId?: string;
};
export const userData = createApi({
    reducerPath: 'userData',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    endpoints: builder => ({
        userInfo: builder.query<UserInfoType, { userD: string | null }>({
            query: ({ userD }) => `/user?session=${userD}`,
        }),
        addToFavorite: builder.mutation<{ success: boolean }, favoriteType>({
            query: ({ session, title_id }) => ({
                url: '/v3/user/favorites',
                method: 'PUT',
                params: { session, title_id },
            }),
        }),
        getToFavorites: builder.query<AnimeUpdates, { session: string | null }>(
            {
                query: ({ session }) => ({
                    url: '/v3/user/favorites?limit=30',
                    method: 'GET',
                    params: { session },
                }),
            }
        ),
        deleteFavorite: builder.mutation<{ success: boolean }, favoriteType>({
            query: ({ session, title_id }) => ({
                url: '/v3/user/favorites',
                method: 'DELETE',
                params: { session, title_id },
            }),
        }),
    }),
});

export const {
    useUserInfoQuery,
    useAddToFavoriteMutation,
    useGetToFavoritesQuery,
    useDeleteFavoriteMutation,
} = userData;
