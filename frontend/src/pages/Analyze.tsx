import { LuSparkles } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import React from "react";

import useExponentialBackoff from "../hooks/useExponentialBackoff";
import { useAppSelector } from "../redux/hooks";
import AnalyzeCardSkeleton from "../components/analyze/AnalyzeCardSkeleton";
import AnalyzeCard from "../components/analyze/AnalyzeCard";
import usePageTitle from "../hooks/usePageTitle";

function Analyze() {
	usePageTitle("ანალიზი");

	const { result, status: analyzeStatus } = useAppSelector(
		state => state.analyze,
	);
	const [text, setText] = React.useState<string>("");

	const getAnalyze = useExponentialBackoff(7, 1500);

	return (
		<div className="bg-neutral-50/80">
			<div className="h-fit relative overflow-hidden border-b border-neutral-200">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-cyan-900/10 blur-3xl"></div>
					<div className="absolute -top-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
				</div>
				<div className="max-w-7xl h-full mx-auto px-6 py-12">
					<div className="max-w-4xl">
						<h1 className="font-firago text-4xl tracking-tight">
							AI ტექსტის ანალიზატორი
						</h1>
						<h3 className="mt-4 text-lg text-neutral-500 text-pretty">
							ჩასვით ნებისმიერი ქართული ახალი ამბების სტატია ან ტექსტი მისი
							კატეგორიის, განწყობის, საკვანძო სიტყვების გასაანალიზებლად და
							დასახელებული ერთეულების ამოსაღებად.
						</h3>
					</div>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="mb-8 py-6 flex flex-col justify-between gap-6 rounded-xl corner-squircle border border-neutral-200 shadow-sm hover:shadow-md">
					<div className="px-6 flex flex-col gap-2">
						<h4 className="font-noto font-semibold text-lg">
							შემოიყვანე ტექსტი
						</h4>
						<h5 className="font-noto text-sm text-neutral-500">
							ჩასვით სიახლე ან ტექსტი, რომლის ანალიზიც გსურთ
						</h5>
					</div>
					<div className="px-6">
						<textarea
							onChange={e => setText(e.target.value.slice(0, 3000))}
							value={text}
							placeholder="ჩასვით ტექტი აქ..."
							maxLength={3000}
							className={twMerge(
								"w-full min-h-50 px-3 py-2 mb-4",
								"font-noto text-base md:text-sm text-neutral-900 placeholder:text-neutral-500",
								"shadow-sm",
								"border border-neutral-200 rounded-md focus:border-neutral-300 focus-visible:border-slate-500 transition-colors outline-none",
								"selection:bg-cyan-900 selection:text-white",
								"focus-visible:ring-2 focus-visible:ring-slate-500/50",
								"file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-700",
								"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
								"aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 resize-none",
							)}
						></textarea>
						<div className="flex items-center justify-between">
							<p className="font-noto text-xs text-neutral-500">
								<span className="font-firago">{text.length}/3000</span> სიმბოლო
							</p>
							<div className="h-fit flex justify-center">
								<button
									className="w-fit h-9 px-4 py-2 flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium font-noto transition-all outline-none bg-cyan-900 hover:bg-cyan-900/80 cursor-pointer"
									onClick={() => getAnalyze(undefined, text.trim())}
								>
									<LuSparkles />
									<span>ანალიზი</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{(analyzeStatus === "pending" || analyzeStatus === "polling") && (
					<AnalyzeCardSkeleton />
				)}
				{analyzeStatus === "loaded" && result && <AnalyzeCard data={result} />}
				{analyzeStatus === "error" && (
					<AnalyzeCardSkeleton
						onError={() => getAnalyze(undefined, text.trim())}
						error
					/>
				)}
			</div>
		</div>
	);
}

export default Analyze;
