import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

interface user {
    name: string
    email: string
    accessToken: string | null
    loggedIn: boolean
    loading: boolean
}

const initialState: user = {
    name: "",
    email: "",
    accessToken: null,
    loggedIn: false,
    loading: false
}


interface signupCredentialsType {
    name: string
    email: string
    password: string
    otp: string
}

// signup 
export const signup = createAsyncThunk("/user/signup", async (credentials: signupCredentialsType, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/users/signup", credentials);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err);
    }
})

interface loginCredentialsType {
    email: string
    password: string
}

// login 
export const login = createAsyncThunk("/user/login", async (credentials: loginCredentialsType, {rejectWithValue}) => {
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
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
            })
    }
})


export const userActions = userSlice.actions;
export default userSlice.reducer;