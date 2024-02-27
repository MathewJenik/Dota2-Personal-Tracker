import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const ApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Hero', 'Item', 'User'],
    endpoints: builder => ({})
})