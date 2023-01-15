import styles from "./Navbar.module.css"
import React, { useState } from "react";
import "./Navbarstyle.css"
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/user/userSlice";

const Navbar = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [navbar, setnavbar] = useState(false);
    const target = document;
    
    let classesNav =!navbar? "navbarContainer transparencyCheck":"navbarContainer blockColorCheck";

    target.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {
            setnavbar(true);
        }else{
            setnavbar(false);
        }
    })

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(logout()).unwrap().then(() => {
            navigate("/auth/login");
        }).catch((err) => {
            alert("logout failed");
        });
    }
    
    return (
        <div className={classesNav} id="Navbar" >
            <div>
                <a href="/" className={styles.logo} >
                    <h4 >
                        Stockhub
                    </h4>
                </a>
            </div>
            <div className={styles.optionsContainer}>
                <button>Stocks</button>
                <button>Companies</button>
                {
                    user.loggedIn ? 
                        <button onClick={handleLogout}>Logout</button>
                    :
                        <NavLink to="/auth/login">
                            <button>Login</button>
                        </NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar;