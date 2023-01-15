import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Stack} from "@mui/material";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../styles/Account.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: "90%", sm: "480px"},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const delstyle = {
  padding: "0.5rem",
  marginTop: "1rem",
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  width: "80%",
  borderRadius: "25px",
  fontSize: "1rem",
  letterSpacing: "1px",
}

const inputStyle = {
  padding: "0.5rem",
  width: "100%",
  display: "block",
}


export default function DeleteModal() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUser({email: user.email, password: password})).unwrap().then((res) => {
      handleClose();
      navigate("/auth/login");
    }).catch((err) => { 
      alert("something went wrong");
    })
  }

  return (
    <>
      <button onClick={handleOpen} className = {styles.delete} style = {delstyle}>Delete Account</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Stack sx={style} justifyContent = "center" alignItems="center">
            <div style = {{position: "relative", width: "100%"}}>
              <input type={visible ? "text": "password"} value = {password} onChange = {(e) => {setPassword(e.target.value)}} style = {{...inputStyle}} placeholder="enter your password"></input>
              {
                visible ? 
                <VisibilityOffIcon style = {{position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                :
                <VisibilityIcon style = {{position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
              }
            </div>
            <button style = {delstyle} onClick = {deleteHandler} disabled = {password ? false: true}>confirm</button>
          </Stack>
        </Fade>
      </Modal>
    </>
  );
}