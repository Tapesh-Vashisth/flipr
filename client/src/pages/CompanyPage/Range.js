import styles from "./Range.module.css"

const Range = (props) => {
    return (
        <div className={styles.rangeCon} >
            <h2>{props.period} Range</h2>
            <div>
                <div className={styles.values} >
                    <h3>{props.low}</h3>
                    <h3>{props.high}</h3>
                </div>
                <div className={styles.LHvalues} >
                    <h5 style={{color:"green"}} >L</h5>
                    <div className={styles.ruler}></div>
                    <h5 style={{color:"red"}}>H</h5>
                </div>
            </div>
        </div>
    )
};

export default Range;