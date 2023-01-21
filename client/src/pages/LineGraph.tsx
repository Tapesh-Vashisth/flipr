import {
	AreaChart, Area,
	ResponsiveContainer,
	Legend, Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
	Label
} from 'recharts';
import { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import FilterBar from '../components/FilterBar';
import axiosInstance from '../api/axios';
import styles from "../styles/GraphSelect.module.css"
import CompanyData from '../components/CompanyData';
import OverviewData from '../components/OverviewData';
import CircularProgress from '@mui/material/CircularProgress';
import { appActions } from '../features/appSlice';
import { useAppDispatch } from '../store/hooks';


function LineGraph() {
	const dispatch = useAppDispatch();
	const [data, setData] = useState<Array<Object>>([])
	const [max, setMax] = useState<number>(0)
	const [min, setMin] = useState<number>(0)
	const [dayMax, setDayMax] = useState<number>(0)
	const [dayMin, setDayMin] = useState<number>(0)
	const [price, setPrice] = useState<number>(0)
	const [change, setChange] = useState<string>("")
	const [boolean, setBoolean] = useState<boolean>(true)
	const [todayOpen, setTodayOpen] = useState<number>(0)
	const [previousClose, setPreviousClose] = useState<number>(0)
	const [market, setMarket] = useState<string>("")

	const [switcher, setSwitcher] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(false)

	// states for the filters
	const [range, setRange] = useState<string>("1470")
	const [rangeString, setRangeString] = useState<string>("MAX")
	const [date, setDate] = useState<string>("2020-02-13")
	const [name, setName] = useState<string>("eichermot")

	const theme = useTheme()
	const sm = useMediaQuery(theme.breakpoints.down(800))

	const getData = async () => {
		try {
			const res = await axiosInstance.get(`/company?name=${name}&date=${date}&range=${range}`)
			return res.data;
		} catch (err: any) {
			if (err.message === "Network Error"){ 
                dispatch(appActions.setAlert({show: true, message: "Network error/Server Down!"}));
            } else {
                dispatch(appActions.setAlert({show: true, message: err.response.data.message}));
            }
		}
	}

	const handleDate = (e: any) => {
		const dateValue = e.target.value
		setDate(dateValue)
	}

	const buttonClicked = (event: any) => {
		console.log(event.target.id!);
		const time = event.target.id!
		if (time === "MAX") {
			setRange("1470")
			setRangeString("MAX")
		}
		if (time === "2Y") {
			setRange("730")
			setRangeString("2Y")
		}
		if (time === "1Y") {
			setRange("365")
			setRangeString("1Y")
		}
		if (time === "6M") {
			setRange("182")
			setRangeString("6M")
		}
		if (time === "3M") {
			setRange("91")
			setRangeString("#M")
		}
		if (time === "1M") {
			setRange("31")
			setRangeString("1M")
		}
		if (time === "15D") {
			setRange("15")
			setRangeString("15D")
		}
	}

	useEffect(() => {
		setLoading(true)
		getData().then((data) => {
			setLoading(false)
			let arr: Array<Object> = []
			for (let i = 0; i < data.length - 1; i++) {
				const obj = {
					date: data[i].date.split(" ")[1] + " " + data[i].date.split(" ")[2] + " " + data[i].date.split(" ")[3],
					price: Number(data[i].data[3])
				}
				arr.push(obj)
			}
			setDayMax(data[data.length - 2].data[1])
			setDayMin(data[data.length - 2].data[2])
			setPrice(data[data.length - 2].data[3])
			setData(arr)
			setMax(data[data.length - 1].max)
			setMin(data[data.length -1].min)
			setPreviousClose(data[data.length - 3].data[3])
			setTodayOpen(data[data.length - 2].data[0])
			const changeInPrice = data[data.length - 2].data[0] - data[data.length - 3].data[3]
			if (changeInPrice >= 0) setBoolean(true)
			else setBoolean(false)
			const percentChange = changeInPrice / data[data.length - 2].data[3] * 100
			setChange(changeInPrice.toFixed(2).toString() + "(" + percentChange.toFixed(2).toString() + "%)")
		})
	}, [, name, range, date])

	return (
		<>
			<div className={styles.navbarBack} ></div>
			<div style={{ width: "100%", padding: "30px 0px 110px 0px", background: "#e2f5ff" }}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div style={{ display: "flex", flexDirection: "row", marginLeft: "5rem", alignItems: "center", marginBottom: "1rem" }}>
						<select onChange={(e: any) => setName(e.target.value)} value={name} style={{ cursor: "pointer", border: "none", fontSize: "22px", fontWeight: "500" }}>
							<option value="reliance" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }} defaultChecked>RELIANCE</option>
							<option value="eichermot" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>EICHERMOT</option>
							<option value="cipla" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>CIPLA</option>
							<option value="bse" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>BSE</option>
							<option value="ashokley" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>ASHOKLEY</option>
							<option value="nse" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>NSE</option>
							<option value="tatasteel" style={{ cursor: "pointer", border: "none", fontSize: "18px", fontWeight: "400" }}>TATASTEEL</option>
						</select>
					</div>
					<div style={{ display: "flex", flexDirection: "row", marginLeft: "1rem", alignItems: "center", marginBottom: "1rem" }}>
						<select value={market} onChange={(e: any) => setMarket(e.target.value)} style={{ cursor: "pointer", border: "none", fontSize: "22px", fontWeight: "500" }}>
							<option value="nse" style={{ border: "none", fontSize: "18px", fontWeight: "400" }} defaultChecked>NSE</option>
							<option value="bse" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>BSE</option>
						</select>
					</div>
				</div>
				<CompanyData rangeString={rangeString} High52Week={parseFloat(max.toString()).toFixed(2).toString()} Low52Week={parseFloat(min.toString()).toFixed(2).toString()} HighToday={parseFloat(dayMax.toString()).toFixed(2).toString()} LowToday={parseFloat(dayMin.toString()).toFixed(2).toString()} Price={parseFloat(price.toString()).toFixed(2).toString()} boolean={boolean} date={date} Change={change} />
				<div className={styles.lineGCon} >
					<input type={"date"} onKeyDown={(e) => {e.preventDefault()}} style={{ cursor: "pointer", marginBottom: "1rem" }} onChange={(e: any) => handleDate(e)} />
					<div className={styles.overCon} >
						<button onClick={() => setSwitcher(true)}>Overview</button>
						<button onClick={() => setSwitcher(false)}>Chart</button>
						<hr className={styles.rulethin} />
					</div>
					{
					!loading ?
					(switcher 
					?
						<div className={styles.dataCon} >
							<OverviewData title="Open" value={parseFloat(todayOpen.toString()).toFixed(2).toString()} />
							<OverviewData title="Previous Close" value={parseFloat(previousClose.toString()).toFixed(2).toString()} />
							<OverviewData title="Day High" value={parseFloat(dayMax.toString()).toFixed(2).toString()} />
							<OverviewData title="Day Low" value={parseFloat(dayMin.toString()).toFixed(2).toString()} />
							<OverviewData title="Range High" value={parseFloat(max.toString()).toFixed(2).toString()} />
							<OverviewData title="Range Low" value={parseFloat(min.toString()).toFixed(2).toString()} />
						</div>
					:
						<>
						<FilterBar onClickButton={buttonClicked} />
						<div style={{ maxWidth: "1000px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginBottom: "0.5rem" }}>
							<ResponsiveContainer width={"100%"} aspect={2}>
								<AreaChart data={data}>
									<defs>
										<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid stroke="#ccc" strokeDasharray="4 4 4 4" />
									<XAxis dataKey="date" angle={0} interval={'preserveStartEnd'}>
										<Label value="Date" offset={-5} position="insideBottom" />
									</XAxis>
									<YAxis dataKey="price" label={{ value: 'Price', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}>
									</YAxis>
									<Legend width={100} verticalAlign="top" align="right" />
									<Tooltip />
									<Area
										stroke="#8884d8"
										fillOpacity={1}
										fill="url(#colorUv)"
										dataKey="price"
										type="linear"
										legendType="line"
										strokeWidth={3}
										dot={false}
										isAnimationActive={true}
										animationBegin={0}
										animationDuration={1000}
										animationEasing={"ease-in"}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
						</>
					)
					:
					<CircularProgress />
					}
				</div>
			</div>
		</>
	);
}

export default LineGraph