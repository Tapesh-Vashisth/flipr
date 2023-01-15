import useInput from "../helper/Hooks/use-input";
import { useState } from "react";
import styles from "../styles/SignUp.module.css"
import axiosInstance from "../api/axios"
import { useAppDispatch } from "../store/hooks";
import { signup } from "../features/user/userSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [getOtpValid, setgetOtpValid] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    
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
            alert("something went wrong")
        }
    }

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
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
            navigate("/auth/login");
        }).catch((err) => {
            alert(err);
        })
    }


    const fullNameClasses = fullNameHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const passwordClasses = passwordHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    const emailClasses = emailHasError ? `${styles.formControl} ${styles.errorText}` : styles.formControl;
    return (

        <div className={styles.signupContainer}>
            <div className={styles.test}>
                <div className={styles.welcomeTag} >
                    <h1>Don't have an account?</h1>
                    <h2>Sign up for free!</h2>
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
                        {emailIsValid && <button type="button" onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                        {getOtpValid && <input className={styles.enterOtp} value = {otp} onChange = {(e) => {setOTP(e.target.value)}} ></input>}
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
    );
};

export default SignUp;
