import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

import React from 'react'
import { getTokenFromLocalStorage } from "../features/api/storage";

const useAuth = () => {
    
    let token = useSelector(selectCurrentToken)
    let isModerator = false
    let isAdmin = false
    let status = "User"
    let dotaID = ''

    if (!token) {
        token = getTokenFromLocalStorage();
    }


    if (token) {
        const decoded = jwtDecode(token)
        const {userID, username, roles, dotaID} = decoded.UserInfo

        isModerator = roles.includes('Moderator')
        isAdmin = roles.includes('Admin')

        if (isModerator) {
            status = "Manager"
        }
        if (isAdmin) {
            status = "Admin"
        }

        

        return {userID, username, roles, status, isModerator, isAdmin, dotaID}
    }


    return {username: '', roles: [], isModerator, isAdmin}

}

export default useAuth