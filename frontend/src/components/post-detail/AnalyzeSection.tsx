import React from "react";

import { fetchPostPrevAnalyze } from "../../redux/thunks/postPrevAnalyze";
import useExponentialBackoff from "../../hooks/useExponentialBackoff";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AnalyzeCardSkeleton from "../analyze/AnalyzeCardSkeleton";
import AnalyzeCardSaved from "../analyze/AnalyzeCardSaved";
import AnalyzeCard from "../analyze/AnalyzeCard";
import AnalyzeButtons from "./AnalyzeButtons";

interface IAnalyzeSectionProps {
	slug: string;
	previousAnalyze: { updatedAt: string } | null;
}

function AnalyzeSection({ slug, previousAnalyze }: IAnalyzeSectionProps) {
	const { result, status: analyzeStatus } = useAppSelector(
		state => state.analyze,
	);
	const { prevAnalyze, prevAnalyzeStatus } = useAppSelector(
		state => state.postDetail,
	);
	const dispatch = useAppDispatch();

	const generateAnalyze = useExponentialBackoff(7, 1500);

	const getPrevAnalyze = React.useCallback(() => {
		dispatch(fetchPostPrevAnalyze({ slug }));
	}, [slug, dispatch]);

	return (
		<>
			{analyzeStatus === "idle" && prevAnalyzeStatus === "idle" && (
				<AnalyzeButtons
					onGenerateAnalyze={() => generateAnalyze(slug)}
					previousAnalyze={previousAnalyze}
					onGetPrevAnalyze={getPrevAnalyze}
				/>
			)}
			{(analyzeStatus === "pending" ||
				analyzeStatus === "polling" ||
				prevAnalyzeStatus === "pending") && <AnalyzeCardSkeleton />}
			{analyzeStatus === "loaded" && result && <AnalyzeCard data={result} />}
			{prevAnalyzeStatus === "loaded" && prevAnalyze && (
				<AnalyzeCardSaved data={prevAnalyze} />
			)}
			{analyzeStatus === "error" && (
				<AnalyzeCardSkeleton onError={() => generateAnalyze(slug)} error />
			)}
		</>
	);
}

export default AnalyzeSection;
