import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

interface user {
    name: string
    email: string
    accessToken: string | null
    loggedIn: boolean
    loading: boolean
    error: any
}

const initialState: user = {
    name: "",
    email: "",
    accessToken: null,
    loggedIn: false,
    loading: false,
    error: null
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
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err);
    }
})

// fetchUser
export const fetch = createAsyncThunk("/user/fetch", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/users/check");
        return response.data;
    } catch (err) {
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
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.accessToken = action.payload.accessToken;
                state.loggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loggedIn = false;
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetch.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loggedIn = true;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.error = null;
            })
            .addCase(fetch.rejected, (state, action) => {
                state.error = action.error.message;
                state.loggedIn = false;
            })
            .addMatcher(isAnyOf(
                login.rejected,
                signup.rejected,
                login.fulfilled,
                signup.fulfilled),(state) => {
                state.loading = false
            })
    }
})


export const userActions = userSlice.actions;
export default userSlice.reducer;