import useInput from "../Hooks/use-input";
import { useState } from "react";
import styles from "./SignUp.module.css";
import axiosInstance from "../../api/axios";
import { useAppDispatch } from "../../store/hooks";
import { signup } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [getOtpValid, setgetOtpValid] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>("");
    const [image, setImage] = useState<any>("")
    
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

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage(base64)
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
        dispatch(signup({email: enteredEmail, name: enteredfullName, password: enteredpassword, otp: otp, image: image}))
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
                        {emailIsValid && <button type="button" onClick={otpInputHandler} className={styles.submitButton} >Get Otp</button>}
                        {getOtpValid && <input className={styles.enterOtp} value = {otp} onChange = {(e) => {setOTP(e.target.value)}} ></input>}
                    </div>
                    <div className={passwordClasses}>
                        {passwordHasError && <p className="error-text" >*Required</p>}
                        <label htmlFor='name'>Password</label>
                        <input value={enteredpassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type='password' id='name' />
                    </div>
                    <div className={styles.inputClass}>
                        <label htmlFor="input" className={styles.inputLabel}>Profile Photo</label>
                        <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <div className='form-actions'>
                        <button type="submit" className={styles.submitButton} disabled={fullNameIsValid && passwordIsValid && emailIsValid && otp.length > 0 && image.length > 0 ? false: true} >Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
