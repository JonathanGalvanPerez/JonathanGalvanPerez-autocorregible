import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/login/loginSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    
    const handleLogoutButton = () => {
        dispatch(logout())
        console.log('deslogueado con exito');
    }
    return (
        <nav className="d-flex bg-primary pl-sm-3">
            <ul className="nav nav-tabs bg-primary ">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
            <button onClick={handleLogoutButton} className="alkemy-btn-danger ml-auto mr-2 mr-sm-3 rounded-md my-2" >Deslogearse</button>
        </nav>
    )
}
