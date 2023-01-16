import Carousel from 'react-bootstrap/Carousel';
import styles from "../styles/Carousel.module.css"

function IndividualIntervalsExample() {
    return (
        <Carousel>
            <Carousel.Item interval={5000}>
                <div className={`${styles.Con} d-block w-100`}>
                    <img
                        className={styles.Img}
                        src="https://upstox.com/open-demat-account/assets/images/demart-3.png"
                        alt="Third slide"
                    />
                </div>
                <Carousel.Caption>
                    <div className={styles.textAbt} >
                        <h3>Simple. Quick. Paperless</h3>
                        <p>
                            It just takes a few click to make <br/> StockHub account.
                        </p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={5000}>
                <div className={`${styles.Con} d-block w-100`} style={{ backgroundColor: "#ffeacfff" }} >
                    <img
                        className={styles.Img}
                        src="https://upstox.com/open-demat-account/assets/images/grow-stock.png"
                        alt="Second slide"
                    />
                </div>
                <Carousel.Caption>
                    <div className={styles.textAbt}>
                        <h3>Discover Stocks</h3>
                        <p>Get information about stocks with<br/> smart filters and lists.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={5000}>
                <div className={`${styles.Con} d-block w-100`} style={{ backgroundColor: "#6eaccf" }} >
                    <img
                        className={styles.Img}
                        src="./Images/graph.png"
                        alt="First slide"
                    />
                </div>
                <Carousel.Caption>
                    <div className={styles.textAbt}>
                        <h3>Easy to use.</h3>
                        <p>Access stocks and key company<br/> information easily.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default IndividualIntervalsExample;