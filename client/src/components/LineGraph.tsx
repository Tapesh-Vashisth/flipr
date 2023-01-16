// import './App.css';
import {
	LineChart,
	ResponsiveContainer,
	Legend, Tooltip,
	Line,
	XAxis,
	YAxis,
	Label,
	CartesianGrid
} from 'recharts';

// Sample chart data
const pdata = [
	{
		name: 'MongoDb',
		student: 11,
		fees: 120
	},
	{
		name: 'Javascript',
		student: 15,
		fees: 12
	},
	{
		name: 'PHP',
		student: 5,
		fees: 10
	},
	{
		name: 'Java',
		student: 10,
		fees: 5
	},
	{
		name: 'C#',
		student: 9,
		fees: 4
	},
	{
		name: 'C++',
		student: 10,
		fees: 8
	},
];

function LineGraph() {
	return (
		<div style={{width:'600px',height:'1000px',margin:'100px'}}>
			<h1 className="text-heading">
				Line Chart Using Rechart
			</h1>
			<ResponsiveContainer width="100%" height={250} aspect={3}>
				<LineChart style={{height:500,width:800}} margin={{top:5,bottom:20,left:10}} data={pdata}>
					<CartesianGrid width={1000}/>
					<XAxis dataKey="name" tickCount={3}>
						<Label value="date" offset={5} style={{textAnchor:'middle'}} position="bottom" />
					</XAxis>
					<YAxis orientation='left' interval={0}>
						<Label value="closing price" style={{textAnchor:'middle'}} angle={270} offset={5} position="left" />
					</YAxis>
					{/* <Legend /> */}
					<Tooltip />
					<Line dataKey="student"
						stroke="black" />
					{/* <Line dataKey="fees"
						stroke="red" activeDot={{ r: 8 }} /> */}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default LineGraph;
