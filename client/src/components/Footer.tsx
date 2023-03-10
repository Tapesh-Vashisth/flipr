import styles from "../styles/Footer.module.css"

import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

    return (
        <React.Fragment>
            
                <div className={styles.footer}>
                    <div className={styles.footer_title}>
                        <h2>Stockhub</h2>
                        <p>Stockhub provides data, information & content for stocks.</p>
                    </div>
                    <div className={styles.footer_mine} >
                        <a href="mailto:shashankraj3636@gmail.com" rel="noopener noreferrer" target="_blank" ><MailOutlineIcon fontSize="large" /></a>
                        <a target="_blank" rel="noopener noreferrer" href='https://github.com/sosenkkk' ><GitHubIcon fontSize="large" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/shashank-raj-5bb2a11b6/"><LinkedInIcon fontSize="large" /></a>
                        <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/sosenkkk' ><TwitterIcon fontSize="large" /></a>
                        <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/sosenkkk/' ><InstagramIcon fontSize="large" /></a>
                    </div>
                </div>
                <p className={styles.cc} >© StockHub 2023</p>

            
        </React.Fragment>
    );

};


export default Footer;