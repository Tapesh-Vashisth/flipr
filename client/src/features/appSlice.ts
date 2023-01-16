import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    show: boolean
    message: string
    type: "error" | "success"
}

const initialState: initialState = {
    show: false,
    message: "",
    type: "error"
}

const appMainSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setAlert: (state, action: PayloadAction<{show: boolean, message: string}>) => {
            state.show = action.payload.show;
            state.message = action.payload.message;
            state.type = "error";
        },
        setSuccess: (state, action: PayloadAction<{show: boolean, message: string}>) => {
            state.show = action.payload.show;
            state.message = action.payload.message;
            state.type = "success";
        }
    },
    extraReducers: {

    }
});

export const appActions = appMainSlice.actions;
export default appMainSlice.reducer;
