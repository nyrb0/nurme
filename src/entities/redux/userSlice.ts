import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logIn } from '../../shared/utils/baseUrls';
import { UserInfoType } from '../../shared/types/userType';
type LoginParams = {
    valueEmailName: string;
    valuePassword: string;
};
type LoginRespose = {
    sessionId: string;
    sessionid: string;
};

type errorT = {
    err: string;
    key: string;
    mes: string;
};
export const loginId = createAsyncThunk<string, LoginParams>(
    'user/logindId',
    async ({ valueEmailName, valuePassword }, thunkAPI) => {
        try {
            const formData = new FormData();
            await formData.append('mail', valueEmailName);
            await formData.append('passwd', valuePassword);
            const responseFromServer = await axios.post(logIn, formData);
            const sessionId = await responseFromServer.data.sessionId;
            if (sessionId) {
                await localStorage.setItem('userSession', sessionId);
                return sessionId;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Failed to login');
        }
    }
);
type iniT = {
    userId: string | null;
    loading: boolean;
    error: null | string;
    fullDataAboutUser: UserInfoType | null;
};
const initialState: iniT = {
    userId: localStorage.getItem('userSession'),
    loading: false,
    error: null,
    fullDataAboutUser: null,
};
const authUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeAcc: state => {
            state.userId = null;
            localStorage.removeItem('userSession');
        },
        pushToData: (state, action: PayloadAction<UserInfoType>) => {
            state.fullDataAboutUser = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginId.pending, state => {
                state.loading = true;
            })
            .addCase(
                loginId.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    if (action.payload !== null) {
                        state.userId = action.payload;
                    }
                }
            )
            .addCase(loginId.rejected, state => {
                state.loading = false;
                state.error = 'Пользователь не пользователь не найден';
            });
    },
});
export const { removeAcc, pushToData } = authUser.actions;
export default authUser.reducer;
