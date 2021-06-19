import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './root-reducer';

const store = configureStore({ reducer: reducer });

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;

export default store;