import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Brush,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import type { PostsByDays } from "../../../types/dashboard";
import type { TChartType } from "./ChartToggle";
import CustomTooltip from "./CustomTooltip";

interface IPostByDaysChartPropts {
	chartType: TChartType;
	postsByDays: PostsByDays[];
}

function PostByDaysChart({ chartType, postsByDays }: IPostByDaysChartPropts) {
	const Chart = chartType === "bar" ? BarChart : AreaChart;

	return postsByDays.length > 0 ? (
		<div className="w-full h-75 sm:h-90 lg:h-105">
			<ResponsiveContainer width="100%" height="100%">
				<Chart data={postsByDays}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="label" height={60} />
					<YAxis />
					<Tooltip content={CustomTooltip} cursor={false} />
					<Brush dataKey="label" height={30} className="stroke-cyan-900" />
					{chartType === "bar" ? (
						<Bar
							dataKey="count"
							className="fill-cyan-900"
							radius={[8, 8, 0, 0]}
						/>
					) : (
						<Area
							dataKey="count"
							type="monotone"
							stroke="#164e63"
							fill="#164e63"
							fillOpacity={0.5}
						/>
					)}
				</Chart>
			</ResponsiveContainer>
		</div>
	) : (
		<p className="text-center text-neutral-500">მონაცემები არ არის</p>
	);
}

export default PostByDaysChart;
