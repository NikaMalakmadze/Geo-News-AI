import type { TooltipContentProps } from "recharts";

import { isTSentiment } from "../../../types/typeGuards";
import { sentimentGeo } from "../../../data/daschboard";

function PieCustomToolTip({
	active,
	payload,
}: TooltipContentProps<string, string>) {
	if (!active || !payload?.length) return null;

	const { count, value, fill } = payload[0].payload;

	return (
		<div className="rounded-lg bg-white px-3 py-2 shadow text-sm">
			<p className="font-semibold" style={{ color: fill }}>
				{isTSentiment(value) ? sentimentGeo[value] : value}
			</p>
			<p>
				რაოდენობა: <span className="font-firago font-bold">{count}</span>
			</p>
		</div>
	);
}

export default PieCustomToolTip;
