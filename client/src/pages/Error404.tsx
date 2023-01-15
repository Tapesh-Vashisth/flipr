import styles from "../styles/Error404.module.css"

const ErrorPage = () => {
    return (
        <div className={styles.errorContainer} >
            <a id="anchorError" style={{ textDecoration: "none" }} href="https://mui.com/material-ui/react-app-bar/" rel="noopener noreferrer" target="_blank">
                <header className={styles["top-header"]}>
                </header>


                <div>
                    <div className={styles.starsec}></div>
                    <div className={styles.starthird}></div>
                    <div className={styles.starfourth}></div>
                    <div className={styles.starfifth}></div>
                </div>



                <div className={styles.lamp__wrap}>
                    <div className={styles.lamp}>
                        <div className={styles.cable}></div>
                        <div className={styles.cover}></div>
                        <div className={styles["in-cover"]}>
                            <div className={styles.bulb}></div>
                        </div>
                        <div className={styles.light}></div>
                    </div>
                </div>

                <section className={styles.error}>

                    <div className={styles.error__content}>
                        <div className={`${styles.error__message} ${styles.message}`}>
                            <h1 className={styles.message__title}>Page Not Found</h1>
                            <p className={styles.message__text}>We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
                        </div>
                        <div className={styles.error__nav}>
                            <a id="anchorTagError" href="https://mui.com/material-ui/react-app-bar/" target="_blanck" rel="noopener noreferrer" className={styles["e-nav__link"]}>.</a>
                        </div>
                    </div>
                </section>
            </a>
        </div>
    );
};

export default ErrorPage;