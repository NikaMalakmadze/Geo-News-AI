import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { fetchPostsCategories } from "../thunks/postsCategoriesThunk";
import { fetchPosts } from "../thunks/postsThunk";
import type { IPostsState } from "../types";

const initialState: IPostsState = {
	postObjs: [],
	categoryObjs: [],
	postsStatus: "idle",
	categoriesStatus: "idle",
	totalItems: 0,
	totalCategories: 0,
	currentPage: 1,
	currentCategory: "",
	search: "",
	pageSize: 0,
	updated: false,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
			if (!state.updated) {
				state.updated = true;
			}
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.currentCategory = action.payload;
			if (!state.updated) {
				state.updated = true;
			}
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
			if (!state.updated) {
				state.updated = true;
			}
		},
		clearPosts: state => {
			state.postObjs = [];
			state.postsStatus = "idle";
			state.totalItems = 0;
			state.currentPage = 1;
			state.currentCategory = "";
			state.pageSize = 0;
			state.updated = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			const { results, totalItems, pageSize } = action.payload;

			state.postObjs = results;
			state.totalItems = totalItems;
			state.pageSize = pageSize;
			state.postsStatus = "loaded";
		});
		builder.addCase(fetchPosts.pending, state => {
			state.postObjs = [];
			state.postsStatus = "pending";
			state.totalItems = 0;
			state.pageSize = 0;
		});
		builder.addCase(fetchPosts.rejected, state => {
			state.postObjs = [];
			state.postsStatus = "error";
			state.totalItems = 0;
			state.pageSize = 0;
		});
		builder.addCase(fetchPostsCategories.fulfilled, (state, action) => {
			const { categories, categoriesCount } = action.payload;

			state.categoryObjs = [{ label: "ყველა", value: "" }, ...categories];
			state.totalCategories = categoriesCount;
			state.categoriesStatus = "loaded";
		});
		builder.addCase(fetchPostsCategories.pending, state => {
			state.categoriesStatus = "pending";
		});
		builder.addCase(fetchPostsCategories.rejected, state => {
			state.categoriesStatus = "error";
		});
	},
});

export const { setCategory, setCurrentPage, setSearch, clearPosts } =
	postsSlice.actions;

export default postsSlice.reducer;
