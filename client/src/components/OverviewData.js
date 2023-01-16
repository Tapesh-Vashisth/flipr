import styles from "../styles/GraphSelect.module.css"

const OverviewData=(props)=>{

    return (
        <div className={styles.overBox} >
            <h2>{props.title}</h2>
            <h3>{props.value}</h3>
        </div>

    );


}

export default OverviewData;