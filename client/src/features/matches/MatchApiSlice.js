import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";
import { useSelector } from "react-redux";

const matchesAdapter = createEntityAdapter({})

const initialState = matchesAdapter.getInitialState();


export const MatchesApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getMatches: builder.query({
            query: () => '/matches',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            /*keepUnusedDataFor: 5,*/
            transformResponse: responseData => {
                const loadedMatches = responseData.map(match => {
                    match.id = match._id
                    return match
                });
                return matchesAdapter.setAll(initialState, loadedMatches)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Match', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Match', id}))
                    ]
                } else return [{ type: 'Match', id: 'LIST'}]
            }
        }),
        
        getMatchByID: builder.query({
            query: (id) => `/matches/${id}`,
            invalidatesTags: [
                {type: "Match", id: "LIST"}
            ]
        }),

    })
})

export const {
    useGetMatchesQuery,
    useGetMatchByIDQuery
} = MatchesApiSlice

// returns the query result object
export const selectMatchesResult = MatchesApiSlice.endpoints.getMatches.select()

// create memoized selector
const selectMatchesData = createSelector(
    selectMatchesResult,
    matchesResult => matchesResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllMatches,
    selectById: selectMatchById,
    selectIds: selectMatchesIds
    // pass in a selector that returns the users slice of state
} = matchesAdapter.getSelectors(state => selectMatchesData(state) ?? initialState)


// Assuming your match object structure includes both 'id' and '_id' fields
export const selectMatchByMatchId = createSelector(
    selectMatchesData,
    (_, match_id) => match_id,
    (matches, match_id) => {
        if (!matches || matches.length === 0) {
            return undefined; // Matches not found or empty
        }
        return matches.find(match => match.id === match_id);
    }
);