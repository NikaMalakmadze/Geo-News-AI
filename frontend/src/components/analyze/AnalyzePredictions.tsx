import { LuDrama, LuShapes } from "react-icons/lu";

import type { TSentiment } from "../../types/dashboard";
import type { ISentiment } from "../../types/analyze";
import { isInterface } from "../../types/typeGuards";
import SentimentTag from "../elements/SentimentTag";
import CategoryTag from "../elements/CategoryTag";
import ToolTip from "../elements/ToolTip";

function AnalyzePredictions({
	category,
	sentiment,
}: {
	category: string;
	sentiment: ISentiment | string;
}) {
	let sentimentBar;
	if (isInterface<ISentiment>(sentiment)) {
		sentimentBar = (
			<div className="h-5 w-28 flex border border-neutral-200 rounded-sm overflow-hidden">
				<span
					style={{ width: `${sentiment.distribution.negative}%` }}
					className="h-full block bg-red-600/60"
				></span>
				<span
					style={{ width: `${sentiment.distribution.neutral}%` }}
					className="h-full block bg-gray-600/60"
				></span>
				<span
					style={{ width: `${sentiment.distribution.positive}%` }}
					className="h-full block bg-green-600/60"
				></span>
				<span
					style={{ width: `${sentiment.distribution.mixed}%` }}
					className="h-full block bg-yellow-400/60"
				></span>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 max-md:gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium">
					<LuShapes />
					<span>სავარაუდო კატეგორია</span>
				</div>
				<div className="flex items-center gap-2">
					<CategoryTag category={category} />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium">
					<LuDrama />
					<span>სენტიმენტის შეფასება</span>
				</div>
				{isInterface<ISentiment>(sentiment) ? (
					<div className="flex items-center gap-2">
						<ToolTip content={sentimentBar!}>
							<SentimentTag sentiment={sentiment.label as TSentiment} />
						</ToolTip>
						<span className="font-firago text-neutral-500 font-medium">
							{sentiment.confidence}%
						</span>
					</div>
				) : (
					<SentimentTag className="w-fit" sentiment={sentiment as TSentiment} />
				)}
			</div>
		</div>
	);
}

export default AnalyzePredictions;
