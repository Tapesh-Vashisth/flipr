import styles from "../styles/GraphSelect.module.css"

const FilterBar = (props: any) => {
    const arr = ['MAX', '2Y', '1Y', '6M', '3M', '1M', '15D'];

    const buttonHandler=(event: any)=>{
        props.onClickButton(event);
    };

    return (

        <div className={styles.buttonCon} >
            {arr.map((item) => <button id={item} onClick={buttonHandler} >{item}</button>)}
        </div>

    );

}

export default FilterBar;