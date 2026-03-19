import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import type { TStatCount } from "../../../types/dashboard";
import useMediaQeury from "../../../hooks/useMediaQeury";
import CustomTooltip from "./CustomTooltip";

function VerticalBarChart({
	data,
	labelTitle,
	valueTitle = "რაოდენობა",
}: {
	data: TStatCount[];
	labelTitle: string;
	valueTitle?: string;
}) {
	const isSmall = useMediaQeury("(max-width: 640px)");

	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={data} layout="vertical">
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip
					content={props => (
						<CustomTooltip
							{...props}
							labelTitle={labelTitle}
							valueTitle={valueTitle}
						/>
					)}
					cursor={false}
				/>
				<XAxis type="number" />
				<YAxis width={200} dataKey="value" type="category" hide={isSmall} />
				<Bar
					isAnimationActive={false}
					dataKey="count"
					className="fill-cyan-900"
					activeBar={{ className: "fill-cyan-900" }}
					radius={[0, 8, 8, 0]}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

export default VerticalBarChart;
