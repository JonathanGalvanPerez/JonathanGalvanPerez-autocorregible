import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './loginForm.css';
import { useSelector } from 'react-redux';
import { isLoading } from './../../features/login/loginSlice';

export default function LoginForm({ onSubmit }) {
    const _isLoading = useSelector(isLoading);
    const initialValues = { email: '', password: ''};
    const validationSchema = Yup.object({
        email: Yup.string().email('Debe ser un email valido').required('Este campo es requerido'),
        password: Yup.string().required('Este campo es requerido')
    });
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <div className="col-md-8 p-0 mx-auto">
                    <Field name="email" >
                        {({ field, form }) => (
                            <div className="form-group">
                                <label htmlFor="email-input" className="alkemy-form-label">Email</label>
                                <input type="email" className="alkemy-form-control" id="email-input" {...field} />
                                {form.errors.email && form.touched.email &&
                                    <div className="alkemy-alert-danger" >{form.errors.email}</div>
                                }
                            </div>
                        )}
                    </Field>
                    <Field name="password" >
                        {({ field, form }) => (
                            <div className="form-group">
                                <label htmlFor="password-input" className="alkemy-form-label">Contraseña</label>
                                <input type="password" className="alkemy-form-control" id="password-input" {...field} />
                                {form.errors.password && form.touched.password &&
                                    <div className="alkemy-alert-danger" >{form.errors.password}</div>
                                }
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
                            'Iniciar Sesión'
                        }
                    </button>
                </div>
            </Form>
        </Formik>
    )
}
