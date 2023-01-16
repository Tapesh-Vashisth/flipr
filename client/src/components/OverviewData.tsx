import styles from "../styles/GraphSelect.module.css"

type PropType = {
    title: string
    value: string
}

const OverviewData=(props: PropType)=>{

    return (
        <div className={styles.overBox} >
            <h2>{props.title}</h2>
            <h3>{props.value}</h3>
        </div>

    );


}

export default OverviewData;