import useInput from "../helper/Hooks/use-input";
import { useEffect, useState } from "react";
import styles from "../styles/SignUp.module.css"
import axiosInstance from "../api/axios"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signup } from "../features/user/userSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { appActions } from "../features/appSlice";
import LazyLoading from "../components/LazyLoading";
import AlertDismissable from "../components/Alert";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const {setShow, setAlert} = appActions;
    const [getOtpValid, setgetOtpValid] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);

    const [enableOTPButton, setEnableOTPButton] = useState<boolean>(true)
    const app = useAppSelector((state) => state.app);
    // const [error, setError] = useState<boolean>(false)
    // const [message, setMessage] = useState<string>("")
    
    const {
        value: enteredfullName,
        isValid: fullNameIsValid,
        haserror: fullNameHasError,
        valueChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler,
        reset: fullNameReset
    } = useInput((value: String) => value.trim() !== '');
    
    const {
        value: enteredpassword,
        isValid: passwordIsValid,
        haserror: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value: String) => value.trim() !== '');
    
    const otpInputHandler = async () => {
        try {
            const response = await axiosInstance.post("/users/sendotp", {email: enteredEmail});
            setgetOtpValid(true);
        } catch (err) {
            dispatch(setAlert({show: true, message: "There already exists an account with this email address!"}));
            setgetOtpValid(false);
            dispatch(setShow(true));
        }
    }

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
        if (!fullNameIsValid)
            return;
        if (!passwordIsValid)
            return;
        if (!emailIsValid)
            return;
        console.log(enteredEmail, enteredfullName, enteredpassword, otp);
        // server request 
        dispatch(signup({email: enteredEmail, name: enteredfullName, password: enteredpassword, otp: otp}))
        .unwrap()
        .then((response) => {
            console.log(response);
            setgetOtpValid(false);
            fullNameReset();
            emailReset();
            passwordReset();
            if (response.message === "User signed up successfully!") {
                navigate("/auth/login");
            } 
        }).catch((err) => {
            const status = err.response.status
            if (status == 409) {
                dispatch(setAlert({show: true, message: "An account with this email already exists!!"}))
            }
            if (status == 404) {
                dispatch(setAlert({show: true, message: "Please resend the OTP."}))
            }
            if (status == 400) {
                dispatch(setAlert({show: true, message: "Incorrect OTP! Please try again!"}))
            }
            if (status == 500) {
                dispatch(setAlert({show: true, message: "Server is down temporarily, please wait for some time"}))
            }
            else {
                dispatch(setAlert({show: true, message: "Network Error"}));
            }
        })
    }

    useEffect(() => {
        if (emailIsValid && !enableOTPButton) {
            setTimeout(() => {
                setEnableOTPButton(true)
            }, 60000)
        }
    }, [enableOTPButton, emailIsValid])


    const fullNameClasses = fullNameHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const passwordClasses = passwordHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (
        (user.loading) ? <LazyLoading /> :
        <>
            <AlertDismissable /> 
            <div className={styles.signupContainer}>
                <div className={styles.test}>
                    <div className={styles.welcomeTag} >
                        <h1>Welcome User</h1>
                        <h3>Sign up for free!</h3>
                    </div>
                    <img alt="signup" src="https://flevix.com/wp-content/uploads/2020/01/Fade-In-Background.svg" />
                </div>
                <div className={styles.test2} >
                    <form className={styles.formCenter} onSubmit={formSubmitHandler} >
                        <div className={fullNameClasses} >
                            {fullNameHasError && <p className="error-text" >*Required</p>}
                            <label htmlFor='name'>Name</label>
                            <input value={enteredfullName} onChange={fullNameChangeHandler} onBlur={fullNameBlurHandler} type='text' id='name' />
                        </div>
                        <div className={emailClasses}>
                            {emailHasError && <p className="error-text">Enter a valid e-mail.</p>}
                            <label htmlFor='name'>E-Mail</label>
                            <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='email' id='email' />
                        </div>
                        <div className={styles.otpForm} >
                            {emailIsValid && <button type="button" disabled={!enableOTPButton} onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                            {(getOtpValid && enteredEmail.length > 0) && <input className={styles.enterOtp} value = {otp} onChange = {(e) => {setOTP(e.target.value)}} ></input>}
                        </div>
                        <div className={passwordClasses}>
                            {passwordHasError && <p className="error-text" >*Required</p>}
                            <label htmlFor='pass1'>Password</label>
                            <div>
                                <input value={enteredpassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type={visible ? "text" : 'password'} id='pass1' />
                                {
                                    visible ? 
                                    <VisibilityOffIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                                    :
                                    <VisibilityIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
                                }
                            </div>
                        </div>
                        <div className='form-actions'>
                            <button type="submit" className={styles.submitButton} disabled={fullNameIsValid && passwordIsValid && emailIsValid && otp.length > 0  ? false: true} >Submit</button>
                        </div>
                        <hr className={styles.ruler} />

                        <div className={styles.underLinks} >
                            <NavLink to = "/auth/login">
                                <button style={{fontSize:"14px"}}>Already have an account? Login</button>    
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
