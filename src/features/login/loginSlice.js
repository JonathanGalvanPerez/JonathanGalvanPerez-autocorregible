import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestServices from '../../services/httpRequestService';

export const login = createAsyncThunk("login", async (values, thunkApi) => {
    try {
        return await RequestServices.login(values);
    } catch(error) {
        throw error;
    }
});

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        token: JSON.parse(localStorage.getItem('token')),
        currentRequestId: '',
        loading: 'idle',
        error: ''
    },
    reducers: {
        logout: (state) => {
            state.token = null;
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            if (action.meta.requestId === state.currentRequestId) {
                state.token = action.payload.token;
                state.loading = 'idle';
                state.error = '';
                state.currentRequestId = '';
            }
        },
        [login.pending]: (state, action) => {
            state.currentRequestId = action.meta.requestId;
            state.loading = 'pending';
        },
        [login.rejected]: (state, action) => {
            if (action.meta.requestId === state.currentRequestId) {
                state.currentRequestId = action.meta.requestId;
                state.loading = 'idle';
                state.error = action.error;
            }
        }  
    }
})

export const { logout } = loginSlice.actions;

export const isLoggedIn = (state) => state.login.token !== null;
export const isLoading = (state) => state.login.loading === 'pending';
export const getToken = (state) => state.login.token;

export default loginSlice.reducer;