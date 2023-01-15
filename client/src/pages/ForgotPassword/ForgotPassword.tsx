import {useState, useRef} from 'react';
import useInput from "../Hooks/use-input";
import styles from "./ForgotPassword.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import axiosInstance from "../../api/axios";
import { login } from "../../features/user/userSlice";

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const otpRef = useRef<HTMLButtonElement>(null);
    const [view, setView] = useState<number>(0);
    const [getOtpValid, setgetOtpValid] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>("");

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
        haserror: passwordHasError2,
        valueChangeHandler: passwordChangeHandler2,
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
        if (view === 0){
            if (!emailIsValid)
            return;
            console.log(enteredEmail);

            try {
                
            } catch (err) {

            }

        } else {

        }

        // server request   
    }

    const otpToggler = (value: boolean) => {
        if (otpRef.current) {
            otpRef.current.disabled = value;
        }
    }

    const otpInputHandler = async () => {
        otpToggler(true)
        try {
            const response = await axiosInstance.post("/users/passwordotp", {email: enteredEmail});
            setgetOtpValid(false);
            otpToggler(false)
        } catch (err) {
            otpToggler(false)
            alert("something went wrong")
        }
    }

    const passwordClasses = passwordHasError1 ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (

        <div className={styles.signupContainer}>
            <div className={styles.test}>
                <div className={styles.welcomeTag} >
                    <h1>Create new password</h1>

                </div>
                <img alt="signup" src="https://flevix.com/wp-content/uploads/2020/01/Fade-In-Background.svg" />
            </div>
            <div className={styles.test2} >
                <form className={styles.formCenter} onSubmit={formSubmitHandler} >
                    {
                        view === 0 ?
                        <>
                            <div className={emailClasses}>
                                {emailHasError && <p className="error-text">Enter a valid e-mail.</p>}
                                <label htmlFor='name'>E-Mail</label>
                                <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='text' id='email' />
                            </div>

                            <div className={styles.otpForm} >
                                {emailIsValid && <button type="button" ref = {otpRef} onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                                {getOtpValid && <input className={styles.enterOtp} value = {otp} onChange = {(e) => {setOTP(e.target.value)}}></input>}
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={ (emailIsValid) ? false : true }>Next</button>
                        </>
                        :
                        <>
                            <div className={passwordClasses}>
                                {passwordHasError1 && <p className="error-text" >*Required</p>}
                                <label htmlFor='name'>Password</label>
                                <input value={enteredpassword1} onChange={passwordChangeHandler1} onBlur={passwordBlurHandler1} type='password' id='pass1' />
                            </div>

                            <div className={passwordClasses}>
                                {passwordHasError2 && <p className="error-text" >*Required</p>}
                                <label htmlFor='name'>Password</label>
                                <input value={enteredpassword2} onChange={passwordChangeHandler2} onBlur={passwordBlurHandler2} type='password' id='pass2' />
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={ (emailIsValid) ? false : true }>Change Password</button>
                        </>
                    }
                    

                    <hr className={styles.ruler} />

                    <div className={styles.underLinks} >
                        <NavLink to = "/auth/signup">
                            <button>Sign Up</button>    
                        </NavLink>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default ForgotPassword;
