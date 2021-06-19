import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
    logged: false,
    info: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn: (state: UserState, action: PayloadAction<UserState>) => {
            state.logged = action.payload.logged;
            state.info = action.payload.info;
        },
        logOut: (state: UserState, action: PayloadAction<UserState>) => {
            state.logged = action.payload.logged;
            state.info = action.payload.info;
        }
    }
});

export const {
    actions: {
        logIn: logInAction,
        logOut: logOutAction
    }
} = userSlice;