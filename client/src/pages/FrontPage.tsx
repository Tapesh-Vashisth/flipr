import styles from "../styles/FrontPage.module.css"
const FrontPage = () => {

    return (

        <div className={styles.backimageContainer} id="backGroundContainer">
            <div>
                <section>
                    <div className={styles.introContainer} >
                        <div className={styles.introBox}>
                            <h1 className="intro">Stockhub
                            </h1>
                            <h2 className="intro" >
                                {/* Information/ Research */}
                                Find and analyze your favourite stocks
                            </h2>
                        </div>
                        <div className={styles.imagecontainer}>
                            <img className={styles.graphimg} src="./Images/PngItem_1608372.png" alt="stocks" />
                        </div>
                    </div>
                </section>
            </div>

        </div>

    )
};

export default FrontPage;