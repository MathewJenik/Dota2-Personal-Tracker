import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";

const abilitiesAdapter = createEntityAdapter({})

const initialState = abilitiesAdapter.getInitialState();


export const abilitiesApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAbilities: builder.query({
            query: () => '/abilities',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedAbilities = responseData.map(ability => {
                    ability.id = ability._id
                    return ability
                });
                return abilitiesAdapter.setAll(initialState, loadedAbilities)
            },
            providedTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Ability', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Ability', id}))
                    ]
                } else return [{ type: 'Ability', id: 'LIST'}]
            }
        })
    })
})

export const {
    useGetAbilitiesQuery,
} = abilitiesApiSlice

// returns the query result object
export const selectAbilitiesResult = abilitiesApiSlice.endpoints.getAbilities.select()

// create memoized selector
const selectAbilitiesData = createSelector(
    selectAbilitiesResult,
    abilitiesResult => abilitiesResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllAbilities,
    selectById: selectAbilityById,
    selectIds: selectAbilityIds
    // pass in a selector that returns the abilities slice of state
} = abilitiesAdapter.getSelectors(state => selectAbilitiesData(state ?? initialState))
