import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { ApiSlice } from "../../app/api/ApiSlice";
import { useSelector } from "react-redux";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState();


export const UsersApiSlice = ApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            /*keepUnusedDataFor: 5,*/
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                } else return [{ type: 'User', id: 'LIST'}]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
    
                }
            }),
            invalidatesTags: [
                {type: "User", id: "LIST"}
            ]
        }),
        updateUser: builder.mutation({
            query: initialItemData => ({
                url: "/users",
                method: 'PATCH',
                body: {
                    ...initialItemData,
                }
    
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        setUserDotaID: builder.mutation({
            query: data => ({
                url: "/users/dotaid",
                method: 'PATCH',
                body: {
                    ...data,
                }
            })
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id }
            ]
        }),
        getUserByID: builder.query({
            query: (id) => `/users/${id}`,
            invalidatesTags: [
                {type: "Item", id: "LIST"}
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIDQuery,
    useSetUserDotaIDMutation
} = UsersApiSlice

// returns the query result object
export const selectUsersResult = UsersApiSlice.endpoints.getUsers.select()

// create memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids
)

// getSelectors creates these selectors and we ranme them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
