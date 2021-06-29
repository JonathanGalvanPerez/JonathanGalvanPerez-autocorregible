import React from 'react'
import { isLoggedIn, login } from './../features/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import LoginForm from './../components/login/LoginForm';
import Alert from '../services/alertService';

export default function LoginPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const _isLoggedIn = useSelector(isLoggedIn);

    const onSubmit = (values, actions) => {
        dispatch(login(values))
            .then((result) => {
                if(result.error)
                    Alert.error('No se pudo iniciar sesión', 'el email o la contraseña son incorrectos');
                else {
                    Alert.success('Listo', 'Ha iniciado sesion con exito');
                    history.push('/');
                }
            })
    }
    if(_isLoggedIn)
        return (<Redirect to="/home" />)
    return (
        <div className="container bg-primary">
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}
