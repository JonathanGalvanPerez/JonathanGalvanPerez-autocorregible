import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, cleanup } from './test-utils';
import userEvent from '@testing-library/user-event';
import { LOGIN_API_URL } from '../app/config';
import LoginPage from './../pages/LoginPage';
import { waitFor } from '@testing-library/dom';
import Alert from '../services/alertService';
import { useHistory } from 'react-router-dom';

jest.mock('../services/alertService');

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => false
}));

const server = setupServer(
  rest.post(LOGIN_API_URL, (req, res, ctx) => {
    if(req.body.email === 'challenge@alkemy.com' && req.body.password === 'react')
      return res(ctx.json({token: 'mytoken'}), ctx.delay(150));
    return res(ctx.json({error: 'Un error'}), ctx.delay(150), ctx.status(401));
  })
);

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

test('fail and call to error alert', async () => {
  render(<LoginPage />);
  userEvent.type(screen.getByLabelText("Email"), 'challenge@alkemy.com');
  userEvent.type(screen.getByLabelText("Contraseña"), 'buurreact');
  userEvent.click(screen.getByText(/Iniciar Sesión/i));
  await waitFor(() => expect(Alert.error).toBeCalledWith(
    "No se pudo iniciar sesión",
    "el email o la contraseña son incorrectos"
  ));
  expect(Alert.success).not.toBeCalled();
})

test('success and call to success alert', async () => {
  render(<LoginPage />);
  const history = useHistory();
  expect(Alert.success).not.toBeCalled();
  expect(history.push).not.toBeCalled();
  userEvent.type(screen.getByLabelText("Email"), 'challenge@alkemy.com');
  userEvent.type(screen.getByLabelText("Contraseña"), 'react');
  userEvent.click(screen.getByText(/Iniciar Sesión/i));
  await waitFor(() => expect(Alert.success).toBeCalledWith("Listo", "Ha iniciado sesion con exito"));
  expect(Alert.error).not.toBeCalled();
  expect(history.push).toBeCalledWith("/");
})
