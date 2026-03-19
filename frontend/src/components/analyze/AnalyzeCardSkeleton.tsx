import { LuMeh, LuSparkles } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

function AnalyzeCardSkeleton({
	onError = () => {},
	error = false,
}: {
	onError?: () => void;
	error?: boolean;
}) {
	const skeletonText = error
		? "წარმოიქმნა შეცდომა..."
		: "მიმდინარეობს პოსტის დამუშავება...";

	return (
		<div
			className={twMerge(
				"relative h-130.5 w-full rounded-xl border bg-neutral-200 shadow-sm flex items-center justify-center transition-colors border-neutral-300",
				!error ? "animate-pulse" : "bg-neutral-100 border-neutral-300",
			)}
		>
			<div className="flex flex-col items-center gap-6 text-center">
				<div
					className={twMerge(
						"h-14 w-14 rounded-full flex items-center justify-center text-2xl",
						error ? "bg-red-100 text-red-600" : "bg-neutral-300 text-cyan-900",
					)}
				>
					{error ? <LuMeh /> : <LuSparkles />}
				</div>

				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium text-neutral-800 font-noto">
						{skeletonText}
					</span>

					{error && (
						<button
							className="mt-2 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded cursor-pointer"
							onClick={onError}
						>
							ხელახლა ცდა
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default AnalyzeCardSkeleton;
