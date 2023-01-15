import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../features/user/userSlice';

const ProfileDropdown = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(logout()).unwrap().then(() => {
            navigate("/auth/login");
        }).catch((err) => {
            alert("logout failed");
        });
    }

    return (
        <div className="dropdown">
            <img className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src={(user.image != "" && user.image != null) ? user.image : "https://toppng.com/uploads/preview/file-svg-profile-icon-vector-11562942678pprjdh47a8.png"} alt="image" height={"45px"} width={"45px"} style={{ borderRadius: "100%", cursor: "pointer"}} />
            <ul className="dropdown-menu dropdown-menu-dark">
                <div className="dropdown-item">
                    <h5>Hello {user.name.split(" ")[0]}</h5>
                </div>
                <NavLink className="dropdown-item" style = {{background: "transparent"}} to="#">Account</NavLink>
                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
            </ul>
        </div>
    )
}

export default ProfileDropdown