import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";

const heroesAdapter = createEntityAdapter({})

const initialState = heroesAdapter.getInitialState();


export const heroesApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            /*keepUnusedDataFor: 5 ,*/
            transformResponse: responseData => {
                const loadedheroes = responseData.map(hero => {
                    hero.id = hero._id
                    return hero
                });
                return heroesAdapter.setAll(initialState, loadedheroes)
            },
            providedTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Hero', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Hero', id}))
                    ]
                } else return [{ type: 'Hero', id: 'LIST'}]
            }
        }),
        addNewHero: builder.mutation({
            query: initialHeroData => ({
                url: '/heroes',
                method: 'POST',
                body: {
                    ...initialHeroData,

                }
            }),
            invalidatesTags: [
                {type: "Hero", id: "LIST"}
            ]
        }),
        updateHero: builder.mutation({
            query: initialHeroData => ({
                url: "/heroes",
                method: 'PATCH',
                body: {
                    ...initialHeroData,
                }

            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Hero', id: arg.id }
            ]
        }),
        deleteHero: builder.mutation({
            query: ({id}) => ({
                url: '/heroes',
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Hero', id: arg.id }
            ]
        }),

    }),
})

export const {
    useGetHeroesQuery,
    useAddNewHeroMutation,
    useUpdateHeroMutation,
    useDeleteHeroMutation,
} = heroesApiSlice

// returns the query result object
export const selectHeroesResult = heroesApiSlice.endpoints.getHeroes.select()

// create memoized selector
const selectHeroesData = createSelector(
    selectHeroesResult,
    heroesResult => heroesResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllHeroes,
    selectById: selectHeroById,
    selectIds: selectHeroIds
    // pass in a selector that returns the heroes slice of state
} = heroesAdapter.getSelectors(state => selectHeroesData(state) ?? initialState)
