import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { animeData } from "../API/animeData";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootAnimeReducer = combineReducers({
    [animeData.reducerPath]: animeData.reducer,
})

export const store = configureStore({
    reducer: rootAnimeReducer,
    middleware: (getDefaultMidlleWere) => getDefaultMidlleWere().concat(animeData.middleware)
});

setupListeners(store.dispatch);
export type Approot = ReturnType<typeof rootAnimeReducer>;
export type Appstore = typeof store;
export type AppDispatch = Appstore['dispatch'];
