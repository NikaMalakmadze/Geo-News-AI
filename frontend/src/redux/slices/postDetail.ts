import { createSlice } from "@reduxjs/toolkit";

import { fetchPostPrevAnalyze } from "../thunks/postPrevAnalyze";
import { fetchPostDetail } from "../thunks/postDetailThunk";
import type { IPostDetailState } from "../types";

const initialState: IPostDetailState = {
	post: null,
	status: "idle",
	prevAnalyzeStatus: "idle",
	prevAnalyze: null,
};

export const postDetailSlice = createSlice({
	name: "postDetail",
	initialState,
	reducers: {
		clearPostDetail: state => {
			state.post = null;
			state.status = "idle";
			state.prevAnalyze = null;
			state.prevAnalyzeStatus = "idle";
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
			state.post = action.payload;
			state.status = "loaded";
		});
		builder.addCase(fetchPostDetail.pending, state => {
			state.post = null;
			state.status = "pending";
		});
		builder.addCase(fetchPostDetail.rejected, state => {
			state.post = null;
			state.status = "error";
		});
		builder.addCase(fetchPostPrevAnalyze.fulfilled, (state, action) => {
			state.prevAnalyze = action.payload;
			state.prevAnalyzeStatus = "loaded";
		});
		builder.addCase(fetchPostPrevAnalyze.pending, state => {
			state.prevAnalyze = null;
			state.prevAnalyzeStatus = "pending";
		});
		builder.addCase(fetchPostPrevAnalyze.rejected, state => {
			state.prevAnalyze = null;
			state.prevAnalyzeStatus = "error";
		});
	},
});

export const { clearPostDetail } = postDetailSlice.actions;

export default postDetailSlice.reducer;
