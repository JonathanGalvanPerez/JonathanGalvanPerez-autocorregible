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
        <nav className="d-flex bg-primary px-2 px-sm-3">
            <img src="/images/apple-touch-icon.png" alt="logo icon" height="50px" className="rounded-md my-2 mr-2" />
            <ul className="nav nav-tabs bg-primary ">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">Buscar</Link>
                </li>
            </ul>
            <button onClick={handleLogoutButton} className="alkemy-btn-danger ml-auto rounded-md my-2" >Deslogearse</button>
        </nav>
    )
}
