import { useEffect } from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import { fetch } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import LazyLoading from "./LazyLoading";

const Protected = () => {
    const location = useLocation();    
    const user = useAppSelector((state) => state.user);

    return (
        user.loggedIn ?
                <Outlet />
            :
            user.loading ?
                <LazyLoading /> 
            :
            user.error ?
                <Navigate to = "/auth/login" state={{from: location}} replace />
            :
                <Outlet />
        )
}

export default Protected;