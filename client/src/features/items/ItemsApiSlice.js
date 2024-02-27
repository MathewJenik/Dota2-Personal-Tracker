import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";
import { UsersApiSlice } from "../users/UsersApiSlice";

const itemsAdapter = createEntityAdapter({})

const initialState = itemsAdapter.getInitialState();


export const ItemsApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/items',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadeditems = responseData.map(item => {
                    item.id = item._id
                    return item
                });
                return itemsAdapter.setAll(initialState, loadeditems)
            },
            providedTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Item', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Item', id}))
                    ]
                } else return [{ type: 'Item', id: 'LIST'}]
            }
        })
    })
})

export const {
    useGetItemsQuery,
} = ItemsApiSlice


// returns the query result object
export const selectitemsResult = ItemsApiSlice.endpoints.getItems.select()

// create memoized selector
const selectitemsData = createSelector(
    selectitemsResult,
    itemsResult => itemsResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllitems,
    selectById: selectItemById,
    selectIds: selectItemIds
    // pass in a selector that returns the items slice of state
} = itemsAdapter.getSelectors(state => selectitemsData(state ?? initialState))
