import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "../styles/Accordian.module.css"

export default function SimpleAccordion() {
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
        <AccordionDetails>
          <Typography >
            <input className={styles.inputAcc} /> 
            <input className={styles.inputAcc}/>
            <input className={styles.inputAcc}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}