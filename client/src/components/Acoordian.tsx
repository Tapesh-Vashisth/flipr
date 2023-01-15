import React, {useState, SetStateAction, Dispatch} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "../styles/Accordian.module.css"

interface props {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  setCurrentPassword: Dispatch<SetStateAction<string>>
  setNewPassword: Dispatch<SetStateAction<string>>
  setConfirmPassword: Dispatch<SetStateAction<string>>
}

export default function SimpleAccordion({currentPassword, newPassword, confirmPassword, setCurrentPassword, setNewPassword, setConfirmPassword}: props) {
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
          <input className={styles.inputAcc} placeholder = "Current Password" value={currentPassword} onChange={(e) => {console.log(currentPassword);setCurrentPassword(e.target.value)}}/> 
          <input className={styles.inputAcc} placeholder = "New Password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
          {
            newPassword.length > 0 && confirmPassword.length > 0 && (newPassword !== confirmPassword) ? 
            <div style = {{textAlign: "center", color: "red"}}>Passwords must match</div>
            : 
            null
          }
          <input className={styles.inputAcc} placeholder = "Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}