import { LuBookOpen, LuClock, LuSparkles } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

import { isNotNull } from "../../types/typeGuards";

interface IAnalyzeButtonsProps {
	previousAnalyze: { updatedAt: string } | null;
	onGetPrevAnalyze: () => void;
	onGenerateAnalyze: () => void;
}

function AnalyzeButtons({
	previousAnalyze,
	onGetPrevAnalyze,
	onGenerateAnalyze,
}: IAnalyzeButtonsProps) {
	const isAnalyze = isNotNull(previousAnalyze);

	let date;
	if (previousAnalyze?.updatedAt) {
		date = new Date(previousAnalyze.updatedAt).toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
			hour12: false,
		});
	}

	return (
		<div className="py-4 flex items-center justify-center">
			<div className="w-full max-w-md">
				<p className="text-center text-xs tracking-widest uppercase text-stone-400 mb-4 font-medium">
					სტატიის ანალიზი
				</p>
				<div
					className={twMerge(
						"bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5",
						isAnalyze && "grid grid-cols-2 gap-2",
					)}
				>
					<button
						onClick={onGenerateAnalyze}
						className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-800 hover:bg-cyan-900 active:scale-95 text-white text-sm font-semibold transition-all duration-150 shadow-md shadow-cyan-900/30 cursor-pointer"
					>
						<LuSparkles className="w-4 h-4" />
						<span>ახალი ანალიზი</span>
					</button>
					{isAnalyze && (
						<button
							onClick={onGetPrevAnalyze}
							className="flex flex-col items-center justify-center gap-0.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-800 text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer"
						>
							<span className="flex items-center gap-1.5">
								<LuBookOpen className="w-4 h-4" />
								შენახული
							</span>
							<span className="flex items-center gap-1 text-xs font-normal text-slate-400">
								<LuClock className="w-3 h-3" />
								მყისიერი
							</span>
						</button>
					)}
				</div>
				{isAnalyze && (
					<div className="flex items-center gap-3 mt-3 px-1">
						<div className="flex-1 h-px bg-stone-200" />
						<span className="text-xs text-stone-400 whitespace-nowrap">
							ბოლო ანალიზი: {date}
						</span>
						<div className="flex-1 h-px bg-stone-200" />
					</div>
				)}
			</div>
		</div>
	);
}

export default AnalyzeButtons;
