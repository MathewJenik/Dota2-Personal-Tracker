import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({allowedRoles}) => {

    console.log("REQ AUTH ROLES: ", allowedRoles)

    const location = useLocation()
    const { roles} = useAuth()

    console.log("ROLES FOUND? ARE: ", roles)
    const content = (
        roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace />
    )

        return content;
}

export default RequireAuth