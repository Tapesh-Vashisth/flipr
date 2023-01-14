import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

interface user {
    email: string
    accessToken: string | null
}

const initialState: user = {
    email: "",
    accessToken: null
}


// signup 
const signup = createAsyncThunk("user/signup", async (credentials, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/users/signup", credentials);
    } catch (err: any) {
        return rejectWithValue(err);
    }
})


// login 
const login = createAsyncThunk("user/login", async (credentials, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/users/login", credentials);
    } catch (err: any) {
        return rejectWithValue(err);
    }
})


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