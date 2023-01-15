// import './App.css';
import {
	LineChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Label
} from 'recharts';
import {Stack} from "@mui/material";

// Sample chart data
const pdata = [
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
	{
		date: "1st jan",
		price: 100
	},
	{
		date: "2nd jan",
		price: 102
	},
	{
		date: "3rd jan",
		price: 98
	},
	{
		date: "4th jan",
		price: 104
	},
	{
		date: "5th jan",
		price: 130
	},
];

function LineGraph() {
	return (
		// <>
		// 	<h1 className="text-heading">
		// 		Line Chart Using Rechart
		// 	</h1>
			<ResponsiveContainer width="95%" aspect={3}>
				<LineChart width={100} data={pdata}>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="date" angle={30} interval={7} >
						<Label value="Date" offset={0} position="insideBottom" />
					</XAxis>
					<YAxis dataKey="price" label={{ value: 'Price', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
					<Legend verticalAlign="top" align="right" />
					<Tooltip />
					<Line 
						dataKey="price"
						type="monotoneX"
						legendType="line"
						strokeWidth={1}
						stroke="#8884d8"
						// stroke="black"
						dot={false}
						fill="black"
					/>
					{/* <Line dataKey="fees"
						stroke="red" activeDot={{ r: 8 }} /> */}
				</LineChart>
			</ResponsiveContainer>
		// </>
	);
}

export default LineGraph;
