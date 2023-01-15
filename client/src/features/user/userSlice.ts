import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { startTransition } from "react";
import axiosInstance from "../../api/axios";

interface user {
    name: string
    email: string
    accessToken: string | null
    loggedIn: boolean
    loading: boolean
    error: any
    image: string | null
}

const initialState: user = {
    name: "",
    email: "",
    accessToken: null,
    loggedIn: false,
    loading: false,
    error: null,
    image: ""
}


interface signupCredentialsType {
    name: string
    email: string
    password: string
    otp: string
    image: string
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

// logout 
export const logout = createAsyncThunk("/user/logout", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/users/logout");
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
        reset: () => initialState,
        setAccessToken: (state, action: PayloadAction <string | null>) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.image = action.payload.image;
                state.accessToken = action.payload.accessToken;
                state.loggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loggedIn = false;
                state.error = action.error.message;
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
                state.image = action.payload.image;
                state.error = null;
            })
            .addCase(fetch.rejected, (state, action) => {
                state.error = action.error.message;
                state.loggedIn = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.accessToken = "";
                state.email = "";
                state.name = "";
                state.loggedIn = false;
                state.error = null;
            })
            .addMatcher(isAnyOf(
                login.rejected,
                signup.rejected,
                login.fulfilled,
                signup.fulfilled,
                fetch.rejected,
                fetch.fulfilled,
                logout.rejected,
                logout.fulfilled
                ),(state) => {
                state.loading = false
            })
            .addMatcher(isAnyOf(
                login.pending,
                signup.pending,
                fetch.pending,
                logout.pending,
                ), (state) => {
                state.loading = true;
            })
    }
})


export const userActions = userSlice.actions;
export default userSlice.reducer;