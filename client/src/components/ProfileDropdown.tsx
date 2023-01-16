import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../features/user/userSlice';
import PersonIcon from '@mui/icons-material/Person';
import { appActions } from '../features/appSlice';

const ProfileDropdown = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(logout()).unwrap().then(() => {
            navigate("/auth/login");
            dispatch(appActions.setSuccess({show: true, message: "logged out Succesfully"}));
        }).catch((err: any) => {
            if (err.message === "Network Error"){ 
                dispatch(appActions.setAlert({show: true, message: "Network error/Server Down!"}));
            } else {
                dispatch(appActions.setAlert({show: true, message: err.response.data.message}));
            }
        });
    }

    return (
        <div className="dropdown">
            {
                user.image ?
                <img className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src={user.image} alt="image" height={"45px"} width={"45px"} style={{ borderRadius: "100%", cursor: "pointer"}} />
                :
                <PersonIcon className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style = {{fontSize: "30px"}} />
            }
            <ul className="dropdown-menu dropdown-menu-dark">
                <div className="dropdown-item">
                    <h5>Hello {user.name.split(" ")[0]}</h5>
                </div>
                <div className="dropdown-item">
                    <NavLink style = {{background: "transparent", textDecoration: "none", color: "white"}} to="/account">Account</NavLink>
                </div>
                <div style={{ cursor: "pointer" }} className="dropdown-item" onClick={handleLogout}>Logout</div>
            </ul>
        </div>
    )
}

export default ProfileDropdown