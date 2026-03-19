import React from "react";

import { fetchAnalyzeText } from "../redux/thunks/analyzeThunkText";
import { fetchAnalyzeRes } from "../redux/thunks/analyzeResult";
import { fetchAnalyze } from "../redux/thunks/analyzeThunk";
import { useAppDispatch } from "../redux/hooks";
import { setError } from "../redux/slices/analyze";

function useExponentialBackoff(
	maxRetries: number = 5,
	baseDelay: number = 500,
): (postId?: string, text?: string) => Promise<void> {
	const dispatch = useAppDispatch();

	const getAnalyze = React.useCallback(
		async (postId?: string, text?: string) => {
			let analyzeStatus;

			if (text) {
				analyzeStatus = await dispatch(fetchAnalyzeText({ text }));
			} else if (postId) {
				analyzeStatus = await dispatch(fetchAnalyze({ postId }));
			} else {
				return;
			}

			if (
				fetchAnalyze.rejected.match(analyzeStatus) ||
				fetchAnalyzeText.rejected.match(analyzeStatus)
			)
				return;

			const taskId = analyzeStatus.payload?.taskId ?? postId;
			if (!taskId) return;

			if (analyzeStatus.payload?.message === "done") {
				await dispatch(fetchAnalyzeRes({ taskId }));
				return;
			}

			for (let attempt = 0; attempt < maxRetries; attempt++) {
				const res = await dispatch(fetchAnalyzeRes({ taskId }));

				if (fetchAnalyzeRes.fulfilled.match(res) && res.payload.result) return;

				if (
					fetchAnalyzeRes.rejected.match(res) &&
					res.payload?.type !== "processing"
				)
					return;

				const backoff = baseDelay * 2 ** attempt;
				const jitter = Math.random() * 100;
				await new Promise(res => setTimeout(res, backoff + jitter));
			}

			dispatch(setError());
		},
		[maxRetries, baseDelay, dispatch],
	);

	return getAnalyze;
}

export default useExponentialBackoff;
