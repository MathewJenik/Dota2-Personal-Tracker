import React, { useEffect, useState } from 'react'
import { useRefreshMutation, useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { removeTokenFromLocalStorage } from '../../features/api/storage'
import { selectUserById, useGetUsersQuery, useSetUserDotaIDMutation } from '../../features/users/UsersApiSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { useGetDotaDataSyncMutation, useGetRecentMatchesQuery, useSyncRecentMatchesMutation } from '../../features/dotaAPI/dotaAPISlice'

const Profile = () => {

    const [profileData, setProfileData] = useState(null);
    const [profileName, setProfileName] = useState('')
    
    const {userID, username, status, dotaID} = useAuth()
    
    const [dID, setDID] = useState(dotaID)
    
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

    
    
    const [syncRecentMatches, {
        data: recentMatches,
        isLoading: idRecentLoading,
        isSuccess: isRecentSuccess,
        isError: isRecentError,
        error: recentError,
    }] = useSyncRecentMatchesMutation();
    

    const [refreshJWT] = useRefreshMutation();
    

    const [updateDotaID] = useSetUserDotaIDMutation();

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

    var id = "102296415"
    const onSaveClicked = async (e) => {
        e.preventDefault();
        // check if the data can be saved
        
        // now save the updated dota id
        updateDotaID({"id": userID, "DotaID": dID})

        // now resync the JWT:
        refreshJWT()
        console.log("SHOULD HAVE REFRESHED THE JWT")

    }

    const handleDotaIDInputChange = (e) => {
        setDID(e.target.value)
    }


    
    if (user) {
        return (
            <div className='profile page'>
        
                <h1 className='primary-heading'>Profile</h1>
                <hr></hr>
                <div>
                    <form>
                        <label htmlFor='DotaID'>Dota 2 ID</label>
                        <input name='DotaID' value={dID} onChange={handleDotaIDInputChange}></input>
                        <input className='form-submit' type="submit" value="Submit" onClick={onSaveClicked} />
                    </form>
        

                    <div className='settings-controls-container'>
                        <h1>Options</h1>
                        <div className='settings-controls'>
                            
                            <button className='form-submit' onClick={() => onLogoutClick()}>Log Out</button>

                            {
                                /*
                            <button className='form-submit' onClick={() => syncData({data: id})}>Sync</button>
                                */
                            }
                            <button className='form-submit' onClick={() => {
                                console.log("TEST SYNC BUTTON");
                                syncRecentMatches({data: dID})}}>Load Recent Matches</button>


                        </div>
                    </div>
                </div>
        
            </div>
          )
    } else {
        return null;
    }



}

export default Profile