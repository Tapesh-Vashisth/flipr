import React, {useState, SetStateAction, Dispatch} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "../styles/Accordian.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface props {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  setCurrentPassword: Dispatch<SetStateAction<string>>
  setNewPassword: Dispatch<SetStateAction<string>>
  setConfirmPassword: Dispatch<SetStateAction<string>>
}

export default function SimpleAccordion({currentPassword, newPassword, confirmPassword, setCurrentPassword, setNewPassword, setConfirmPassword}: props) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{marginBottom:"0"}}>Password Settings</Typography>
        </AccordionSummary>
        <AccordionDetails style={{padding: "32px"}}>
          <div style = {{position: "relative"}}>
            <input className={styles.inputAcc} type={visible ? "text" : 'password'} placeholder = "New Password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
            {
                visible ? 
                <VisibilityOffIcon style = {{position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                :
                <VisibilityIcon style = {{position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
            }
          </div>
          {
            newPassword.length > 0 && confirmPassword.length > 0 && (newPassword !== confirmPassword) ? 
            <div style = {{textAlign: "center", color: "red"}}>Passwords must match</div>
            : 
            null
          }
          <div style = {{position: "relative"}}>
            <input className={styles.inputAcc} type={visible ? "text" : 'password'} placeholder = "Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
            {
                visible ? 
                <VisibilityOffIcon style = {{position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(false)}} /> 
                :
                <VisibilityIcon style = {{position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}} onClick = {() => {setVisible(true)}} />   
            }
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}