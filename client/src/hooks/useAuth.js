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

    if (!token) {
        token = getTokenFromLocalStorage();
    }


    console.log("TOKEN FROM STRG: ", token)

    console.log(token)

    if (token) {
        const decoded = jwtDecode(token)
        const {userID, username, roles} = decoded.UserInfo

        isModerator = roles.includes('Moderator')
        isAdmin = roles.includes('Admin')

        if (isModerator) {
            status = "Manager"
        }
        if (isAdmin) {
            status = "Admin"
        }

        return {userID, username, roles, status, isModerator, isAdmin}
    }


    return {username: '', roles: [], isModerator, isAdmin}

}

export default useAuth