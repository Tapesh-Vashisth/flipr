import useInput from "../helper/Hooks/use-input";
import styles from "../styles/Login.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../features/user/userSlice";
import LazyLoading from "../components/LazyLoading";
import { useState } from "react";
// import styles from "./Login.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AlertDismissable from "../components/Alert";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user)
    const [visible, setVisible] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const {
        value: enteredpassword,
        isValid: passwordIsValid,
        haserror: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value: String) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        haserror: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((value: String) => (value.includes("@") && value.includes(".")));

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!passwordIsValid)
        return;
        if (!emailIsValid)
        return;
        console.log(enteredEmail, enteredpassword);

        // server request   
        dispatch(login({email: enteredEmail, password: enteredpassword}))
        .unwrap()
        .then((response) => {
            console.log(response);
            emailReset();
            passwordReset();
            if (response.accessToken.length > 0) {
                navigate('/')
            }
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.status)
            const status = err.response.status
            if (status == 400) {
                setMessage("The password you have entered is wrong!")
                setError(true)
                setShow(true)
            }
            if (status == 404) {
                setMessage("No such user exists!")
                setError(true)
                setShow(true)
            }
            if (status == 500) {
                setError(true)
                setMessage("Server is down temporarily, please wait for some time")
                setShow(true)
            }
        })
    }

    const passwordClasses = passwordHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (
        (user.loading && !show) ? <LazyLoading /> :
        <>
            {show ? <AlertDismissable message={message} showState={show} /> : null}
            <div className={styles.signupContainer}>
                <div className={styles.test}>
                    <div className={styles.welcomeTag} >
                        <h1>Login to Your Account!</h1>
                    </div>
                    <img alt="signup" src="https://flevix.com/wp-content/uploads/2020/01/Fade-In-Background.svg" />
                </div>
                <div className={styles.test2}>
                    <form className={styles.formCenter} onSubmit={formSubmitHandler} >
                        <div className={emailClasses}>
                            {emailHasError && <p className="error-text">Entered a valid e-mail.</p>}
                            <label htmlFor='name'>E-Mail</label>
                            <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='text' id='email' />
                        </div>
                        <div className={passwordClasses}>
                            {passwordHasError && <p className="error-text" >*Required</p>}
                            <label htmlFor='name'>Password</label>
                            <div>
                                <input value={enteredpassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type={visible ? "text" : 'password'} id='name' />
                                {
                                    visible ? 
                                    <VisibilityOffIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                                    :
                                    <VisibilityIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
                                }
                            </div>
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={ (passwordIsValid && emailIsValid) ? false : true }>Login</button>

                        <hr className={styles.ruler} />

                        <div className={styles.underLinks} style={{fontSize:"14px"}} >
                            <NavLink to="/auth/forgotpassword">
                                <button>Forgot Password?</button>
                            </NavLink>
                            <span>||</span>
                            <NavLink to = "/auth/signup">
                                <button>Sign Up</button>    
                            </NavLink>
                        </div>

                    </form>
                </div>
            </div>
        </>
        
    );
};

export default Login;
