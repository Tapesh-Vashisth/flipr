import useInput from "../Hooks/use-input";
import styles from "./Login.module.css"
import { NavLink } from "react-router-dom";

const Login = () => {

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

        if (!passwordIsValid)
            return;
        if (!emailIsValid)
            return;

        emailReset();
        passwordReset();
    }

    const passwordClasses = passwordHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (

        <div className={styles.signupContainer}>
            <div className={styles.test}>
                <div className={styles.welcomeTag} >
                    <h1>Login to Your Account!</h1>

                </div>
                <img alt="signup" src="https://flevix.com/wp-content/uploads/2020/01/Fade-In-Background.svg" />
            </div>
            <div className={styles.test2} >
                <form className={styles.formCenter} onSubmit={formSubmitHandler} >
                    <div className={emailClasses}>
                        {emailHasError && <p className="error-text">Entered a valid e-mail.</p>}
                        <label htmlFor='name'>E-Mail</label>
                        <input value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} type='text' id='email' />
                    </div>
                    <div className={passwordClasses}>
                        {passwordHasError && <p className="error-text" >*Required</p>}
                        <label htmlFor='name'>Password</label>
                        <input value={enteredpassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type='text' id='name' />
                    </div>


                    <button type="submit" className={styles.submitButton} disabled={ (passwordIsValid && emailIsValid) ? true : false } >Login</button>
                    <hr className={styles.ruler} />

                    <div className={styles.underLinks} >
                        <button>Forgot Password?</button>
                        <span>||</span>
                        <NavLink to = "/auth/signup">
                            <button>Sign Up</button>    
                        </NavLink>
                    </div>


                </form>
            </div>
        </div>

    );
};

export default Login;
