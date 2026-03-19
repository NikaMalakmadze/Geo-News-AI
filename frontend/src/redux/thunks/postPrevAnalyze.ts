import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IAnalyze } from "../../types/dashboard";

export const fetchPostPrevAnalyze = createAsyncThunk<
	IAnalyze,
	{ slug: string },
	{ rejectValue: null }
>("postDetails/fetchPostPrevAnalyze", async ({ slug }, thunkAPI) => {
	const { data } = await axios.get<IAnalyze>(
		import.meta.env.VITE_SAVED_ANALYZE_GET_URL + slug,
	);
	return data ? data : thunkAPI.rejectWithValue(null);
});
