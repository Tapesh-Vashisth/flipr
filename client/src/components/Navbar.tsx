import styles from "../styles/Navbar.module.css"
import React, { useState } from "react";
import "../styles/Navbarstyle.css"
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import PersonIcon from '@mui/icons-material/Person';
import ProfileDropdown from "../components/ProfileDropdown";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const Navbar = () => {
    const user = useAppSelector((state: any) => state.user);
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
<<<<<<< HEAD
            <div className={styles.logoCon}>
=======
             <div className={styles.logoCon} >
>>>>>>> 14d6a6c5000676a483093938d451ad5645e12124
                <TrendingUpIcon fontSize="large" sx={{color:"#fff"}} />
                <a href="/" className={styles.logo} >
                    <h4>
                        Stockhub
                    </h4>
                </a>
            </div>
            <div className={styles.optionsContainer}>
                <button>Stocks</button>
                <button>Companies</button>
                <ProfileDropdown />
            </div>
        </div>
    )
}

export default Navbar;