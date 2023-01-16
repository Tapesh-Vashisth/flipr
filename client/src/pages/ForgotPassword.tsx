import React, {useState, useEffect, useRef} from 'react';
import useInput from "../helper/Hooks/use-input";
import styles from "../styles/ForgotPassword.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axiosInstance from "../api/axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { appActions } from '../features/appSlice';
import LazyLoading from '../components/LazyLoading';
import AlertDismissable from '../components/Alert';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const app = useAppSelector((state) => state.app);
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user)
    const otpRef = useRef<HTMLButtonElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [getOtpValid, setgetOtpValid] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>("");
    const {setShow, setAlert} = appActions;
    const [enableOTPButton, setEnableOTPButton] = useState<boolean>(true)

    const {
        value: enteredpassword1,
        isValid: passwordIsValid1,
        haserror: passwordHasError1,
        valueChangeHandler: passwordChangeHandler1,
        inputBlurHandler: passwordBlurHandler1,
        reset: passwordReset1
    } = useInput((value: String) => value.trim() !== '');

    const {
        value: enteredpassword2,
        isValid: passwordIsValid2,
        valueChangeHandler:passwordChangeHandler2,
        inputBlurHandler: passwordBlurHandler2,
        reset: passwordReset2
    } = useInput((value: String) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        haserror: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((value: String) => (value.includes("@") && value.includes(".")));

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailIsValid)
        return;
        console.log(enteredEmail);
        if (!passwordIsValid1)
        return;
        if (!passwordIsValid2)
        return;
        
        // server request   
        console.log(enteredEmail, otp, enteredpassword1);
        try {
            const res = await axiosInstance.post("/users/resetpassword", {email: enteredEmail, otp: otp, password: enteredpassword1});
            console.log(res)
            if (res.status == 200) {
                dispatch(appActions.setSuccess({show: true, message: "password successfully updated!"}));
                navigate('/auth/login')
            }
        } catch (err: any) {
            console.log(err);
            const status = err.response.status
            if (status == 500) {
                dispatch(setAlert({show: true, message: "Server is down temporarily, please wait for some time"}));
            }
            if (status == 400) {
                dispatch(setAlert({show: true, message: "Incorrect OTP! Please try again!"}));
            }
            else {
                dispatch(setAlert({show: true, message: "Network Error"}));
            }
        }
    }

    const otpToggler = (value: boolean) => {
        if (otpRef.current) {
            otpRef.current.disabled = value;
        }
    }

    const otpInputHandler = async () => {
        console.log("hello")
        otpToggler(true)
        try {
            const res = await axiosInstance.post("/users/passwordotp", {email: enteredEmail});
            setgetOtpValid(true);
            otpToggler(false)
        } catch (err: any) {
            otpToggler(false)
            console.log(err)
            const status = err.response.status
            
            if (status == 404) {
                dispatch(setAlert({show: true, message: "No such user exists!"}));
            }
        }
    }

    useEffect(() => {
        if (emailIsValid && !enableOTPButton) {
            setTimeout(() => {
                setEnableOTPButton(true)
            }, 60000)
        }
    }, [enableOTPButton, emailIsValid])

    const passwordClasses = passwordHasError1 ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (
        (user.loading) ? <LazyLoading /> :
        <>
            <AlertDismissable />
            <div className={styles.signupContainer}>
                <div className={styles.test}>
                    <div className={styles.welcomeTag} >
                        <h1>Forgot Password??</h1>
                        <h2>Don't worry we got you!</h2>
                    </div>
                    <img alt="signup" src="https://flevix.com/wp-content/uploads/2020/01/Fade-In-Background.svg" />
                </div>
                <div className={styles.test2} >
                <form className={styles.formCenter} onSubmit={formSubmitHandler} >
                    <div className={emailClasses}>
                        {emailHasError && <p className={styles['error-text']}>Enter a valid e-mail.</p>}
                        <label htmlFor='name'>E-Mail</label>
                        <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='text' id='email' />
                    </div>
                    <div className={styles.otpForm} >
                        {emailIsValid && <button type="button" ref = {otpRef} onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                        {getOtpValid && <input className={styles.enterOtp} value = {otp} onChange = {(e) => {setOTP(e.target.value)}}></input>}
                    </div>
                    <div className={passwordClasses}>
                        {passwordHasError1 && <p className={styles['error-text']} >*Required</p>}
                        <label htmlFor='name'>New Password</label>
                        <div>
                            <input value={enteredpassword1} onChange={passwordChangeHandler1} onBlur={passwordBlurHandler1} type={visible ? "text" : 'password'} id='pass1' />
                            {
                                visible ? 
                                <VisibilityOffIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                                :
                                <VisibilityIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
                            }
                        </div>
                    </div>

                    <div className={passwordClasses}>
                        {((enteredpassword2.length > 0 && enteredpassword1.length > 0) && (enteredpassword1 !== enteredpassword2)) && <p className={styles.errorText} style={{color:"#e71e1e"}} >Passwords must match</p>}
                        <label htmlFor='name'>Enter Password Again</label>
                        <div>
                            <input value={enteredpassword2} onChange={passwordChangeHandler2} onBlur={passwordBlurHandler2} type={visible ? "text" : 'password'} id='pass2' />
                            {
                                visible ? 
                                <VisibilityOffIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                                :
                                <VisibilityIcon style = {{position: "absolute", right: "8px", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
                            }
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={ (emailIsValid && passwordIsValid1 && passwordIsValid2 && (enteredpassword1 === enteredpassword2)) ? false : true }>Change Password</button>
                    

                    <hr className={styles.ruler} />

                    <div className={styles.underLinks} style={{fontSize:"14px"}} >
                        <NavLink to = "/auth/signup">
                            <button>Sign Up</button>    
                        </NavLink>
                        <span> || </span>
                        <NavLink to="/auth/login">
                            <button>Login</button>
                        </NavLink>
                    </div>

                </form>
            </div>
        </div>
        </>
    );
};

export default ForgotPassword;
