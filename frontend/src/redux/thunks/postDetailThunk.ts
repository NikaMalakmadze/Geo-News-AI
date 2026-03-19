import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IPostDetails } from "../../types/post";

export const fetchPostDetail = createAsyncThunk<
	IPostDetails,
	{ slug: string },
	{ rejectValue: null }
>("postDetails/fetchPostDetail", async ({ slug }, thunkAPI) => {
	const { data } = await axios.get<IPostDetails>(
		import.meta.env.VITE_PRODUCTS_URL + slug,
	);
	return data ? data : thunkAPI.rejectWithValue(null);
});
