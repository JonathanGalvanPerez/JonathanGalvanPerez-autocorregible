import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, cleanup } from './test-utils';
import userEvent from '@testing-library/user-event';
import { LOGIN_API_URL } from '../app/config';
import LoginPage from './../pages/LoginPage';
import Alert from '../services/alertService';
import { expect } from '@jest/globals';

const server = setupServer(
  rest.post(LOGIN_API_URL, (req, res, ctx) => {
    if(req.body.email === 'challenge@alkemy.com' && req.body.password === 'react')
        return res(ctx.json({token: 'mytoken'}), ctx.delay(150));
    else
        return res(ctx.json({error: 'Un error'}), ctx.delay(150), ctx.status(401));
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  cleanup();
  server.resetHandlers();
})
afterAll(() => server.close())

test('render LoginPage', async () => {
  render(<LoginPage />);
  expect(screen.getByText("Inicia Sesión")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
})

test('success and display success dialog', async () => {
  render(<LoginPage />);
  userEvent.type(screen.getByLabelText("Email"), 'challenge@alkemy.com');
  userEvent.type(screen.getByLabelText("Contraseña"), 'react');
  userEvent.click(screen.getByText(/Iniciar Sesión/i));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
  expect(await screen.findByText('Ha iniciado sesion con exito')).toBeInTheDocument();
})
/*
test('fail and display alert dialog', async () => {
  render(<LoginPage />);
  userEvent.type(screen.getByLabelText("Email"), 'challenge@alkemy.com');
  userEvent.type(screen.getByLabelText("Contraseña"), 'buurreact');
  userEvent.click(screen.getByText(/Iniciar Sesión/i));
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
  expect(await screen.findByText('No se pudo iniciar sesión')).toBeInTheDocument();
  userEvent.click(screen.getByText(/OK/i));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
})
*/