import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from './test-utils';
import userEvent from '@testing-library/user-event';
import LoginForm from './../components/login/LoginForm';

test('render and submitting the form', async () => {
    const handleSubmit = jest.fn((values, _) => values);
    render(<LoginForm  onSubmit={handleSubmit} />);
    // it should display the form
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    // it should submit the values
    userEvent.type(screen.getByLabelText("Email"), 'test@test.com');
    userEvent.type(screen.getByLabelText("Contraseña"), 'test');
    userEvent.click(screen.getByText(/Iniciar Sesión/i));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
    expect(handleSubmit).toHaveReturnedWith({
        email: 'test@test.com', password: 'test'
    });
})

test('fail validators and display error message', async () => {
    render(<LoginForm />);
    userEvent.tab();
    expect(screen.getByLabelText("Email")).toHaveFocus();
    expect(screen.queryByText("Este campo es requerido")).not.toBeInTheDocument();
    userEvent.tab();
    expect(await screen.findByText("Este campo es requerido")).toBeInTheDocument();
    userEvent.tab();
    expect(await screen.findAllByText("Este campo es requerido")).toHaveLength(2);
    userEvent.type(screen.getByLabelText("Email"), 'challengealkemycom');
    expect(await screen.findByText("Debe ser un email valido")).toBeInTheDocument();
    expect(screen.getAllByText("Este campo es requerido")).toHaveLength(1);
    userEvent.type(screen.getByLabelText("Email"), 'challenge@alkemy.com');
    await waitForElementToBeRemoved(() => screen.queryByText("Debe ser un email valido"));
    userEvent.type(screen.getByLabelText("Contraseña"), 'buurreact');
    await waitForElementToBeRemoved(() => screen.queryByText("Este campo es requerido"));
})