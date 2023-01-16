import styles from "../styles/GraphSelect.module.css"

const Overview = () => {
    return (
        <div className={styles.overCon} >
            <button>Overview</button>
            <button>Chart</button>
            <hr className={styles.rulethin} />
        </div>
    );
};

export default Overview;