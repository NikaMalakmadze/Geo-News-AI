import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IAnalyze } from "../../types/dashboard";

export const changeAnalyze = createAsyncThunk<
	{ slug: string; analyze: IAnalyze },
	{ key: string; slug: string; analyze: IAnalyze },
	{ rejectValue: null }
>("dashboard/changeAnalyze", async ({ key, slug, analyze }, thunkAPI) => {
	try {
		await axios.patch(import.meta.env.VITE_ANALYZE_CHANGE_URL + slug, analyze, {
			headers: { "X-Admin-Key": key },
		});
		return { slug, analyze };
	} catch {
		return thunkAPI.rejectWithValue(null);
	}
});
