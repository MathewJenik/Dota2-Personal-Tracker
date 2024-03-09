import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";
import { UsersApiSlice } from "../users/UsersApiSlice";

const itemsAdapter = createEntityAdapter({})

const initialState = itemsAdapter.getInitialState();


export const itemsApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/items',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            /*keepUnusedDataFor: 5,*/
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
        }),
        addNewItem: builder.mutation({
            query: initialItemData => ({
                url: '/items',
                method: 'POST',
                body: {
                    ...initialItemData,
    
                }
            }),
            invalidatesTags: [
                {type: "Item", id: "LIST"}
            ]
        }),
        updateItem: builder.mutation({
            query: initialItemData => ({
                url: "/items",
                method: 'PATCH',
                body: {
                    ...initialItemData,
                }
    
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id }
            ]
        }),
        deleteItem: builder.mutation({
            query: ({id}) => ({
                url: '/items',
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Item', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetItemsQuery,
    useAddNewItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApiSlice


// returns the query result object
export const selectItemsResult = itemsApiSlice.endpoints.getItems.select()

// create memoized selector
const selectItemsData = createSelector(
    selectItemsResult,
    itemsResult => itemsResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllitems,
    selectById: selectItemById,
    selectIds: selectItemIds
    // pass in a selector that returns the items slice of state
} = itemsAdapter.getSelectors(state => selectItemsData(state) ?? initialState)
