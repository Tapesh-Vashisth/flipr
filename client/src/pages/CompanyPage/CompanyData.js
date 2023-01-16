import styles from "./CompanyData.module.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Range from "./Range";
const CompanyData = () => {
    return (
        <>
            <section className={styles.companyPage} >
                <h2>NIFTY 50</h2>
                <hr className={styles.ruler} />
                <div className={styles.datacontainer} >
                    <div>
                        <h1>17,972.15</h1>
                        <h3 className={styles.header} style={{color:"green"}} > <ArrowDropUpIcon fontSize="large" sx={{display:"inline" }} /> 113.95 (0.64%) </h3>
                        <label className={styles.date} >As on 13 Jan, 2023, 13:25 IST</label>
                    </div>
                    <div>
                        <Range period="Days" high="17,976.40" low="17.774.25" />
                        <Range period="52 Week" high="15,183.40" low="18,887.60" />
                    </div>
                </div>
            </section>
        </>
    )
};

export default CompanyData;