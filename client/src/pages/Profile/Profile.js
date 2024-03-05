import React, { useEffect } from 'react'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { removeTokenFromLocalStorage } from '../../features/api/storage'
import { selectUserById, useGetUsersQuery } from '../../features/users/UsersApiSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'

const Profile = ({userID}) => {

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


    //value={`${user.id}`
    console.log("USERID: ", userID)

    const user = useSelector(state => 
        selectUserById(state, userID)
    )
    

    if (user) {
        return (
            <div className='profile page'>
        
                <h1 className='primary-heading'>Profile</h1>
                <div>
                    <form>
                        <label htmlFor='DotaID'>Dota 2 ID</label>
                        <input name='DotaID' value={`1`}></input>
                    </form>
        
                    <button onClick={() => onLogoutClick()}>Log Out</button>
                </div>
        
            </div>
          )
    } else {
        return null;
    }



}

export default Profile