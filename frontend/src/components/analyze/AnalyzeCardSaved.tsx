import { LuFileText, LuHash } from "react-icons/lu";

import AnalyzePredictions from "./AnalyzePredictions";
import type { IAnalyze } from "../../types/dashboard";
import KeywordTag from "../elements/KeywordTag";
import AnalyzeEntities from "./AnalyzeEntities";
import Ghost from "../elements/Ghost";
import Card from "../elements/Card";

function AnalyzeCardSaved({ data }: { data: IAnalyze }) {
	return (
		<Card>
			<AnalyzePredictions
				category={data.predictedCategory}
				sentiment={data.sentiment}
			/>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium">
					<LuHash />
					<span>საკვანძო სიტყვები</span>
				</div>
				<div className="flex items-center flex-wrap gap-2 text-xs text-neutral-500">
					{data.keywords.map((keyword, i) => (
						<KeywordTag key={`keyword_${i}`}>{keyword}</KeywordTag>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium">
					<LuFileText />
					<span>AI შინაარსი</span>
				</div>
				{data.summary ? (
					<div className="px-4 py-2 border rounded-xl border-cyan-600 bg-cyan-600/10 text-cyan-600">
						{data.summary}
					</div>
				) : (
					<Ghost />
				)}
			</div>

			<AnalyzeEntities
				summary={{
					cities: data.cities,
					persons: data.persons,
					countries: data.countries,
					organizations: data.organizations,
					summaryText: "",
				}}
			/>
		</Card>
	);
}

export default AnalyzeCardSaved;
