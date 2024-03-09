import React from 'react'
import { useGetUserByIDMutation, useGetUserByIDQuery, useGetUsersQuery } from '../../features/users/UsersApiSlice';
import Profile from './Profile';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserByIDQuery(null, {
        pollingInterval: 60000, // 60 seconds, requery data after specified time.
        refetchOnFocus: true, // collect data again if window has been changed (focus has switched)
        refetchOnMountOrArgChange: true // collect data if mount
    })
    
    let content;
    
    const {userID, username, status} = useAuth()

    if (isLoading) content = <p>Loading...</p>
    if (isError) content = <p className='error-msg'>{error?.data?.message}</p>

    if (isSuccess) {

        // get the user id
        
        content = (
            <>
                <Profile userID={userID}/>
            </>
        )

    }

    return content;
}

export default ProfilePage