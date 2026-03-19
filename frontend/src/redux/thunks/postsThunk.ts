import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { type IPostResponse } from "../../types/post";

export const fetchPosts = createAsyncThunk<
	IPostResponse,
	{ search: string; category: string; page: number },
	{ rejectValue: null }
>("posts/fetchPosts", async ({ search, category, page }, thunkAPI) => {
	try {
		const params = new URLSearchParams({
			page_size: "6",
			page: page.toString(),
		});

		if (search) params.append("search", search);
		if (category) params.append("category", category);

		const { data } = await axios.get<IPostResponse>(
			`${import.meta.env.VITE_PRODUCTS_URL}?${params.toString()}`,
		);

		return data.results.length ? data : thunkAPI.rejectWithValue(null);
	} catch {
		return thunkAPI.rejectWithValue(null);
	}
});
