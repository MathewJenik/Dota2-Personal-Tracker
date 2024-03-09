import React, { useEffect, useState } from 'react'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { removeTokenFromLocalStorage } from '../../features/api/storage'
import { selectUserById, useGetUsersQuery } from '../../features/users/UsersApiSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { useGetDotaDataSyncMutation } from '../../features/dotaAPI/dotaAPISlice'

const Profile = ({userID}) => {

    const [profileData, setProfileData] = useState(null);
    const [profileName, setProfileName] = useState('')

    
    const {username, status, dotaID} = useAuth()
    
    const [sendLogout, {
        isLoginLoading,
        isLoginSuccess,
        isLoginError,
        errorLogin
    }] = useSendLogoutMutation()
    
    const navigate = useNavigate()

    const onLogoutClick = () => {
        sendLogout();
        removeTokenFromLocalStorage();
        navigate('/');
        
    }
    const [syncData, {
        data: profile,
        isLoading: isDSyncLoading,
        isSuccess: isDSyncSuccess,
        isError: isDSyncError,
        error: errorDSync
    }] = useGetDotaDataSyncMutation();

    useEffect(() => {
        console.log("PROFILE SYNC SUCCESS: ", isDSyncSuccess);
        console.log("PROFILE SYNC DATA: ", profile);
        if (isDSyncSuccess && profile) {
            setProfileData(profile);
            setProfileName(profile.profile.personaname)
        }
    }, [isDSyncSuccess, profile]);
    //value={`${user.id}`
    console.log("USERID: ", userID)

    const user = useSelector(state => 
        selectUserById(state, userID)
    )

    
    const onSaveClicked = async (e) => {
        e.preventDefault();
        // check if the data can be saved
        
        // now save the updated dota id
    }

    var id = "102296415"
    if (user) {
        return (
            <div className='profile page'>
        
                <h1 className='primary-heading'>Profile - {username}</h1>
                <div>
                    <form>
                        <label htmlFor='DotaID'>Dota 2 ID</label>
                        <input name='DotaID' value={dotaID}></input>
                        <input className='form-submit' type="submit" value="Submit" onClick={onSaveClicked} />
                    </form>
        
                    <button onClick={() => onLogoutClick()}>Log Out</button>
                    <br></br>
                    <button onClick={() => syncData({data: id})}>Sync</button>


                </div>
        
            </div>
          )
    } else {
        return null;
    }



}

export default Profile