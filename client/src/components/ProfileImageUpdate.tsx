import React, {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import convertToBase64 from '../helper/ConvertToBase64';
import axiosInstance from "../api/axios";
import { userActions } from '../features/user/userSlice';


const ProfileImageUpdate = () => {
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState<any>(user.image ? user.image : null);
    const [change, setChange] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            let base64 = await convertToBase64(file);
            setImage(base64);
            setChange(true);
        }
    }

    const style = {
        padding: "0.5rem",
        color: "green",
        marginTop: "1rem",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        width: "70%",
        borderRadius: "25px",
        fontSize: "1rem",
        letterSpacing: "1px",
    }

    const disStyle = {
        opacity: 0.5,
        padding: "0.5rem",
        color: "green",
        marginTop: "1rem",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        width: "70%",
        borderRadius: "25px",
        fontSize: "1rem",
        letterSpacing: "1px"
    }

    const updateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setChange(false);
        try{
            await axiosInstance.post("/users/updateimage", {image, email: user.email});
            dispatch(userActions.setImage(image));
            setChange(true);
        } catch (err: any) {
            alert("something went wrong");
            setChange(true);
        }
    }

    return (
        <>
            <label htmlFor='proimage' style = {{cursor: "pointer", display: "flex", width: "100%", justifyContent: "center"}}>
                <input type = "file" id = "proimage" hidden onChange={handleImage} />
                {
                    image ? <img src={image} alt = "" style = {{width: "150px", height: "150px", borderRadius: "100%", border: "2px solid gray"}}/>
                    :
                    <div style = {{width: "150px", height: "150px", borderRadius: "100%", border: "2px solid gray", display: "flex", alignItems: "center", justifyContent: "center"}}>Add Profile</div>
                }
            </label>
            <button id = "probtn" style = {change ? style: disStyle} onClick = {updateImage} disabled = {change ? false: true}>update image</button>
        </>
    )
}

export default ProfileImageUpdate