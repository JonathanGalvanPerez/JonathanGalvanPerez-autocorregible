import React from 'react'
import MainRoutes from './../routes/MainRoutes';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../features/login/loginSlice';
import { Redirect } from 'react-router-dom';
import Navbar from '../components/header/Navbar';

export default function MainPage() {
    const _isLoggedIn = useSelector(isLoggedIn);

    if(!_isLoggedIn)
        return (
            <Redirect to="/login" />
        )
    return (
        <div className="container p-0">
            <Navbar />
            <div className="p-2 bg-light">
                <MainRoutes />
            </div>
        </div>
    )
}
