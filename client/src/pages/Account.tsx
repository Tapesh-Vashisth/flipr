import { useState } from "react";
import SimpleAccordion from "../components/Acoordian";
import styles from "../styles/Account.module.css"
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileImageUpdate from "../components/ProfileImageUpdate";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DeleteModal from "../components/DeleteModal";
import { appActions } from "../features/appSlice";
import LazyLoading from "../components/LazyLoading";
import axiosInstance from "../api/axios";


const Account = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const app = useAppSelector((state) => state.app);
    const [update, setUpdate] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [name, setName] = useState<string>(user.name);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const {setShow} = appActions;
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const navigate = useNavigate();
    const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/");
    }

    const updateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(name, currentPassword, newPassword, confirmPassword);
        setUpdate(true);
        const res = axiosInstance.put("/users/editaccount", {
            name: name,
            email: user.email,
            password: currentPassword,
            newPassword: newPassword
        }).then((data: any) => {
            console.log(data);
            setUpdate(false);
        })
        .catch((err: any) => {
            console.log(err)
            const status = err.response.status
            if (status == 409) {
                setMessage("No such user exists!")
                setError(true)
                dispatch(setShow(true))
            }
            setUpdate(false);
        })
        console.log(res)

    }

    const deciderDisable = (name === "" || currentPassword === "" || newPassword !== confirmPassword) 

    return (
        (user.loading && !app.show) ? <LazyLoading /> :
        <>
        <div>
            <div className={styles.accBackdrop} style={{padding: "120px 0px 90px 0px"}}>
                <div className={styles.accContainer} >
                    <button className={styles.cancel} onClick = {cancelHandler} >< HighlightOffTwoToneIcon fontSize="large" sx={{ color: "#000;", borderRadius: "50%", backgroundColor: "white" }} /></button>
                    <div className={styles.accountdetails}>
                        <ProfileImageUpdate />
                    </div>
                    <div className={styles.accountdetails} >
                        <h3>Account Details</h3>
                        <input type="text" value={name} onChange = {(e) => {setName(e.target.value)}} />
                        <input type="text" value={user.email} readOnly />
                    </div>
                    <div className={styles.accordianBox}>
                        <SimpleAccordion currentPassword = {currentPassword} newPassword = {newPassword} confirmPassword = {confirmPassword} setCurrentPassword = {setCurrentPassword} setNewPassword = {setNewPassword} setConfirmPassword = {setConfirmPassword} />
                    </div>
                    <div className={styles.buttonHolder}>
                        <button className={deciderDisable || update ? styles.updatedisabled : styles.update} onClick = {updateHandler} disabled = {deciderDisable ? true: false}>Update Settings</button>
                        <DeleteModal />
                    </div>
                </div>
            </div>
        </div>
        </>
    );

};

export default Account;