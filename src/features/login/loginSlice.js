import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestServices from './../../services/httpRequestServices';

export const login = createAsyncThunk("logIn", async (values, thunkApi) => {
    const { data } = await RequestServices.login(values);
    return data;
});

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        token: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.meta.requestId === state.currentRequestId.requestId) {
                state.token = action.payload.token;
                state.loading = 'idle';
                state.error = '';
                state.currentRequestId = '';
            }
        },
        [login.pending]: (state, action) => {
            state.currentRequestId = action.meta.currentRequestId;
            state.loading = 'pending';
        },
        [login.rejected]: (state, action) => {
            if (action.meta.requestId === state.currentRequestId.requestId) {
                state.currentRequestId = action.meta.currentRequestId;
                state.loading = 'idle';
                state.error = action.error;
            }
        }  
    }
})

export const { logout } = loginSlice.actions;

export const isLoggedIn = (state) => state.login.token !== null;
export const getToken = (state) => state.login.token;

export default loginSlice.reducer