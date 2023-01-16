import styles from "../styles/FrontPage.module.css"
import React from "react";
import IndividualIntervalsExample from "../components/Carousel";
const FrontPage = () => {

    return (
        <>
            <div className={styles.backimageContainer} id="backGroundContainer">

                <div className={styles.introContainer} >
                    <div className={styles.introBox}>
                        <h1 className="intro">StockHub
                        </h1>
                        <h1 className="intro" >
                            Find and analyze your favourite stocks
                        </h1>
                    </div>
                    <div className={styles.imagecontainer}>
                        <img className={styles.graphimg} src="./Images/PngItem_1608372.png" alt="stocks" />
                    </div>
                </div>
                <div className={styles.carouselHolder}>

                    <div className={styles.carouselCon} >
                        <IndividualIntervalsExample />
                    </div>
                </div>
            </div>
        </>


    )
};

export default FrontPage;