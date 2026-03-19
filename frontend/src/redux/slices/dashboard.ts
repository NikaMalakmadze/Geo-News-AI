import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { fetchDashboardStats } from "../thunks/dashboardStats";
import { fetchDashboardPosts } from "../thunks/dashboardPosts";
import type { IDashboardState } from "../types";
import { deleteItem } from "../thunks/deleteItem";
import { changeAnalyze } from "../thunks/changeAnalyze";

const initialState: IDashboardState = {
	statistics: null,
	statisticsStatus: "idle",
	postObjs: [],
	postsStatus: "idle",
	totalPosts: 0,
	pageSize: 6,
	currentPage: 1,
	updated: false,
	postsSearch: "",
};

export const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setTablePageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
			state.currentPage = 1;
			if (!state.updated) {
				state.updated = true;
			}
		},
		setTableCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
			if (!state.updated) {
				state.updated = true;
			}
		},
		setTableSearch: (state, action: PayloadAction<string>) => {
			state.postsSearch = action.payload;
			if (!state.updated) {
				state.updated = true;
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
			state.statistics = action.payload;
			state.statisticsStatus = "loaded";
		});
		builder.addCase(fetchDashboardStats.pending, state => {
			state.statisticsStatus = "pending";
		});
		builder.addCase(fetchDashboardStats.rejected, state => {
			state.statisticsStatus = "error";
		});
		builder.addCase(fetchDashboardPosts.fulfilled, (state, action) => {
			const { totalItems, pageSize, results } = action.payload;

			state.postObjs = results;
			state.postsStatus = "loaded";
			state.totalPosts = totalItems;
			state.pageSize = pageSize;
		});
		builder.addCase(fetchDashboardPosts.pending, state => {
			state.postObjs = [];
			state.postsStatus = "pending";
		});
		builder.addCase(fetchDashboardPosts.rejected, state => {
			state.postsStatus = "error";
		});
		builder.addCase(deleteItem.fulfilled, (state, action) => {
			state.postsStatus = "loaded";
			state.postObjs = state.postObjs.filter(p => p.slug !== action.payload);
			state.totalPosts -= 1;
		});
		builder.addCase(deleteItem.pending, state => {
			state.postsStatus = "pending";
		});
		builder.addCase(deleteItem.rejected, state => {
			state.postsStatus = "loaded";
		});
		builder.addCase(changeAnalyze.fulfilled, (state, action) => {
			const { slug, analyze } = action.payload;

			const post = state.postObjs.find(o => o.slug === slug);
			if (post) {
				post.analyze = analyze;
			}

			state.postsStatus = "loaded";
		});
		builder.addCase(changeAnalyze.pending, state => {
			state.postsStatus = "pending";
		});
		builder.addCase(changeAnalyze.rejected, state => {
			state.postsStatus = "loaded";
		});
	},
});

export const { setTableCurrentPage, setTablePageSize, setTableSearch } =
	dashboardSlice.actions;

export default dashboardSlice.reducer;
