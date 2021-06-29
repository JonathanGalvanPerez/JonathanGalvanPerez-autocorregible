import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './loginForm.css';
import { useSelector } from 'react-redux';
import { isLoading } from './../../features/login/loginSlice';

export default function LoginForm({ onSubmit }) {
    const _isLoading = useSelector(isLoading);
    const initialValues = { email: '', password: ''};
    const validationSchema = Yup.object({
        email: Yup.string().required('Este campo es requerido'),
        password: Yup.string().required('Este campo es requerido')
    });
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form>
                <Field name="email" >
                    {({ field, form }) => (
                        <div className="form-group">
                            <label htmlFor="email" className="alkemy-form-label">Email</label>
                            <input type="email" className="alkemy-form-control" {...field} />
                            <ErrorMessage name="email" className="text-dangers" />
                        </div>
                    )}
                </Field>
                <Field name="password" >
                    {({ field, form }) => (
                        <div className="form-group">
                            <label htmlFor="Contraseña" className="alkemy-form-label">Contraseña</label>
                            <input type="password" className="alkemy-form-control" {...field} />
                            <ErrorMessage name="password" />
                        </div>
                    )}
                </Field>
                
                <button className="alkemy-btn-primary" type="submit">
                    {_isLoading?
                        <div className="d-flex align-items-center">
                            <strong className="mr-2">Cargando... </strong>
                            <div className="spinner-border alkemy-spinner" role="status" aria-hidden="true"></div>
                        </div>
                    :
                        'Iniciar Sesion'
                    }
                </button>
            </Form>
        </Formik>
    )
}
