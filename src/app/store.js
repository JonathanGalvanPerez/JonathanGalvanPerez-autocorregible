import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    team: teamReducer
  }
});

window.onbeforeunload = () => {
  localStorage.setItem('token', JSON.stringify(store.getState().login.token));
}
