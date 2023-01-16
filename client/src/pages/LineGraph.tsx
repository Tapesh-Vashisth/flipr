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
import axios from 'axios';
import { useTheme, useMediaQuery } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import FilterBar from '../components/FilterBar';
import styles from "../styles/GraphSelect.module.css"
import CompanyData from '../components/CompanyData';

function LineGraph() {

	const [data, setData] = useState<Array<Object>>([])
	const [max, setMax] = useState<number>(0)
	const [min, setMin] = useState<number>(0)
	const [dayMax, setDayMax] = useState<number>(0)
	const [dayMin, setDayMin] = useState<number>(0)
	const [price, setPrice] = useState<number>(0)
	const [change, setChange] = useState<string>("")
	const [boolean, setBoolean] = useState<boolean>(true)

	// states for the filters
	const [range, setRange] = useState<string>("1470")
	const [rangeString, setRangeString] = useState<string>("MAX")
	const [date, setDate] = useState<string>("2020-02-13")
	const [name, setName] = useState<string>("eichermot")

	const theme = useTheme()
	const sm = useMediaQuery(theme.breakpoints.down(800))

	const getData = async () => {
		const res = await axios.get(`http://localhost:5500/api/company?name=${name}&date=${date}&range=${range}`)
		return res.data
	}

	const handleDate = (e: any) => {
		const dateValue = e.target.value
		console.log("date is : ", dateValue)
		setDate(dateValue)
	}

	const buttonClicked=(event:any)=>{
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
		console.log(name, range, date)
		getData().then((data) => {
			let arr: Array<Object> = []
			for (let i = 0; i < data.length - 1; i++) {
				const obj = {
					date: data[i].date.split(" ")[1] + " " + data[i].date.split(" ")[2] + " " + data[i].date.split(" ")[3],
					price: Number(data[i].data[3])
				}
				arr.push(obj)
			}
			console.log(arr)
			setDayMax(data[0].data[1])
			setDayMin(data[0].data[2])
			setPrice(data[0].data[3])
			setData(arr)
			setMax(data[data.length - 1].max)
			setMin(data[data.length -1].min)
			const changeInPrice = data[0].data[0] - data[1].data[3]
			if (changeInPrice >= 0) setBoolean(true)
			else setBoolean(false)
			const percentChange = changeInPrice / data[1].data[3] * 100
			setChange(changeInPrice.toFixed(2).toString() + "(" + percentChange.toFixed(2).toString() + "%)")
		})
	}, [, name, range, date])

	return (
			<div style={{ width: "100%", padding: "120px 0px 110px 0px",  background: "#FFC3A1" }}>
				<div style={{ display: "flex", flexDirection: "row", marginLeft: "5rem", alignItems: "center", marginBottom: "1rem" }}>
					<select onChange={(e: any) => setName(e.target.value)} value={name} style={{ border: "none", fontSize: "22px", fontWeight: "500" }}>
						<option value="reliance" style={{ border: "none", fontSize: "18px", fontWeight: "400" }} defaultChecked>RELIANCE</option>
						<option value="eichermot" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>EICHERMOT</option>
						<option value="cipla" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>CIPLA</option>
						<option value="bse" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>BSE</option>
						<option value="ashokley" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>ASHOKLEY</option>
						<option value="nse" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>NSE</option>
						<option value="tatasteel" style={{ border: "none", fontSize: "18px", fontWeight: "400" }}>TATASTEEL</option>
					</select>
					<CircleIcon style={{ color: "red", marginLeft: "1rem" }} />
				</div>
				<CompanyData rangeString={rangeString} High52Week={parseFloat(max.toString()).toFixed(2).toString()} Low52Week={parseFloat(min.toString()).toFixed(2).toString()} HighToday={parseFloat(dayMax.toString()).toFixed(2).toString()} LowToday={parseFloat(dayMin.toString()).toFixed(2).toString()} Price={parseFloat(price.toString()).toFixed(2).toString()} boolean={boolean} date={date} Change={change} />
				<div className={styles.lineGCon} >
					<input type={"date"} onChange={() => {}} />
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
								<XAxis dataKey="date" angle={0} interval={!sm ? Number(range) / 50 : Number(range) / 4}>
									<Label value="Date" offset={-5} position="insideBottom" />
								</XAxis>
								<YAxis dataKey="price" label={{ value: 'Price', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}>
									{/* <Label value={"Price"} position="insideLeft" /> */}
								</YAxis>
								<Legend width={100} verticalAlign="top" align="right" />
								<Tooltip />
								<Area
									stroke="#8884d8"
									fillOpacity={1}
									fill="url(#colorUv)"
									dataKey="price"
									type="monotoneX"
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
			</div>
		</div>
	);
}

export default LineGraph