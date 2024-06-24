import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { animeData } from '../API/animeData';
import { setupListeners } from '@reduxjs/toolkit/query';
import storageForCateGory from './CategorySlice';
import userSlice from './userSlice';
import { userData } from '../API/user/UserData';

const rootAnimeReducer = combineReducers({
    [animeData.reducerPath]: animeData.reducer,
    [userData.reducerPath]: userData.reducer,
    catego: storageForCateGory,
    auth: userSlice,
});

export const store = configureStore({
    reducer: rootAnimeReducer,
    middleware: getDefaultMidlleWere =>
        getDefaultMidlleWere().concat(
            animeData.middleware,
            userData.middleware
        ),
});

setupListeners(store.dispatch);
export type Approot = ReturnType<typeof rootAnimeReducer>;
export type Appstore = typeof store;
export type AppDispatch = Appstore['dispatch'];
