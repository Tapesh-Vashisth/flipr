import { useState } from "react";
import SimpleAccordion from "../components/Acoordian";
import styles from "../styles/Account.module.css"
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser, updateUser } from "../features/user/userSlice";


const Account = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const [update, setUpdate] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [name, setName] = useState<string>(user.name);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();
    const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/");
    }

    const updateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(name, currentPassword, newPassword, confirmPassword);
        setUpdate(true);
        
    }

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDel(true);
        dispatch(deleteUser({email: user.email})).unwrap().then((res) => {
            setDel(false);
            navigate("/auth/login");
        }).catch((err: any) => {
            alert("something went wrong");
            setDel(false);
        })
    }

    const deciderDisable = (name === "" || currentPassword === "" || newPassword === "" || confirmPassword === "") || (newPassword !== confirmPassword) 

    return (
        <div>
            <div className={styles.accBackdrop} style={{padding: "120px 0px 90px 0px"}}>
                <div className={styles.accContainer} >
                    <button className={styles.cancel} onClick = {cancelHandler} >< HighlightOffTwoToneIcon fontSize="large" sx={{ color: "#000;", borderRadius: "50%", backgroundColor: "white" }} /></button>

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
                        <button className={del ? styles.deletedisabled : styles.delete} onClick = {deleteHandler}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Account;