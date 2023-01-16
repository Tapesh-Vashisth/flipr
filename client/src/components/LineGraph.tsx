// // import './App.css';
// import {
// 	LineChart,
// 	ResponsiveContainer,
// 	Legend, Tooltip,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid
// } from 'recharts';

// // Sample chart data
// const pdata = [
// 	{
// 		name: 'MongoDb',
// 		student: 11,
// 		fees: 120
// 	},
// 	{
// 		name: 'Javascript',
// 		student: 15,
// 		fees: 12
// 	},
// 	{
// 		name: 'PHP',
// 		student: 5,
// 		fees: 10
// 	},
// 	{
// 		name: 'Java',
// 		student: 10,
// 		fees: 5
// 	},
// 	{
// 		name: 'C#',
// 		student: 9,
// 		fees: 4
// 	},
// 	{
// 		name: 'C++',
// 		student: 10,
// 		fees: 8
// 	},
// ];

// function LineGraph() {
// 	return (
// 		<>
// 			<h1 className="text-heading">
// 				Line Chart Using Rechart
// 			</h1>
// 			<ResponsiveContainer width="100%" aspect={3}>
// 				<LineChart data={pdata} margin={{ right: 300 }}>
// 					<CartesianGrid />
// 					<XAxis label={'date'} dataKey="name" />
// 					<YAxis label={'closing price'}></YAxis>
// 					<Legend />
// 					<Tooltip />
// 					<Line dataKey="student"
// 						stroke="black" />
// 					{/* <Line dataKey="fees"
// 						stroke="red" activeDot={{ r: 8 }} /> */}
// 				</LineChart>
// 			</ResponsiveContainer>
// 		</>
// 	);
// }

// export default LineGraph;
import React from 'react'

function LineGraph() {
	return (
		<>
			<h1 className="text-heading">
				Line Chart Using Rechart
			</h1>
			<ResponsiveContainer width="100%" aspect={3}>
				<LineChart data={pdata} margin={{ right: 300 }}>
					<CartesianGrid />
					<XAxis label={'date'} dataKey="name" />
					<YAxis label={'closing price'}></YAxis>
					<Legend />
					<Tooltip />
					<Line dataKey="student"
						stroke="black" />
					{/* <Line dataKey="fees"
						stroke="red" activeDot={{ r: 8 }} /> */}
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default LineGraph