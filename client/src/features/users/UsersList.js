import React from 'react'
import { useGetUsersQuery } from './UsersApiSlice'
import User from './User'

function UsersList() {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()


    let content;

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {
        const {ids} = users
        const tableContent = ids?.length
        ? ids.map(userId => <User key={userId} userId={userId} />)
        : null

        content = (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>roles</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>

        )

    }

    return content;

}

export default UsersList