import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

interface user {
    accessToken: string | null
}

const initialState: user = {
    accessToken: null
}

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setAccessToken: (state, action: PayloadAction <string | null>) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;