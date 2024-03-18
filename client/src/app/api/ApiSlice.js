import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        console.log("STATE: ", getState())
        console.log("CREATING THE STATE TOKEN FOR FETCH BASE QUERY: ", token)
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            api.dispatch(setCredentials({...refreshResult.data}))

            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult

        }

    }

    return result
}


export const ApiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Hero', 'Item', 'User', 'Ability'],
    endpoints: builder => ({})
})