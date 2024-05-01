import React, { Fragment } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from '../navbar/Navbar';
import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";
import { Signup } from "../../pages/signup/Signup";

export const RoutesList = () => {
    const { authIsReady, user } = useAuthContext()
    return (
        <Fragment>
            {authIsReady &&
                (<BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route
                            path='/'
                            element={user ? <Home /> : <Navigate to='/login' />}
                        />
                        <Route
                            path='/login'
                            element={user ? <Navigate to='/' /> : <Login />} />
                        <Route
                            path='/signup'
                            element={user ? <Navigate to='/' /> : <Signup />} />
                    </Routes>
                </BrowserRouter>
                )}
        </Fragment>
    )
}
