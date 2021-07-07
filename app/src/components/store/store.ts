import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { userSlice } from './user/user.slice';
import thunk from 'redux-thunk';

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