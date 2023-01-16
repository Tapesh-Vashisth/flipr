import styles from "../styles/CompanyData.module.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Range from "./Range";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type PropType = {
    High52Week: string
    Low52Week: string
    HighToday: string
    LowToday: string
    Price: string
    // name: string
    date: string
    Change: string
    boolean: boolean
    rangeString: string
}

const CompanyData = (props: PropType) => {
    return (
        <>
            <section className={styles.companyPage} >
                {/* <h2>{props.name}</h2> */}
                <hr className={styles.ruler} />
                <div className={styles.datacontainer} >
                    <div>
                        <h1>{props.Price}</h1>
                        <h3 className={styles.header} style={{color:props.boolean ? "green" : "red"}} > {props.boolean ? <ArrowDropUpIcon fontSize="large" sx={{display:"inline" }} /> : <ArrowDropDownIcon fontSize="large" sx={{display: "inline"}} /> } {props.Change} </h3>
                        <label className={styles.date} >As on {props.date}</label> <br />
                        <label className={styles.date}>Range = {props.rangeString}</label>
                    </div>
                    <div>
                        <Range period="Day" high={props.HighToday} low={props.LowToday} />
                        <Range period="Range" high={props.High52Week} low={props.Low52Week}  />
                    </div>
                </div>
                <hr className={styles.ruler} />
            </section>
        </>
    )
};

export default CompanyData;