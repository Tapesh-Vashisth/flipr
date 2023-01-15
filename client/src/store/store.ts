import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import appReducer from "../features/appSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})

export default store;
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch