import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IAnalyzeState, TAnalyzeSource } from "../types";
import { fetchAnalyzeText } from "../thunks/analyzeThunkText";
import { fetchAnalyzeRes } from "../thunks/analyzeResult";
import { fetchAnalyze } from "../thunks/analyzeThunk";

const initialState: IAnalyzeState = {
	result: null,
	status: "idle",
	source: "idle",
	taskId: null,
};

export const analyzeSlice = createSlice({
	name: "analyze",
	initialState,
	reducers: {
		setAnalyzeSource: (state, action: PayloadAction<TAnalyzeSource>) => {
			state.source = action.payload;
		},
		clearAnalyze: state => {
			state.result = null;
			state.status = "idle";
			state.source = "idle";
			state.taskId = null;
		},
		setError: state => {
			state.result = null;
			state.taskId = null;
			state.status = "error";
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAnalyze.pending, state => {
			state.result = null;
			state.status = "pending";
		});
		builder.addCase(fetchAnalyze.fulfilled, (state, action) => {
			const { message } = action.payload;
			state.status = "polling";
			if (message !== "done") state.result = null;
		});
		builder.addCase(fetchAnalyze.rejected, state => {
			state.result = null;
			state.status = "error";
		});
		builder.addCase(fetchAnalyzeText.pending, state => {
			state.result = null;
			state.status = "pending";
		});
		builder.addCase(fetchAnalyzeText.fulfilled, (state, action) => {
			const { message, taskId } = action.payload;
			state.status = "polling";
			state.taskId = taskId ? taskId : null;
			if (message !== "done") state.result = null;
		});
		builder.addCase(fetchAnalyzeText.rejected, state => {
			state.result = null;
			state.status = "error";
		});
		builder.addCase(fetchAnalyzeRes.pending, state => {
			state.status = "polling";
		});
		builder.addCase(fetchAnalyzeRes.fulfilled, (state, action) => {
			const { result } = action.payload;
			state.result = result;
			state.status = result ? "loaded" : "polling";
		});
		builder.addCase(fetchAnalyzeRes.rejected, state => {
			state.result = null;
			state.status = "error";
		});
	},
});

export const { setAnalyzeSource, clearAnalyze, setError } =
	analyzeSlice.actions;

export default analyzeSlice.reducer;
