import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPostCategoriesResponse } from "../../types/post";

export const fetchPostsCategories = createAsyncThunk<
	IPostCategoriesResponse,
	void,
	{ rejectValue: null }
>("posts/fetchPostsCategories", async (_, thunkAPI) => {
	try {
		const { data } = await axios.get<IPostCategoriesResponse>(
			import.meta.env.VITE_PRODUCTS_URL + "categories/",
		);
		return data;
	} catch {
		return thunkAPI.rejectWithValue(null);
	}
});
