import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { userSlice } from "./user/user.slice";

const reducers = combineReducers({
    reducer: userSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.reducer;

export default store;