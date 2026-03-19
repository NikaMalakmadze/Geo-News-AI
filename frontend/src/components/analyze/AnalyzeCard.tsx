import { LuBrain, LuFileText, LuHash } from "react-icons/lu";

import type { IAnalyzeResult } from "../../types/analyze";
import AnalyzePredictions from "./AnalyzePredictions";
import KeywordTag from "../elements/KeywordTag";
import AnalyzeEntities from "./AnalyzeEntities";

function AnalyzeCard({ data }: { data: IAnalyzeResult }) {
	const { category, sentiment, summary, keywords } = data;

	return (
		<div className="py-6 flex flex-col gap-6 rounded-xl corner-squircle border border-neutral-200 shadow-sm">
			<div className="px-6 flex items-center gap-2 text-lg">
				<LuBrain />
				<span className="font-firago">AI ანალიზი</span>
			</div>
			<div className="px-6 space-y-6">
				<AnalyzePredictions category={category} sentiment={sentiment} />
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-neutral-500 font-medium">
						<LuFileText />
						<span>AI შინაარსი</span>
					</div>
					<div className="px-4 py-2 border rounded-xl border-cyan-600 bg-cyan-600/10 text-cyan-600">
						{summary.summaryText}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-neutral-500 font-medium">
						<LuHash />
						<span>საკვანძო სიტყვები</span>
					</div>
					<div className="flex items-center flex-wrap gap-2 text-xs text-neutral-500">
						{keywords.map((keyword, i) => (
							<KeywordTag key={`keyword_${i}`}>{keyword}</KeywordTag>
						))}
					</div>
				</div>
				<AnalyzeEntities summary={summary} />
			</div>
		</div>
	);
}

export default AnalyzeCard;
