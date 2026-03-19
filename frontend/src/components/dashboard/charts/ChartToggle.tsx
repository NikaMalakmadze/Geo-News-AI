import { LuChartArea, LuChartBar } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export type TChartType = "bar" | "area";

interface IChartToggleProps {
	value: TChartType;
	onChange: (value: TChartType) => void;
}

export default function ChartToggle({ value, onChange }: IChartToggleProps) {
	const isBar = value === "bar";

	return (
		<div
			className="relative flex w-25 h-10 bg-neutral-100/25 rounded-xl p-1 cursor-pointer border border-neutral-300 shadow-sm hover:bg-neutral-200/25 transition"
			onClick={() => onChange(isBar ? "area" : "bar")}
		>
			<div
				className={twMerge(
					"absolute inset-y-1 w-1/2 rounded-lg bg-neutral-50 shadow",
					isBar ? "left-1" : "right-1",
				)}
			></div>

			<div className="relative z-5 flex w-full items-center justify-between px-2">
				<LuChartBar
					size={18}
					className={isBar ? "text-neutral-900" : "text-neutral-400"}
				/>
				<LuChartArea
					size={18}
					className={!isBar ? "text-neutral-900" : "text-neutral-400"}
				/>
			</div>
		</div>
	);
}
