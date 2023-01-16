// import './App.css';
import {
	LineChart, AreaChart, Area,
	ResponsiveContainer,
	Legend, Tooltip,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Label
} from 'recharts';
import {Stack} from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Sample chart data

function LineGraph() {

	const [data, setData] = useState<Array<Object>>([])
	const [max, setMax] = useState<number>(0)
	const [min, setMin] = useState<number>(0)

	// states for the filters
	const [range, setRange] = useState<string>("720")
	const [date, setDate] = useState<string>("2020-02-13")
	const [name, setName] = useState<string>("BSE")

	const getData = async () => {
		const res = await axios.get(`http://localhost:5500/api/company?name=${name}&date=${date}&range=${range}`)
		return res.data
	}

	useEffect(() => {
		getData().then((data) => {
			let arr: Array<Object> = []
			for (let i=0; i<data.length-1; i++) {
				const obj = {
					date: data[i].date.split(" ")[1] + " " + data[i].date.split(" ")[2] + " " + data[i].date.split(" ")[3],
					price: Number(data[i].data[3])
				}
				arr.push(obj)
			}
			console.log(arr)
			setData(arr)
			setMax(data[data.length - 1].max)
			setMin(data[data.length -1].min)
		})
	}, [])
	
	return (
			<ResponsiveContainer width="95%" aspect={2}>
				<AreaChart height={1250} data={data}>
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
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="date" angle={0} interval={Number(range)/20}>
						<Label value="Date" offset={-5} position="insideBottom" />
					</XAxis>
					<YAxis dataKey="price" label={{ value: 'Price', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
					<Legend verticalAlign="top" align="right" />
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
		// </>
	);
}

export default LineGraph