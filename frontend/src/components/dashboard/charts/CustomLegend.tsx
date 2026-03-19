import { LuList } from "react-icons/lu";

import type { TSentiment } from "../../../types/dashboard";
import { isTSentiment } from "../../../types/typeGuards";
import { sentimentGeo } from "../../../data/daschboard";
import ToolTip from "../../elements/ToolTip";

interface CustomLegendProps {
	payload?: Array<{
		value: string;
		color?: string;
	}>;
	ignoreValues?: string[];
}

function CustomLegend({ payload, ignoreValues }: CustomLegendProps) {
	const legend = (
		<div className="py-2 px-1 flex justify-center">
			<ul className="flex flex-col justify-center gap-2 text-[10px] lg:text-sm">
				{payload?.map(
					({ value, color }) =>
						!ignoreValues?.includes(value) && (
							<li key={value} className="flex items-center gap-2">
								<span
									className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 rounded-full"
									style={{ backgroundColor: color }}
								/>
								<span>
									{isTSentiment(value)
										? sentimentGeo[value as TSentiment]
										: value}
								</span>
							</li>
						),
				)}
			</ul>
		</div>
	);

	return (
		<ToolTip content={legend}>
			<LuList className="cursor-pointer" />
		</ToolTip>
	);
}

export default CustomLegend;
