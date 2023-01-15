import Navbar from "../components/Navbar";
import SimpleAccordion from "../components/Acoordian";
import styles from "../styles/Account.module.css"
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

const Account = () => {

    return (
        <>
            <Navbar />
            <div className={styles.accBackdrop}>
                <div className={styles.accContainer} >
                    <button className={styles.cancel} >< HighlightOffTwoToneIcon fontSize="large" sx={{ color: "#000;", borderRadius: "50%", backgroundColor: "white" }} /></button>

                    <div className={styles.accountdetails} >
                        <h3>Account Details</h3>
                        <input type="text" value="sosenk" />
                        <input type="text" value="sosenk@gmail.com" />
                    </div>
                    <div className={styles.accordianBox} >
                        <SimpleAccordion />
                    </div>
                    <div className={styles.buttonHolder} >
                        <button className={styles.update}  >Update Settings</button>
                        <button className={styles.delete} >Delete Account</button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Account;