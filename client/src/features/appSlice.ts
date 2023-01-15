import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    show: boolean
}

const initialState: initialState = {
    show: false
}

const appMainSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        }
    },
    extraReducers: {

    }
});

export const appActions = appMainSlice.actions;
export default appMainSlice.reducer;
