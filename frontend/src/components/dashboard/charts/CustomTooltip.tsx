import type {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { TooltipContentProps } from "recharts";

interface ICustomTooltipProps extends TooltipContentProps<ValueType, NameType> {
	labelTitle?: string;
	valueTitle?: string;
}

function CustomTooltip({
	active,
	payload,
	label,
	labelTitle = "თარიღი",
	valueTitle = "რაოდენობა",
}: ICustomTooltipProps) {
	if (!active || !payload?.length || payload[0].value === 0) return null;

	return (
		<div className="rounded-lg bg-white px-3 py-2 shadow text-sm">
			<p className="font-noto">
				{labelTitle}: <span className="font-semibold font-firago">{label}</span>
			</p>
			<p className="font-noto">
				{valueTitle}:{" "}
				<span className="font-semibold font-firago">{payload[0].value}</span>
			</p>
		</div>
	);
}

export default CustomTooltip;
