import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import React from 'react'

const PersistLogin = () => {
    
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    // used for react 18 strict mode
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }

            if (!token && persist) {
                verifyRefreshToken()
            }
        }

        return () => effectRan.current = true

    })

    let content;

    if (!persist) {
        content = <Outlet />
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = (<>
            <p>{error.data?.message}</p>
            <Link to={"/login"}>Please Login Again</Link>
        </>
        )
    } else if (isSuccess && trueSuccess) {
        content = <Outlet />
    }

    return content
}

export default PersistLogin