import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { ITablePostsResponse } from "../../types/dashboard";

export const fetchDashboardPosts = createAsyncThunk<
	ITablePostsResponse,
	{
		key: string;
		page: number;
		pageSize: number;
		search?: string;
		category?: string;
	},
	{ rejectValue: null }
>(
	"dashboard/fetchDashboardPosts",
	async ({ key, search, category, page, pageSize }, thunkAPI) => {
		try {
			const params = new URLSearchParams({
				page_size: pageSize.toString(),
				page: page.toString(),
			});

			if (search) params.append("search", search);
			if (category) params.append("category", category);

			const { data } = await axios.get<ITablePostsResponse>(
				`${import.meta.env.VITE_ADMIN_POSTS_URL}?${params.toString()}`,
				{ headers: { "X-Admin-Key": key } },
			);

			return data.results.length ? data : thunkAPI.rejectWithValue(null);
		} catch {
			return thunkAPI.rejectWithValue(null);
		}
	},
);
