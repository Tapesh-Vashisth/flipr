import styles from "./Navbar.module.css"
import { useState } from "react";
import "./Navbarstyle.css"
const Navbar = () => {
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
    
    return (
        <div className={classesNav} id="Navbar" >
            <div style={{marginLeft:'1rem'}} >
                <a href="/" className={styles.logo} >
                    <h4 >
                        Flipper
                    </h4>
                </a>
            </div>
            <div className={styles.optionsContainer}>
                <button>Stocks</button>
                <button>Companies</button>
                <button>Login</button>
            </div>
        </div>
    )
}

export default Navbar;