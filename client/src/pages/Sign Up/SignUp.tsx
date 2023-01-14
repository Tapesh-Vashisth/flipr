import useInput from "../Hooks/use-input";
import { useState } from "react";
import styles from "./SignUp.module.css";


const SignUp = () => {
    const [getOtpValid, setgetOtpValid] = useState(false);

    const otpInputHandler = () => {
        setgetOtpValid(true);
    }

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

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        haserror: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((value: String) => (value.includes("@") && value.includes(".com")));

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!fullNameIsValid)
            return;
        if (!passwordIsValid)
            return;
        if (!emailIsValid)
            return;
        setgetOtpValid(false);
        emailReset();
        passwordReset();
        fullNameReset();
    }


    const fullNameClasses = fullNameHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const passwordClasses = passwordHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (

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
                    <div className={passwordClasses}>
                        {passwordHasError && <p className="error-text" >*Required</p>}
                        <label htmlFor='name'>Password</label>
                        <input value={enteredpassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type='text' id='name' />
                    </div>
                    <div className={emailClasses}>
                        {emailHasError && <p className="error-text">Entered a valid e-mail.</p>}
                        <label htmlFor='name'>E-Mail</label>
                        <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='text' id='email' />
                    </div>
                    <div className={styles.otpForm} >
                        {emailIsValid && <button type="button" onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                        {getOtpValid && <input className={styles.enterOtp} ></input>}
                    </div>
                    <div className='form-actions'>
                        <button type="submit" className={styles.submitButton} >Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
