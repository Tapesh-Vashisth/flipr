import styles from "./CompanyData.module.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Range from "./Range";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropUp';

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
                        <h3 className={styles.header} style={{color:"green"}} > {props.boolean ? <ArrowDropUpIcon fontSize="large" sx={{display:"inline" }} /> : <ArrowDropUpIcon fontSize="large" sx={{display: "inline"}} /> } {props.Change} </h3>
                        <label className={styles.date} >As on {props.date}</label>
                    </div>
                    <div>
                        <Range period="Days" high={props.HighToday} low={props.LowToday} />
                        <Range period="52 Week" high={props.High52Week} low={props.Low52Week} />
                    </div>
                </div>
                <hr className={styles.ruler} />
            </section>
        </>
    )
};

export default CompanyData;