import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
});

window.onbeforeunload = () => {
  localStorage.setItem('token', JSON.stringify(store.getState().login.token));
}
