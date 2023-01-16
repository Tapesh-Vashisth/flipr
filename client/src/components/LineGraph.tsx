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
import styles from "../styles/GraphSelect.module.css"

function LineGraph() {

	const [data, setData] = useState<Array<Object>>([])
	const [max, setMax] = useState<number>(0)
	const [min, setMin] = useState<number>(0)

	// states for the filters
	const [range, setRange] = useState<string>("720")
	const [date, setDate] = useState<string>("2020-02-13")
	const [name, setName] = useState<string>("eichermot")

	const theme = useTheme()
	const sm = useMediaQuery(theme.breakpoints.down(800))

	const getData = async () => {
		const res = await axios.get(`http://localhost:5500/api/company?name=${name}&date=${date}&range=${range}`)
		return res.data
	}

	useEffect(() => {
		console.log(name, range, date)
		getData().then((data) => {
			let arr: Array<Object> = []
			for (let i=0; i<data.length-1; i++) {
				const obj = {
					date: data[i].date.split(" ")[1] + " " + data[i].date.split(" ")[3],
					price: Number(data[i].data[3])
				}
				arr.push(obj)
			}
			console.log(arr)
			setData(arr)
			setMax(data[data.length - 1].max)
			setMin(data[data.length -1].min)
		})
	}, [,name,range,date])
	
	const arr = ['max','2y','1y','6m', '3m', '1m', '15d']

	return (
		<div style={{ width: "100%" }}>
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
			<div></div>
			<ResponsiveContainer width="95%" aspect={2}>
				<AreaChart data={data}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
					<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
					<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
					</linearGradient>
				</defs>
					<CartesianGrid stroke="#ccc" strokeDasharray="4 4 4 4" />
					<XAxis dataKey="date" angle={0} interval={!sm ? Number(range)/10 : Number(range)/4}>
						<Label value="Date" offset={-5} position="insideBottom" />
					</XAxis>
					<YAxis dataKey="price" label={{ value: 'Price', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}>
						{/* <Label value={"Price"} position="insideLeft" /> */}
					</YAxis>
					<Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
					<Tooltip />
					<Area 
						stroke="#8884d8" 
						fillOpacity={1} 
						fill="url(#colorUv)"
						dataKey="price"
						type="monotoneX"
						legendType="line"
						strokeWidth={3}
						// stroke="#8884d8"
						// stroke="black"
						dot={false}
						// fill="black"
						isAnimationActive={true}
						animationBegin={0}
						animationDuration={1000}
						animationEasing={"ease-in"}
					/>
					{/* <Line dataKey="fees"
						stroke="red" activeDot={{ r: 8 }} /> */}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default LineGraph