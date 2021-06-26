import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';

const preloadedState = {
  login: {
    token: localStorage.getItem('token')
  },
};

export const store = configureStore({
  reducer: {
    login: loginReducer
  },
  preloadedState
});

window.onbeforeunload = () => {
  localStorage.setItem('token', store.getState().login.token);
}
