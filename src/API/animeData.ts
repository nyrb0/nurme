import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../utils/baseUrls";
import { AnimeUpdates, Pagination, Title } from "../types/UpdateA";

type Pages= {
    page: number;
    limit:number;
}
type ids = {
    id:string 
}

export const animeData = createApi({
    reducerPath:'animeUpdate',
    baseQuery:fetchBaseQuery({baseUrl:BASEURL}),
    endpoints:(builder)=>({
        getUpdatesAnime: builder.query<AnimeUpdates,Pages>({
            query:({page,limit})=>`title/updates?page=${page}&limit=${limit}`
        }),
        getTheTitle: builder.query<Title,ids>({
            query:({id})=>`title?id=${id}`
        })
    })
})

export const {useGetUpdatesAnimeQuery,useGetTheTitleQuery} = animeData;