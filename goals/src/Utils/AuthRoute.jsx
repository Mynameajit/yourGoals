import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = ({ isAuth, path = 'signUp', children }) => {
    if (!isAuth) {
        return <Navigate to={path} replace />
    }
    return children ? children : <Outlet />
}

export default AuthRoute