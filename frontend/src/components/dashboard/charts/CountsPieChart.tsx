import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { LuGhost } from "react-icons/lu";

import PieCustomToolTip from "./PieCustomToolTip";
import CustomLegend from "./CustomLegend";

interface ICountsPieChartProps<valueType> {
	data: Array<{ value: valueType; count: number }>;
	fillFunction: (entry: { value: valueType; count: number }) => string;
	secondPieData?: Array<{ value: valueType; count: number }>;
}

function CountsPieChart<valueType>({
	data,
	fillFunction,
	secondPieData = [],
}: ICountsPieChartProps<valueType>) {
	return data.length > 0 ? (
		<div className="w-full max-w-full aspect-square sm:aspect-4/3 lg:aspect-video">
			<ResponsiveContainer width="100%" height="100%" className="outline-none">
				<PieChart className="outline-none">
					{secondPieData.length > 0 && (
						<Pie
							className="outline-none"
							data={secondPieData}
							dataKey={"count"}
							nameKey={"value"}
							cornerRadius={4}
							paddingAngle={1}
							innerRadius={"80%"}
							outerRadius={"90%"}
						>
							{secondPieData.map((entry, i) => (
								<Cell key={`cell-${i}`} fill={fillFunction(entry)} />
							))}
						</Pie>
					)}
					<Pie
						className="outline-none"
						data={data}
						dataKey={"count"}
						nameKey={"value"}
						innerRadius={secondPieData.length ? "20%" : "50%"}
						outerRadius={secondPieData.length ? "75%" : ""}
						paddingAngle={1}
						cornerRadius={4}
					>
						{data.map((entry, i) => (
							<Cell key={`cell-${i}`} fill={fillFunction(entry)} />
						))}
					</Pie>
					<Legend
						content={<CustomLegend />}
						verticalAlign="bottom"
						wrapperStyle={{ width: "fit-content" }}
					/>
					<Tooltip content={PieCustomToolTip} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	) : (
		<p className="h-full flex justify-center items-center gap-2 text-center text-neutral-500">
			მონაცემები არ არის...
			<LuGhost />
		</p>
	);
}

export default CountsPieChart;
