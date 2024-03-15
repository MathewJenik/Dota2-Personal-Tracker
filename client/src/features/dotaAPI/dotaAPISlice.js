import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";

const dotaAPIAdapter = createEntityAdapter({})

const initialState = dotaAPIAdapter.getInitialState();

export const dotaAPISlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getDotaDataSync: builder.mutation({
            query: id => ({
                url: '/dota',
                method: 'POST',
                body: { ...id }
            })
        }),
        getRecentMatches: builder.query({
            query: id => ({
                url: '/dota/matches/recent',
                method: 'POST',
                body: { ...id }
            })
        }),
        syncRecentMatches: builder.mutation({
            query: data => ({
                url: '/dota/matches/sync/recent',
                method: 'POST',
                body: {...data }
            })
        }),
    })
})

export const {
    useGetDotaDataSyncMutation,
    useGetRecentMatchesQuery,
    useSyncRecentMatchesMutation
} = dotaAPISlice

// returns the query result object
export const selectDotaAPIResult = dotaAPISlice.endpoints.getDotaDataSync.select()

// create memoized selector
const selectDotaAPIData = createSelector(
    selectDotaAPIResult,
    dotaResult => dotaResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllHeroes,
    selectById: selectHeroById,
    selectIds: selectHeroIds
    // pass in a selector that returns the heroes slice of state
} = dotaAPIAdapter.getSelectors(state => selectDotaAPIData(state) ?? initialState)
