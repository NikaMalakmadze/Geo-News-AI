import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IAnalyzeStatus } from "../../types/analyze";

export const fetchAnalyze = createAsyncThunk<
	IAnalyzeStatus,
	{ postId: string },
	{ rejectValue: { type: string } }
>("analyze/fetchAnalyze", async ({ postId }, { rejectWithValue }) => {
	try {
		const { data } = await axios.post<IAnalyzeStatus>(
			import.meta.env.VITE_ANALYZE_URL + postId,
		);
		return data;
	} catch (err: any) {
		if (err.response?.status === 500)
			return rejectWithValue({ type: "failed" });
		if (err.response?.status === 404)
			return rejectWithValue({ type: "not_found" });
		return rejectWithValue({ type: "unknown" });
	}
});
